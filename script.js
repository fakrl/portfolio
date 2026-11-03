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
// A few cursors "build" each block the moment it scrolls into view: they drag out
// its outline from the top-left corner while the block is revealed under the
// selection. They only exist while there is something to build, then leave.
// Hero blocks wait for the Hello preloader to finish (cursors roam over it).
// Throws on setup problems so the caller can fall back to a plain reveal.
// ==========================================
function initCursorCrew() {
    const HERO = '.hero-photo-side, .hero-text-side > *';
    const hero = [...document.querySelectorAll(HERO)];
    const rest = [...document.querySelectorAll('.glass-card, .section-title')]
        .filter(el => !el.closest('.hero-section'));
    const all = [...hero, ...rest];
    // build the outer block only, never a block nested inside another one
    const targets = all.filter(el => !all.some(o => o !== el && o.contains(el)));
    if (!targets.length || !('IntersectionObserver' in window)) throw new Error('crew: nothing to build');

    const pre = document.getElementById('preloader');
    let waiting = !!pre && !pre.classList.contains('hide-preloader');
    let gateT = performance.now();

    document.body.classList.add('crew-on');
    const layer = document.createElement('div');
    layer.className = 'sw-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    const SIZE = window.innerWidth < 768 ? 3 : 5;
    const ARROW = '<svg width="18" height="22" viewBox="0 0 18 22" fill="none">' +
        '<path d="M1.5 1.5L15.8 11.2L9.2 12.6L6.3 19.2L1.5 1.5Z" fill="#0b0b0c" ' +
        'stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    const crew = Array.from({ length: SIZE }, (_, i) => {
        const el = document.createElement('div');
        el.className = 'sw-cursor';
        el.innerHTML = ARROW;
        layer.appendChild(el);
        return { i, el, x: -60, y: -60, alive: false };
    });

    const rand  = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const easeIO = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const place = (c, x, y) => {
        c.x = x; c.y = y;
        c.el.style.transform = `translate3d(${(x - 1.5).toFixed(1)}px, ${(y - 1.5).toFixed(1)}px, 0)`;
    };
    const tween = (dur, fn) => new Promise(res => {
        const t0 = performance.now();
        (function step(now) {
            const p = clamp((now - t0) / dur, 0, 1);
            fn(p);
            if (p < 1) requestAnimationFrame(step); else res();
        })(t0);
    });
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
        await moveTo(c, rand(w * 0.12, w * 0.88), rand(h * 0.18, h * 0.85), rand(700, 1300));
        await sleep(rand(120, 420));
    };

    const queue = [];
    const building = new Map();

    function finalize(el) {
        if (!el.dataset.sw || el.dataset.sw === 'done') return;
        building.delete(el);
        el.classList.add('visible');
        el.style.removeProperty('clip-path');
        el.style.removeProperty('transition');
        el.style.removeProperty('transform');
        // hero blocks have a base opacity of 0 and no .visible state, so keep it explicit
        if (el.matches(HERO)) el.style.opacity = '1'; else el.style.removeProperty('opacity');
        el.dataset.sw = 'done';
    }

    async function buildOne(c, el) {
        try {
            const vh = window.innerHeight, vw = window.innerWidth;
            let r = el.getBoundingClientRect();
            // scrolled past (or collapsed) before a cursor got to it: just show it
            if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > vh) { finalize(el); return; }

            el.dataset.sw = 'building';
            building.set(el, performance.now());
            const pressure = 1 / (1 + Math.min(queue.length, 6) * 0.2);
            const jitter = rand(0.9, 1.15);

            const sy = clamp(r.top, 6, vh - 6);
            const dist = Math.hypot(r.left - c.x, sy - c.y);
            await moveTo(c, clamp(r.left, 6, vw - 6), sy, clamp(dist / 1.7, 200, 620) * pressure * jitter);

            const frame = document.createElement('div');
            frame.className = 'sw-frame';
            frame.style.borderRadius = getComputedStyle(el).borderRadius;
            layer.appendChild(frame);

            el.style.transition = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';

            r = el.getBoundingClientRect();
            const dur = clamp(300 + Math.sqrt(r.width * r.height) * 0.45, 360, 820) * pressure * jitter;
            await tween(dur, p => {
                const e = easeIO(p);
                const b = el.getBoundingClientRect();     // follows the block while the page scrolls
                const w = b.width, h = b.height;
                frame.style.transform = `translate3d(${b.left}px, ${b.top}px, 0)`;
                frame.style.width = `${w * e}px`;
                frame.style.height = `${h * e}px`;
                // reveal grows with the selection; shadow room on the open sides
                el.style.clipPath = `inset(${-40 * e}px ${(1 - e) * w - 40 * e}px ${(1 - e) * h - 40 * e}px ${-40 * e}px)`;
                place(c, clamp(b.left + w * e, 6, vw - 6), clamp(b.top + h * e, 6, vh - 6));
            });

            frame.classList.add('out');
            setTimeout(() => frame.remove(), 240);
            c.el.classList.add('click');
            setTimeout(() => c.el.classList.remove('click'), 170);
        } finally {
            finalize(el);
        }
    }

    function pickNext() {
        let bi = 0, bt = Infinity;
        queue.forEach((q, i) => {
            const top = q.el.getBoundingClientRect().top;
            if (top < bt) { bt = top; bi = i; }
        });
        return queue.splice(bi, 1)[0].el;
    }

    async function life(c) {
        if (c.alive) return;
        c.alive = true;
        const [sx, sy] = edgePoint();
        place(c, sx, sy);
        c.el.classList.add('on');
        let idleSince = 0;
        while (true) {
            if (waiting) { await wander(c); continue; }              // roam over the Hello screen
            if (queue.length) { idleSince = 0; await buildOne(c, pickNext()); continue; }
            if (!idleSince) idleSince = performance.now();
            if (performance.now() - idleSince > 2200 + c.i * 450) break;
            await wander(c);
        }
        c.el.classList.remove('on');
        await sleep(350);
        c.alive = false;
        if (queue.length) wake();
    }

    function wake() {
        if (waiting) return;
        const alive = crew.filter(c => c.alive).length;
        let need = clamp(queue.length, 2, SIZE) - alive;
        crew.forEach(c => {
            if (need <= 0 || c.alive) return;
            need--;
            setTimeout(() => life(c).catch(() => { c.alive = false; }), c.i * 120);
        });
    }

    const io = new IntersectionObserver(entries => {
        entries.filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .forEach(e => {
                io.unobserve(e.target);
                if (e.target.dataset.sw !== 'wait') return;
                e.target.dataset.sw = 'queued';
                queue.push({ el: e.target, t: performance.now() });
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
        crew.forEach(c => setTimeout(() => life(c).catch(() => { c.alive = false; }), 250 + c.i * 160));
        new MutationObserver((_, mo) => {
            if (pre.classList.contains('hide-preloader')) { mo.disconnect(); release(); }
        }).observe(pre, { attributes: true, attributeFilter: ['class'] });
        setTimeout(release, 6000);
    }

    // Watchdog: nothing may stay hidden because animation was slow or throttled.
    setInterval(() => {
        const now = performance.now();
        for (let i = queue.length - 1; i >= 0; i--) {
            if (!waiting && now - Math.max(queue[i].t, gateT) > 4500) {
                finalize(queue[i].el);
                queue.splice(i, 1);
            }
        }
        building.forEach((t, el) => { if (now - t > 4000) finalize(el); });
    }, 1000);

    // Keyboard users: focusing something inside an unbuilt block shows it right away.
    document.addEventListener('focusin', e => {
        const t = targets.find(x => x.contains(e.target));
        if (!t || !t.dataset.sw || t.dataset.sw === 'done') return;
        const qi = queue.findIndex(q => q.el === t);
        if (qi > -1) queue.splice(qi, 1);
        io.unobserve(t);
        t.dataset.sw = 'queued';
        finalize(t);
    });
}
