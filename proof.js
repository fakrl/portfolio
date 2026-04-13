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
