// ==========================================
// THEME MANAGER
// ==========================================
function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    // Swap only the light/dark class, don't touch other classes the body
    // may already have (hero-in entrance animation, portfolio-page, etc.) —
    // a blanket `body.className = theme` used to wipe those out on every
    // toggle, which is why the hero section would vanish until a reload.
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    updateThemeButton(theme);
}

function updateThemeButton(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.innerHTML = theme === 'dark'
            ? '<span class="msym">light_mode</span>'
            : '<span class="msym">dark_mode</span>';
    });
}

/* ── M3: ganti tema dengan circular reveal (View Transitions API) ── */
function switchThemeAnimated(theme, evt) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fallback: browser tanpa View Transitions (Safari/Firefox lama) → transisi CSS biasa
    if (!document.startViewTransition || reduce) {
        setTheme(theme);
        return;
    }

    // Titik pusat animasi = posisi tombol yang diklik
    const btn = evt && evt.currentTarget;
    let x = window.innerWidth - 40, y = 40;
    if (btn && btn.getBoundingClientRect) {
        const r = btn.getBoundingClientRect();
        x = r.left + r.width / 2;
        y = r.top + r.height / 2;
    }
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => setTheme(theme));

    transition.ready.then(() => {
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: 520,
                easing: 'cubic-bezier(0.2, 0, 0, 1)',
                pseudoElement: '::view-transition-new(root)'
            }
        );
    }).catch(() => {});
}

/* ── M3: ripple di semua tombol ── */
document.addEventListener('pointerdown', function (e) {
    const b = e.target.closest('.btn, .theme-toggle, button');
    if (!b) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = b.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const s = document.createElement('span');
    s.className = 'ripple';
    s.style.width = s.style.height = d + 'px';
    s.style.left = (e.clientX - r.left - d / 2) + 'px';
    s.style.top = (e.clientY - r.top - d / 2) + 'px';
    b.appendChild(s);
    setTimeout(() => s.remove(), 450);
}, { passive: true });

// Init theme on load
document.addEventListener('DOMContentLoaded', () => {
    setTheme(getTheme());
});

// ==========================================
// NAVBAR — theme toggle + hamburger
// ==========================================
const isNavPage = document.querySelector('.navbar');

