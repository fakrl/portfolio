// ==========================================
// PROOF.JS
// Dipakai di: proof/index.html
// Load: <script src="../proof.js"></script>
// ==========================================

// ── Tab switching ─────────────────────────
document.getElementById('proofTabs').addEventListener('click', e => {
    const btn = e.target.closest('.proof-tab');
    if (!btn) return;

    document.querySelectorAll('.proof-tab').forEach(b => b.classList.remove('proof-tab--active'));
    btn.classList.add('proof-tab--active');

    const target = btn.dataset.tab;
    document.querySelectorAll('.proof-section').forEach(s => {
        s.style.display = s.id === `tab-${target}` ? 'block' : 'none';
    });
});

// ── Lightbox ──────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCaption');
let photoItems    = [];
let currentPhoto  = 0;

function openLightbox(index) {
    currentPhoto = index;
    const item = photoItems[index];
    const img  = item.querySelector('img');
    const cap  = item.querySelector('.photo-caption');
    lightboxImg.src         = img.src;
    lightboxCap.textContent = cap ? cap.textContent : '';
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
}

function lightboxNav(dir) {
    currentPhoto = (currentPhoto + dir + photoItems.length) % photoItems.length;
    openLightbox(currentPhoto);
}

document.getElementById('photoGrid').addEventListener('click', e => {
    const item = e.target.closest('.photo-item');
    if (!item) return;
    photoItems = Array.from(document.querySelectorAll('.photo-item'));
    openLightbox(photoItems.indexOf(item));
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => lightboxNav(-1));
document.getElementById('lightboxNext').addEventListener('click', () => lightboxNav(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
});

// ==========================================
// SYNC DARI data/proof-data.json
// ------------------------------------------
// Progressive enhancement, BUKAN pengganti.
// HTML statis di proof/index.html tetap sumber
// tampilan awal (aman buat SEO + anchor CV).
// Script ini cuma:
//   • memperbarui teks/atribut card yang sudah ada
//   • menambah card baru yang belum ada di HTML
// Kalau fetch gagal → halaman tetap utuh apa adanya.
// ==========================================
(async function syncProofFromJson() {
    let data;
    try {
        const res = await fetch('/data/proof-data.json', { cache: 'no-cache' });
        if (!res.ok) return;                 // 404 dsb → biarkan HTML statis
        data = await res.json();
    } catch (_) {
        return;                              // offline / JSON rusak → diam saja
    }

    const CATS = { certifications: 'tab-certifications', awards: 'tab-awards', projects: 'tab-projects' };
    const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    for (const [cat, sectionId] of Object.entries(CATS)) {
        const items = Array.isArray(data[cat]) ? data[cat] : null;
        if (!items) continue;
        const grid = document.querySelector(`#${sectionId} .proof-grid`);
        if (!grid) continue;

        items.forEach(item => {
            if (!item || !item.id) return;
            let card = document.getElementById(item.id);

            // Card baru (belum ada di HTML statis) → bikin skeleton
            if (!card) {
                card = document.createElement('div');
                card.id = item.id;
                card.className = 'glass-card proof-card' + (item.featured ? ' proof-card--featured' : '');
                card.innerHTML = `
                    <div class="proof-card__img">
                        <img alt="${esc(item.title)}"
                             onerror="this.parentElement.classList.add('proof-card__img--placeholder')">
                        <span class="proof-card__badge"></span>
                        <span class="proof-card__click-hint"><span class="msym">open_in_full</span></span>
                    </div>
                    <div class="proof-card__body">
                        <span class="proof-card__date"></span>
                        <h3 class="proof-card__title"></h3>
                        <p class="proof-card__issuer"></p>
                        <p class="proof-card__desc"></p>
                        <div class="skill-tags" style="margin-top:0.6rem"></div>
                    </div>`;
                grid.appendChild(card);
            }

            // data-* untuk modal
            const attrs = {
                'data-title': item.title,
                'data-credential-id': item['credential-id'],
                'data-link': item.link,
                'data-link-label': item['link-label'],
                'data-github': item.github,
                'data-github-label': item['github-label'],
                'data-youtube': item.youtube,
                'data-youtube-label': item['youtube-label'],
                'data-instagram': item.instagram,
                'data-instagram-label': item['instagram-label'],
                'data-project': item.project,
                'data-project-label': item['project-label']
            };
            for (const [k, v] of Object.entries(attrs)) {
                if (v) card.setAttribute(k, v); else card.removeAttribute(k);
            }
            if (Array.isArray(item.images) && item.images.length) {
                card.setAttribute('data-images', JSON.stringify(item.images));
                const img = card.querySelector('.proof-card__img img');
                if (img && img.getAttribute('src') !== item.images[0]) img.src = item.images[0];
            }

            // teks
            const set = (sel, val) => {
                const el = card.querySelector(sel);
                if (el && val != null && val !== '') el.textContent = val;
            };
            set('.proof-card__date', item.date);
            set('.proof-card__title', item.title);
            set('.proof-card__issuer', item.issuer);
            set('.proof-card__desc', item.desc);

            const badge = card.querySelector('.proof-card__badge');
            if (badge && item.badge) {
                badge.textContent = item.badge;
                if (item.badgeTone) {
                    badge.className = 'proof-card__badge proof-card__badge--' + item.badgeTone;
                }
            }

            // tag
            if (Array.isArray(item.tags) && item.tags.length) {
                let box = card.querySelector('.skill-tags');
                if (!box) {
                    box = document.createElement('div');
                    box.className = 'skill-tags';
                    box.style.marginTop = '0.6rem';
                    card.querySelector('.proof-card__body')?.appendChild(box);
                }
                box.innerHTML = item.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');
            }
        });
    }
})();
