// ==========================================
// THEME MANAGER
// ==========================================
function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
    updateThemeButton(theme);
}

function updateThemeButton(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.innerHTML = theme === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    });
}

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

    // Theme toggle
    const navThemeBtn = document.getElementById('navThemeBtn');
    if (navThemeBtn) {
        navThemeBtn.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
            setTheme(newTheme);
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

    // Scroll reveal — staggered cards + section titles (hero handled separately)
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