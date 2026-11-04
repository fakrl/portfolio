/* Feedback carousel extras (home + moments):
   - swipe / drag left-right to change the post (works with mouse and touch)
   - dots limited to a sliding window, the outer dots fade out
   - a small slide transition when the post changes
   It only reads the existing DOM and clicks the existing dots, so both page scripts stay untouched. */
(function () {
    const list = document.getElementById('feedbackList');
    const dots = document.getElementById('feedbackDots');
    if (!list || !dots) return;

    const WINDOW = 7;                 // dots visible at once
    let dir = 1;                      // direction of the last change (1 = next)
    let first = true;                 // the very first render is left to the page entrance

    // ---- dots window --------------------------------------------------------
    function layoutDots() {
        const all = [...dots.querySelectorAll('.feedback-dot')];
        const n = all.length;
        if (n <= WINDOW) { all.forEach(d => { d.style.display = ''; d.removeAttribute('data-fade'); }); return; }
        const active = Math.max(0, all.findIndex(d => d.classList.contains('active')));
        const start = Math.min(Math.max(active - Math.floor(WINDOW / 2), 0), n - WINDOW);
        const end = start + WINDOW - 1;
        all.forEach((d, i) => {
            if (i < start || i > end) { d.style.display = 'none'; d.removeAttribute('data-fade'); return; }
            d.style.display = '';
            let f = 0;
            if (start > 0) { if (i === start) f = 2; else if (i === start + 1) f = 1; }
            if (end < n - 1) { if (i === end) f = 2; else if (i === end - 1) f = 1; }
            if (f) d.setAttribute('data-fade', String(f)); else d.removeAttribute('data-fade');
        });
    }
    new MutationObserver(layoutDots).observe(dots, { childList: true });
    layoutDots();

    // ---- slide transition when a new post is rendered -----------------------
    new MutationObserver(muts => {
        for (const m of muts) for (const node of m.addedNodes) {
            if (!(node instanceof HTMLElement) || !node.classList.contains('gb-post')) continue;
            if (first) { first = false; continue; }
            if ([...m.removedNodes].some(n => n.nodeType === 1 && n.hasAttribute && n.hasAttribute('data-pre'))) continue;   // pre-render swapped for the real post
            if (!node.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) continue;
            node.animate(
                [{ opacity: 0, transform: `translateX(${dir * 28}px)` }, { opacity: 1, transform: 'translateX(0)' }],
                { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
            );
        }
    }).observe(list, { childList: true });

    // ---- swipe / drag -------------------------------------------------------
    const step = delta => {
        const all = [...dots.querySelectorAll('.feedback-dot')];
        if (all.length < 2) return;
        const i = Math.max(0, all.findIndex(d => d.classList.contains('active')));
        dir = delta > 0 ? 1 : -1;
        all[(i + delta + all.length) % all.length].click();
        setTimeout(() => { dir = 1; }, 450);
    };
    let sx = 0, sy = 0, tracking = false, lockedX = false;
    list.style.touchAction = 'pan-y';
    list.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (e.target.closest('input, textarea, button, a, select')) return;
        sx = e.clientX; sy = e.clientY; tracking = true; lockedX = false;
    });
    list.addEventListener('pointermove', e => {
        if (!tracking) return;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        if (!lockedX && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
            lockedX = true;
            try { list.setPointerCapture(e.pointerId); } catch (_) {}
        }
        if (lockedX) {
            const post = list.querySelector('.gb-post');
            if (post) post.style.transform = `translateX(${Math.max(-60, Math.min(60, dx * 0.4))}px)`;
        }
    });
    const end = e => {
        if (!tracking) return;
        tracking = false;
        const dx = e.clientX - sx;
        const post = list.querySelector('.gb-post');
        if (post) post.style.transform = '';
        if (lockedX && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    };
    list.addEventListener('pointerup', end);
    list.addEventListener('pointercancel', () => { tracking = false; const p = list.querySelector('.gb-post'); if (p) p.style.transform = ''; });
    list.addEventListener('dragstart', e => e.preventDefault());
})();