if (isNavPage) {
    document.body.classList.add('portfolio-page');

    // Lang-toggle is sized to match the navbar's real rendered height (see
    // --navbar-h in components.css) instead of a hardcoded px value, so it
    // always reads as "same size as the navbar" on any breakpoint or font load.
    const syncNavbarHeight = () => {
        document.documentElement.style.setProperty('--navbar-h', isNavPage.offsetHeight + 'px');
    };
    syncNavbarHeight();
    window.addEventListener('resize', syncNavbarHeight, { passive: true });
    window.addEventListener('load', syncNavbarHeight);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(syncNavbarHeight).catch(() => {});
    }

    // Theme toggle
    const navThemeBtn = document.getElementById('navThemeBtn');
    if (navThemeBtn) {
        navThemeBtn.addEventListener('click', (e) => {
            const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
            switchThemeAnimated(newTheme, e);
        });
    }

    // Smooth scroll (hanya untuk anchor dalam halaman yang sama)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll reveal. Default: a small crew of cursors "builds" each block as it
    // scrolls into view (initCursorCrew, bottom of this file). Plain fade-up is the
    // fallback for reduced-motion users and for any browser where the crew can't start.
    const plainReveal = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                // stagger by position among glass-card siblings in the same container
                const sibs = [...el.parentElement.children].filter(c => c.classList.contains('glass-card'));
                const idx = sibs.indexOf(el);
                const delay = idx > 0 ? Math.min(idx, 6) * 70 : 0;
                el.classList.add('visible');
                el.style.animation = `fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`;
                observer.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        [...document.querySelectorAll('.glass-card, .section-title')]
            .filter(el => !el.closest('.hero-section'))
            .forEach(el => observer.observe(el));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        plainReveal();
    } else {
        try {
            initCursorCrew();
        } catch (err) {
            // Never leave content hidden: undo any crew state, then reveal normally.
            document.body.classList.remove('crew-on');
            document.querySelectorAll('[data-sw]').forEach(el => {
                delete el.dataset.sw;
                el.style.removeProperty('opacity');
                el.style.removeProperty('clip-path');
            });
            const layer = document.querySelector('.sw-layer');
            if (layer) layer.remove();
            plainReveal();
        }
    }

    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    const updateProgress = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        progressBar.style.transform = `scaleX(${max > 0 ? doc.scrollTop / max : 0})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.navbar').offsetHeight;
        document.querySelectorAll('.section, .hero-section').forEach(section => {
            const top = section.offsetTop - navHeight - 100;
            if (window.scrollY >= top && window.scrollY < top + section.clientHeight) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
}

// ==========================================
// HAMBURGER MENU
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}
// ==========================================
// CURSOR CREW
// A crew of cursors "builds" the page as it scrolls into view: first each block
// (card / section title), then the pieces inside it one by one (images, icons,
// headings, paragraphs, tags, buttons). Each build drags out the piece's outline
// while it is revealed. Cursors only exist while there is something to build.
//
// Performance rules (the first version lagged):
//  - reveals use the Web Animations API (opacity / transform / clip-path on small
//    pieces), never per-frame style writes on big blurred cards;
//  - cursors and outlines only ever change `transform` (+ a size write on the outline);
//  - no layout reads inside animation frames (positions come from IntersectionObserver
//    data plus the scroll offset); one shared requestAnimationFrame ticker;
//  - cursors only exist while there is something ready to build (as many as needed, max 9).
// Hero blocks wait for the Hello preloader, cursors roam over it meanwhile.
// Throws on setup problems so the caller falls back to the plain reveal.
// ==========================================
function initCursorCrew() {
    if (!Element.prototype.animate || !('IntersectionObserver' in window)) throw new Error('crew: unsupported');

    const HERO   = '.hero-photo-side, .hero-text-side > *';
    const BLOCKS = '.glass-card, .section-title';
    const HEAVY  = '.glass-card, .hero-photo-side';
    const SKIP   = '.navbar, .floating-pill, .lightbox, .cert-modal-overlay, .sw-layer';
    const TEXT   = 'h1, h2, h3, h4, p, li, blockquote, figcaption';
    const UNIT   = '.btn, .skill-chip, .tag, .bio-chip, .work-card-tag, .exp-card-badge, .proof-card__badge, .proof-card__tag';
    const INLINE = 'i[class*="devicon"], .msym, svg, video, iframe, canvas, picture';
    const ATOMS  = [TEXT, UNIT, INLINE, 'img'].join(',');
    const MEDIA  = 'video, iframe, canvas, picture';
    const MAX_SAME = 16;   // more identical pieces than this in one block appear together with the block

    // ---- what gets built --------------------------------------------------
    const hero = [...document.querySelectorAll(HERO)];
    const blocks = [...document.querySelectorAll(BLOCKS)].filter(el => !el.closest('.hero-section'));
    const all = [...hero, ...blocks];
    const containers = all.filter(el => !all.some(o => o !== el && o.contains(el)));
    if (!containers.length) throw new Error('crew: nothing to build');

    const meta = new WeakMap();                 // el -> { box, instant, anim }
    containers.forEach(el => meta.set(el, { box: null, instant: false, anim: null }));

    // Experience dividers are a border of the row itself, so a cursor could never "build" them.
    // Swap each for a real line element that is its own piece.
    document.querySelectorAll('.exp-row:not(:last-child)').forEach(row => {
        if (row.querySelector(':scope > .sw-rule')) return;
        const rule = document.createElement('i');
        rule.className = 'sw-rule';
        rule.setAttribute('aria-hidden', 'true');
        row.appendChild(rule);
    });

    const atoms = [];
    document.querySelectorAll(ATOMS).forEach(el => {
        if (meta.has(el) || el.closest(SKIP)) return;
        const box = containers.find(c => c.contains(el) && !c.matches('.hero-text-side > *'));
        if (!box) return;                                                    // only pieces inside a block
        if (el.matches(INLINE) && !el.matches(MEDIA) && el.parentElement.closest(TEXT + ',' + UNIT)) return;   // icon inside text / tag
        if (el.matches('img') && (el.closest(UNIT) || el.closest('picture'))) return;
        if (el.matches(MEDIA) && el.parentElement.closest(MEDIA)) return;
        if (el.matches(TEXT) && (el.querySelector(TEXT + ', img, ' + UNIT) || el.closest(UNIT))) return;  // leaf text only
        if (el.matches(UNIT) && el.parentElement.closest(UNIT)) return;
        atoms.push({ el, box });
    });
    // Anything else that shows content (links, spans, labels, buttons, bare text) is a piece too,
    // so nothing inside a block can appear before a cursor builds it.
    const chosen = new Set(atoms.map(a => a.el));
    const NOPE = new Set(['SCRIPT', 'STYLE', 'BR', 'HR', 'SOURCE', 'TRACK', 'OPTION', 'NOSCRIPT', 'PATH', 'G', 'USE', 'DEFS', 'CIRCLE', 'RECT', 'LINE', 'POLYGON', 'POLYLINE', 'ELLIPSE']);
    const inChosen = (el, box) => { for (let n = el.parentElement; n && n !== box; n = n.parentElement) if (chosen.has(n)) return true; return false; };
    containers.forEach(box => {
        if (box.matches('.hero-text-side > *')) return;
        box.querySelectorAll('*').forEach(el => {
            if (chosen.has(el) || meta.has(el) || NOPE.has(el.tagName.toUpperCase()) || el.closest(SKIP) || el.closest('svg')) return;
            if (inChosen(el, box)) return;
            const own = [...el.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim());
            if (!(own || !el.children.length)) return;
            if ([...chosen].some(a => el.contains(a))) return;               // has real pieces inside: stays a wrapper
            if (!own && !el.matches('img, input, textarea, select, canvas, video, iframe') && !el.offsetWidth) return;
            chosen.add(el);
            atoms.push({ el, box });
        });
    });
    const wrappers = [];
    atoms.forEach(({ el, box }) => {
        for (let n = el.parentElement; n && n !== box; n = n.parentElement) {
            if (meta.has(n) || chosen.has(n) || n.closest(SKIP)) continue;
            meta.set(n, { box, wrapper: true, anim: null });
            wrappers.push(n);
        }
    });
    const groups = new Map();
    atoms.forEach(({ el, box }) => {
        const sig = el.tagName + '.' + (el.classList[0] || '');
        const g = groups.get(box) || groups.set(box, new Map()).get(box);
        const n = (g.get(sig) || 0) + 1;
        g.set(sig, n);
        meta.set(el, { box, instant: n > MAX_SAME, anim: null });
    });
    const targets = [...containers, ...atoms.map(a => a.el)];
    wrappers.forEach(w => { w.dataset.sw = 'wait'; });

    // ---- overlay + crew -------------------------------------------------------
    const pre = document.getElementById('preloader');
    let waiting = !!pre && !pre.classList.contains('hide-preloader');
    let gateT = performance.now();
    let lite = false;

    document.body.classList.add('crew-on');
    const layer = document.createElement('div');
    layer.className = 'sw-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    const SIZE = window.innerWidth >= 1024 ? 9 : window.innerWidth >= 768 ? 6 : 4;
    const ARROW = '<svg width="20" height="24" viewBox="0 0 20 24" fill="none">' +
        '<path transform="translate(1.6 2.2)" d="M1.5 1.5L15.8 11.2L9.2 12.6L6.3 19.2L1.5 1.5Z" fill="rgba(0,0,0,.28)"/>' +
        '<path d="M1.5 1.5L15.8 11.2L9.2 12.6L6.3 19.2L1.5 1.5Z" fill="#0b0b0c" stroke="#fff" ' +
        'stroke-width="1.5" stroke-linejoin="round"/></svg>';
    const crew = Array.from({ length: SIZE }, (_, i) => {
        const el = document.createElement('div');
        el.className = 'sw-cursor';
        el.innerHTML = ARROW;
        const frame = document.createElement('div');
        frame.className = 'sw-frame';
        frame.style.display = 'none';
        layer.append(frame, el);
        return { i, el, frame, x: -60, y: -60, alive: false };
    });

    const rand  = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const easeIO = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const place = (c, x, y) => {
        c.x = x; c.y = y;
        c.el.style.transform = `translate3d(${(x - 1.5).toFixed(1)}px, ${(y - 1.5).toFixed(1)}px, 0)`;
    };

    // one shared ticker for every tween
    const tweens = new Set();
    let raf = 0, last = 0;
    function tick(now) {
        raf = 0;
        const dt = now - last; last = now;
        tweens.forEach(tw => {
            const p = clamp((now - tw.t0) / tw.dur, 0, 1);
            tw.fn(p);
            if (p >= 1) { tweens.delete(tw); tw.res(); }
        });
        if (tweens.size) raf = requestAnimationFrame(tick);
    }
    function tween(dur, fn) {
        return new Promise(res => {
            tweens.add({ t0: performance.now(), dur, fn, res });
            if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
        });
    }

    const moveTo = (c, tx, ty, dur) => {
        const sx = c.x, sy = c.y;
        return tween(dur, p => { const e = easeIO(p); place(c, sx + (tx - sx) * e, sy + (ty - sy) * e); });
    };
    const edgePoint = () => {
        const w = window.innerWidth, h = window.innerHeight, s = Math.floor(rand(0, 4));
        return s === 0 ? [rand(0, w), -30] : s === 1 ? [w + 30, rand(0, h)]
             : s === 2 ? [rand(0, w), h + 30] : [-30, rand(0, h)];
    };
    const wander = async c => {
        const w = window.innerWidth, h = window.innerHeight;
        await moveTo(c, rand(w * 0.1, w * 0.9), rand(h * 0.15, h * 0.88), rand(700, 1300));
        await sleep(rand(100, 380));
    };

    // ---- queue / state --------------------------------------------------------
    const queue = [];
    const building = new Map();
    let flushing = false;

    function releaseWrappers(el) {
        const m = meta.get(el);
        for (let n = el.parentElement; n && m && n !== m.box; n = n.parentElement) {
            const wm = meta.get(n);
            if (wm && wm.wrapper && n.dataset.sw === 'wait') n.dataset.sw = 'done';
        }
    }
    function finalize(el) {
        if (!el.dataset.sw || el.dataset.sw === 'done') return;
        const m = meta.get(el);
        releaseWrappers(el);
        building.delete(el);
        if (el.matches(BLOCKS)) el.classList.add('visible');
        if (el.matches(HERO)) el.style.opacity = '1';     // hero blocks have a base opacity of 0 and no .visible state
        el.dataset.sw = 'done';
        if (m && m.anim) { m.anim.cancel(); m.anim = null; }
        flushInstant();
    }
    function flushInstant() {                              // crowded pieces appear with their block, no cursor
        if (flushing) return;
        flushing = true;
        for (let i = queue.length - 1; i >= 0; i--) {
            const m = meta.get(queue[i].el);
            if (m.instant && (!m.box || m.box.dataset.sw === 'done')) { const el = queue[i].el; queue.splice(i, 1); finalize(el); }
        }
        flushing = false;
    }
    function enqueue(el, r) {
        if (el.dataset.sw !== 'wait') return;
        const m = meta.get(el);
        if (m.box && m.box.dataset.sw === 'wait') { io.unobserve(m.box); enqueue(m.box, m.box.getBoundingClientRect()); }
        el.dataset.sw = 'queued';
        const b = r || el.getBoundingClientRect();
        queue.push({ el, t: performance.now(), top: b.top, left: b.left, w: b.width, h: b.height, y0: window.scrollY });
    }
    function pickNext() {
        flushInstant();
        const sy = window.scrollY;
        let bi = -1, bt = Infinity;
        for (let i = 0; i < queue.length; i++) {
            const m = meta.get(queue[i].el);
            if (m.box && m.box.dataset.sw !== 'done') continue;       // a piece waits for its block
            const top = queue[i].top + (queue[i].y0 - sy);
            if (top < bt) { bt = top; bi = i; }
        }
        return bi < 0 ? null : queue.splice(bi, 1)[0];
    }

    function reveal(el, dur, heavy) {
        const kf = heavy
            ? [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }]
            : [{ opacity: 0, clipPath: 'inset(0 100% 100% 0)' }, { opacity: 1, clipPath: 'inset(-8px -8px -8px -8px)' }];
        return el.animate(kf, { duration: dur, easing: heavy ? 'cubic-bezier(0.22, 1, 0.36, 1)' : 'ease-out', fill: 'both' });
    }

    async function buildOne(c, q) {
        const el = q.el, m = meta.get(el);
        try {
            const vh = window.innerHeight, vw = window.innerWidth;
            const topNow = () => q.top + (q.y0 - window.scrollY);
            // Fresh measurement (layout may have shifted since it was queued). Base transforms
            // (a card waiting at translateY(24px)) are subtracted so the outline hugs the final box.
            const measure = () => {
                const r = el.getBoundingClientRect();
                let ty = 0;
                if (el.matches(HEAVY) || el.matches(HERO)) {
                    const t = getComputedStyle(el).transform;
                    if (t && t !== 'none') { const mm = t.match(/matrix\(([^)]+)\)/); if (mm) ty = parseFloat(mm[1].split(',')[5]) || 0; }
                }
                q.left = r.left; q.top = r.top - ty; q.w = r.width; q.h = r.height; q.y0 = window.scrollY;
            };
            measure();
            if (q.w < 4 || q.h < 4 || topNow() + q.h < 0 || topNow() > vh) { finalize(el); return; }   // scrolled past

            building.set(el, performance.now());           // stays 'queued' (hidden) until the cursor starts drawing
            const heavy = el.matches(HEAVY) || q.w * q.h > 70000;

            if (lite) {                                        // slow device: quick plain fade, no cursor
                m.anim = reveal(el, 170, heavy);
                await sleep(170);
                return;
            }
            const pressure = 1;
            const jitter = rand(0.9, 1.15);

            const tx = clamp(q.left, 6, vw - 6);
            await moveTo(c, tx, clamp(topNow(), 6, vh - 6),
                clamp(Math.hypot(tx - c.x, clamp(topNow(), 6, vh - 6) - c.y) / 1.0, 450, 1200) * pressure * jitter);

            const dur = (heavy ? clamp(1100 + Math.sqrt(q.w * q.h) * 0.8, 1300, 2000)
                               : clamp(650 + Math.sqrt(q.w * q.h) * 2.5, 700, 1100)) * pressure * jitter;
            measure();                                         // layout may have moved while the cursor travelled
            const fr = c.frame;
            fr.className = 'sw-frame';
            fr.style.display = 'block';
            fr.style.borderRadius = heavy ? getComputedStyle(el).borderRadius : '3px';
            releaseWrappers(el);
            m.anim = reveal(el, dur, heavy);
            el.dataset.sw = 'building';
            await tween(dur, p => {
                const e = easeIO(p), top = topNow();
                fr.style.transform = `translate3d(${q.left}px, ${top}px, 0)`;
                fr.style.width = `${q.w * e}px`;
                fr.style.height = `${q.h * e}px`;
                place(c, clamp(q.left + q.w * e, 6, vw - 6), clamp(top + q.h * e, 6, vh - 6));
            });
            fr.classList.add('out');
            setTimeout(() => { if (fr.classList.contains('out')) fr.style.display = 'none'; }, 220);
            c.el.classList.add('click');
            setTimeout(() => c.el.classList.remove('click'), 170);
            await sleep(rand(350, 700));
        } finally {
            finalize(el);
        }
    }

    async function life(c) {
        if (c.alive) return;
        c.alive = true;
        const [sx, sy] = edgePoint();
        place(c, sx, sy);
        c.el.classList.add('on');
        let idleSince = 0;
        while (true) {
            if (waiting) { await wander(c); continue; }                       // roam over the Hello screen
            if (queue.length) {
                const q = pickNext();
                if (q) { idleSince = 0; await buildOne(c, q); }
                else { if (!idleSince) idleSince = performance.now(); if (performance.now() - idleSince > 900 + c.i * 200) break; await sleep(80); }
                continue;
            }
            if (!idleSince) idleSince = performance.now();
            if (performance.now() - idleSince > 500 + c.i * 150) break;
            await sleep(120);
        }
        c.el.classList.remove('on');
        c.frame.style.display = 'none';
        await sleep(350);
        c.alive = false;
        if (queue.length) wake();
    }

    function wake() {
        if (waiting) return;
        const alive = crew.filter(c => c.alive).length;
        const cap = lite ? 3 : SIZE;
        const ready = queue.filter(q => { const b = meta.get(q.el).box; return !b || b.dataset.sw === 'done'; }).length;
        let need = Math.min(ready, cap) - alive;
        crew.forEach(c => {
            if (need <= 0 || c.alive) return;
            need--;
            setTimeout(() => life(c).catch(() => { c.alive = false; }), 40 + c.i * 120);
        });
    }

    const io = new IntersectionObserver(entries => {
        entries.filter(e => e.isIntersecting).forEach(e => {
            io.unobserve(e.target);
            enqueue(e.target, e.boundingClientRect);
        });
        wake();
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(el => { el.dataset.sw = 'wait'; io.observe(el); });

    // Greeting phase: cursors roam over "Hello", then the queue is released.
    const release = () => {
        if (!waiting) return;
        waiting = false;
        gateT = performance.now();
        wake();
    };
    if (waiting) {
        crew.slice(0, 3).forEach(c => setTimeout(() => life(c).catch(() => { c.alive = false; }), 250 + c.i * 200));
        new MutationObserver((_, mo) => {
            if (pre.classList.contains('hide-preloader')) { mo.disconnect(); release(); }
        }).observe(pre, { attributes: true, attributeFilter: ['class'] });
        setTimeout(release, 6000);
    }

    // Watchdog: nothing may stay hidden because animation was slow or throttled.
    setInterval(() => {
        const now = performance.now();
        for (let i = queue.length - 1; i >= 0; i--) {
            if (!waiting && now - Math.max(queue[i].t, gateT) > 12000) {
                const el = queue[i].el;
                queue.splice(i, 1);
                finalize(el);
            }
        }
        building.forEach((t, el) => { if (now - t > 7000) finalize(el); });
        wrappers.forEach(w => {
            if (w.dataset.sw !== 'wait') return;
            const b = meta.get(w).box;
            if (b.dataset.sw === 'done') { w._t = w._t || now; if (now - w._t > 12000) w.dataset.sw = 'done'; }
        });
    }, 1000);

    // Keyboard users: focusing something inside an unbuilt piece shows it (and its block) right away.
    document.addEventListener('focusin', e => {
        for (let n = e.target; n && n !== document.body; n = n.parentElement) {
            if (n.dataset && n.dataset.sw && n.dataset.sw !== 'done' && meta.get(n) && meta.get(n).wrapper) { n.dataset.sw = 'done'; continue; }
            if (n.dataset && n.dataset.sw && n.dataset.sw !== 'done') {
                const qi = queue.findIndex(q => q.el === n);
                if (qi > -1) queue.splice(qi, 1);
                io.unobserve(n);
                if (n.dataset.sw === 'wait') n.dataset.sw = 'queued';
                finalize(n);
            }
        }
    });
}
