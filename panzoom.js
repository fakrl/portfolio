/* Natural photo-gallery zoom with no on-screen hints:
   pinch (touch / trackpad), double-tap or double-click to zoom in and out, drag to pan while zoomed,
   Ctrl + wheel (or plain wheel when opts.wheel is set) to zoom at the cursor.
   PanZoom(viewport, target, opts) -> { reset(animate), zoomed(), recent() }
   - viewport: fixed box that clips (needs position: relative so target.offsetLeft/Top are measured from it)
   - target:   the element that is scaled/moved (transform-origin is forced to 0 0)
   opts: max (default 4), wheel (plain wheel zooms), lockTouch (touch-action: none), onTap(x, y), onGesture() */
(function () {
    function PanZoom(viewport, target, opts) {
        opts = opts || {};
        const MAX = opts.max || 4;
        let s = 1, tx = 0, ty = 0;
        const ptrs = new Map();
        let pinch = null, pan = null, tapTimer = null, lastTap = null, lastGesture = 0, downInfo = null;

        target.style.transformOrigin = '0 0';
        target.style.willChange = 'transform';
        if (opts.lockTouch) viewport.style.touchAction = 'none';

        const rect = () => viewport.getBoundingClientRect();
        const local = e => { const r = rect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

        function clamp() {
            s = Math.max(1, Math.min(MAX, s));
            if (s < 1.001) { s = 1; tx = 0; ty = 0; return; }
            const vw = viewport.clientWidth, vh = viewport.clientHeight;
            const bl = target.offsetLeft, bt = target.offsetTop;
            const sw = target.offsetWidth * s, sh = target.offsetHeight * s;
            tx = sw > vw ? Math.min(-bl, Math.max(vw - sw - bl, tx)) : (vw - sw) / 2 - bl;
            ty = sh > vh ? Math.min(-bt, Math.max(vh - sh - bt, ty)) : (vh - sh) / 2 - bt;
        }
        function apply(animate) {
            target.style.transition = animate ? 'transform .22s ease' : '';
            target.style.transform = s === 1 ? '' : 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')';
            viewport.classList.toggle('is-zoomed', s > 1);
        }
        function zoomAt(p, next, animate) {
            const bl = target.offsetLeft, bt = target.offsetTop;
            const cx = (p.x - bl - tx) / s, cy = (p.y - bt - ty) / s;
            s = next;
            tx = p.x - bl - cx * s;
            ty = p.y - bt - cy * s;
            clamp();
            apply(animate);
        }
        function gesture() { lastGesture = Date.now(); if (opts.onGesture) opts.onGesture(); }
        const interactive = el => !!(el && el.closest && el.closest('button, a, input, form, textarea, select'));

        viewport.addEventListener('pointerdown', e => {
            if (e.button > 0 || interactive(e.target)) return;
            // a primary pointer always starts a fresh gesture: drop anything left over from a missed pointerup,
            // otherwise a stale entry makes every later single touch look like a pinch and blocks page turns
            if (e.isPrimary) { ptrs.clear(); pinch = null; pan = null; downInfo = null; }
            ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
            if (ptrs.size === 1) {
                downInfo = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false, multi: false };
                if (s > 1) { pan = { x: e.clientX, y: e.clientY, tx, ty }; }
            } else if (ptrs.size === 2) {
                if (downInfo) downInfo.multi = true;
                const [a, b] = [...ptrs.values()];
                const r = rect();
                pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, s0: s, mx: (a.x + b.x) / 2 - r.left, my: (a.y + b.y) / 2 - r.top, tx0: tx, ty0: ty };
                pan = null;
                try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
                gesture();
            }
        });

        viewport.addEventListener('pointermove', e => {
            const known = ptrs.get(e.pointerId);
            if (!known) return;
            known.x = e.clientX; known.y = e.clientY;
            if (downInfo && Math.hypot(e.clientX - downInfo.x, e.clientY - downInfo.y) > 8) downInfo.moved = true;
            if (pinch && ptrs.size >= 2) {
                const [a, b] = [...ptrs.values()];
                const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
                const r = rect();
                const mx = (a.x + b.x) / 2 - r.left, my = (a.y + b.y) / 2 - r.top;
                const bl = target.offsetLeft, bt = target.offsetTop;
                const next = Math.max(1, Math.min(MAX, pinch.s0 * d / pinch.d));
                const cx = (pinch.mx - bl - pinch.tx0) / pinch.s0, cy = (pinch.my - bt - pinch.ty0) / pinch.s0;
                s = next;
                tx = mx - bl - cx * s;
                ty = my - bt - cy * s;
                clamp();
                apply(false);
                gesture();
            } else if (pan && ptrs.size === 1 && s > 1) {
                if (!pan.started && downInfo && downInfo.moved) {
                    pan.started = true;
                    try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
                }
                if (pan.started) {
                    tx = pan.tx + (e.clientX - pan.x);
                    ty = pan.ty + (e.clientY - pan.y);
                    clamp();
                    apply(false);
                    gesture();
                }
            }
        });

        function release(e, cancelled) {
            if (!ptrs.has(e.pointerId)) return;
            ptrs.delete(e.pointerId);
            try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
            if (ptrs.size < 2) pinch = null;
            if (ptrs.size === 0) {
                const info = downInfo;
                downInfo = null;
                pan = null;
                if (s < 1.02 && s !== 1) { s = 1; clamp(); apply(true); }
                if (!cancelled && info && !info.moved && !info.multi && performance.now() - info.t < 400) tap(e);
            }
        }
        viewport.addEventListener('lostpointercapture', e => release(e, true));
        window.addEventListener('blur', () => { ptrs.clear(); pinch = null; pan = null; downInfo = null; });
        viewport.addEventListener('pointerup', e => release(e, false));
        viewport.addEventListener('pointercancel', e => release(e, true));

        function tap(e) {
            const now = performance.now();
            if (lastTap && now - lastTap.t < 320 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30) {
                clearTimeout(tapTimer);
                lastTap = null;
                gesture();
                zoomAt(local(e), s > 1 ? 1 : Math.min(MAX, 2.6), true);
                return;
            }
            lastTap = { t: now, x: e.clientX, y: e.clientY };
            clearTimeout(tapTimer);
            if (opts.onTap && s === 1) {
                const x = e.clientX, y = e.clientY;
                tapTimer = setTimeout(() => { lastTap = null; opts.onTap(x, y); }, 270);
            }
        }

        viewport.addEventListener('wheel', e => {
            if (interactive(e.target)) return;
            if (e.ctrlKey || opts.wheel) {
                e.preventDefault();
                const k = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018));
                zoomAt(local(e), Math.max(1, Math.min(MAX, s * k)), false);
                gesture();
            } else if (s > 1) {
                e.preventDefault();
                tx -= e.deltaX; ty -= e.deltaY;
                clamp(); apply(false);
                gesture();
            }
        }, { passive: false });

        return {
            reset(animate) { clearTimeout(tapTimer); lastTap = null; s = 1; tx = 0; ty = 0; apply(!!animate); },
            zoomed() { return s > 1; },
            recent() { return Date.now() - lastGesture < 450; },
        };
    }
    window.PanZoom = PanZoom;
})();
