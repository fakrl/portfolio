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
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
}

function createMomentItem(photo) {
    const item = document.createElement('div');
    item.className = 'moment-item glass-card visible'; // tambahin visible di sini
    item.dataset.category = photo.categories[0];
    item.innerHTML = `
        <img src="${photo.url}"
             alt="${escapeHtml(photo.caption)}"
             loading="lazy"
             onerror="this.parentElement.classList.add('moment-item--placeholder')">
        <div class="moment-overlay">
            <span class="moment-tag">${getCategoryLabel(photo.categories[0])}</span>
            <p class="moment-caption">${escapeHtml(photo.caption)}</p>
        </div>
    `;
    return item;
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

    // Scroll reveal untuk glass-card
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.glass-card').forEach(card => observer.observe(card));

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