import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue, serverTimestamp, get }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ── Firebase config ───────────────────────
const firebaseConfig = {
    apiKey: "AIzaSyDhJLaWGZs1YILiMaNIDQ3mapnBUoH9R6s",
    authDomain: "fakrul-feeeb.firebaseapp.com",
    databaseURL: "https://fakrul-feeeb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fakrul-feeeb",
    storageBucket: "fakrul-feeeb.firebasestorage.app",
    messagingSenderId: "767578062305",
    appId: "1:767578062305:web:3cdf7bd8678923bb3e26a0"
};

const app      = initializeApp(firebaseConfig);
const db       = getDatabase(app);
const photosRef   = ref(db, "photos");
const commentsRef = ref(db, "feedback");

// ── State ─────────────────────────────────
let allPhotos     = [];
let filteredPhotos = [];
let currentFilter = 'all';
let currentPage   = 0;
const PAGE_SIZE   = 12;
let momentItems   = [];
let currentMoment = 0;

// ── Helpers ───────────────────────────────
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;")
              .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function formatTime(ts) {
    if (!ts) return "";
    return new Date(ts).toLocaleDateString("id-ID", {
        day:"numeric", month:"short", year:"numeric",
        hour:"2-digit", minute:"2-digit"
    });
}

function getCategoryLabel(cat) {
    const map = { momen:'Momen', photography:'Photography', personal:'Personal' };
    return map[cat] || cat;
}

// ── Create moment card ────────────────────
function createMomentItem(photo) {
    const item = document.createElement('div');
    item.className = 'moment-item glass-card visible'; // tambahin visible di sini
    item.dataset.category = photo.categories[0];
    const cap = photo.caption && photo.caption !== '— Caption —' ? escapeHtml(photo.caption) : '';
    item.innerHTML = `
        <img src="${photo.url}"
             alt="${cap}"
             loading="lazy"
             onerror="this.parentElement.classList.add('moment-item--placeholder')">
        <div class="moment-overlay">
            <span class="moment-tag">${getCategoryLabel(photo.categories[0])}</span>
            ${cap ? `<p class="moment-caption">${cap}</p>` : ''}
        </div>
    `;
    return item;
}

// ── Render next page ──────────────────────
function renderNextPage() {
    const grid   = document.getElementById('momentsGrid');
    const start  = currentPage * PAGE_SIZE;
    const end    = start + PAGE_SIZE;
    const slice  = filteredPhotos.slice(start, end);

    slice.forEach(photo => {
        const item = createMomentItem(photo);
        grid.appendChild(item);
        momentItems.push(item);
    });

    currentPage++;
    updateLoadMoreBtn();
}

// ── Load More button ──────────────────────
function updateLoadMoreBtn() {
    let btn = document.getElementById('loadMoreBtn');
    const remaining = filteredPhotos.length - (currentPage * PAGE_SIZE);

    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'loadMoreBtn';
        btn.className = 'btn btn-secondary';
        btn.style.cssText = 'display:block; margin: 2rem auto 0;';
        document.getElementById('gallery').appendChild(btn);
        btn.addEventListener('click', renderNextPage);
    }

    if (remaining <= 0) {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'block';
        btn.textContent = `Load More (${remaining} remaining)`;
    }
}

// ── Apply filter ──────────────────────────
function applyFilter(filter) {
    currentFilter  = filter;
    currentPage    = 0;
    momentItems    = [];

    const grid = document.getElementById('momentsGrid');
    grid.innerHTML = '';

    filteredPhotos = filter === 'all'
        ? allPhotos
        : allPhotos.filter(p => p.categories.includes(filter));

    if (filteredPhotos.length === 0) {
        grid.innerHTML = '<p style="text-align:center;opacity:0.5;padding:2rem">No photos yet.</p>';
        updateLoadMoreBtn();
        return;
    }

    renderNextPage();
}

// ── Skeleton cards ────────────────────────
function renderSkeletons(grid, n = 6) {
    grid.innerHTML = '';
    for (let i = 0; i < n; i++) {
        const el = document.createElement('div');
        el.className = 'moment-item skeleton';
        el.style.padding = '0';
        el.innerHTML = `
            <div class="skeleton-img"></div>
            <div style="padding:0.75rem 1rem 1rem">
                <div class="skeleton-line skeleton-line--medium"></div>
                <div class="skeleton-line skeleton-line--short"></div>
            </div>`;
        grid.appendChild(el);
    }
}

// ── Load photos from Firebase ─────────────
window.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('momentsGrid');
    renderSkeletons(grid);

    try {
        const snapshot = await get(photosRef);
        const data = snapshot.val();

        if (!data) {
            grid.innerHTML = '<p style="text-align:center;opacity:0.5;padding:2rem">No photos yet.</p>';
            return;
        }

        allPhotos = Object.values(data).filter(p => p.approved !== false);
        // Shuffle biar tiap refresh urutan beda
        allPhotos.sort(() => Math.random() - 0.5);
        applyFilter('all');

    } catch (err) {
        console.error(err);
        grid.innerHTML = '<p style="text-align:center;opacity:0.5;padding:2rem">Failed to load photos.</p>';
    }
});

// ── Filter buttons ────────────────────────
document.getElementById('momentsFilters').addEventListener('click', e => {
    const btn = e.target.closest('.moments-filter');
    if (!btn) return;
    document.querySelectorAll('.moments-filter').forEach(b => b.classList.remove('moments-filter--active'));
    btn.classList.add('moments-filter--active');
    applyFilter(btn.dataset.filter);
});

// ── Lightbox ──────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCaption');

function openLightbox(index) {
    currentMoment = index;
    lightboxImg.src = momentItems[index].querySelector('img').src;
    const rawCap = momentItems[index].querySelector('.moment-caption')?.textContent || '';
    lightboxCap.textContent = rawCap !== '— Caption —' ? rawCap : '';
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
}

function lightboxNav(dir) {
    currentMoment = (currentMoment + dir + momentItems.length) % momentItems.length;
    openLightbox(currentMoment);
}

document.getElementById('momentsGrid').addEventListener('click', e => {
    const item = e.target.closest('.moment-item');
    if (!item) return;
    const idx = momentItems.indexOf(item);
    if (idx !== -1) openLightbox(idx);
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click',  () => lightboxNav(-1));
document.getElementById('lightboxNext').addEventListener('click',  () => lightboxNav(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
});

// ── Feedback ──────────────────────────────
onValue(commentsRef, (snapshot) => {
    const list  = document.getElementById("feedbackList");
    const empty = document.getElementById("feedbackEmpty");
    const data  = snapshot.val();
    list.querySelectorAll(".feedback-card").forEach(el => el.remove());
    if (!data) { empty.style.display = "block"; return; }
    empty.style.display = "none";
    Object.values(data).reverse().forEach(item => {
        const card = document.createElement("div");
        card.className = "glass-card feedback-card fade-in";
        card.innerHTML = `
            <div class="feedback-card-header">
                <span class="feedback-avatar">${escapeHtml(item.nama.charAt(0).toUpperCase())}</span>
                <div class="feedback-card-meta">
                    <strong class="feedback-card-name">${escapeHtml(item.nama)}</strong>
                    <span class="feedback-card-from"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.dari || "")}</span>
                    <span class="feedback-card-time">${formatTime(item.waktu)}</span>
                </div>
            </div>
            <p class="feedback-card-msg">${escapeHtml(item.pesan)}</p>
        `;
        list.appendChild(card);
    });
});

document.getElementById("feedbackSubmit").addEventListener("click", async () => {
    const nameEl = document.getElementById("feedbackName");
    const fromEl = document.getElementById("feedbackFrom");
    const msgEl  = document.getElementById("feedbackMessage");
    const btn    = document.getElementById("feedbackSubmit");
    const nama   = nameEl.value.trim();
    const dari   = fromEl.value.trim();
    const pesan  = msgEl.value.trim();

    if (!nama || !pesan) { alert("Nama dan pesan harus diisi ya!"); return; }
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
        await push(commentsRef, {
            nama, dari: dari || "Anonymous",
            pesan, waktu: serverTimestamp()
        });
        nameEl.value = ""; fromEl.value = ""; msgEl.value = "";
    } catch(err) {
        alert("Gagal kirim, coba lagi ya!"); console.error(err);
    } finally {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message'; btn.disabled = false;
    }
});

// ── Contribute ────────────────────────────
const CONTRIB_PASSWORD = 'Oktober13';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxccvha88/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'moments_unsigned';

const contributeBtn   = document.getElementById('contributeBtn');
const contributeModal = document.getElementById('contributeModal');
const contributeClose = document.getElementById('contributeClose');
const contributeAuth  = document.getElementById('contributeAuth');
const contributeForm  = document.getElementById('contributeForm');

// Theme button styling
function styleContribBtn() {
    const isLight = document.body.classList.contains('light');
    contributeBtn.style.background = isLight
        ? 'rgba(0,0,0,0.05)'
        : 'rgba(255,255,255,0.1)';
    contributeBtn.style.color = isLight ? '#1a1a1a' : '#ffffff';
    contributeBtn.style.border = isLight
        ? '1px solid rgba(0,0,0,0.1)'
        : '1px solid rgba(255,255,255,0.2)';
}
styleContribBtn();
new MutationObserver(styleContribBtn).observe(document.body, { attributes: true, attributeFilter: ['class'] });

contributeBtn.addEventListener('mouseover', () => contributeBtn.style.transform = 'scale(1.1)');
contributeBtn.addEventListener('mouseout',  () => contributeBtn.style.transform = 'scale(1)');

contributeBtn.addEventListener('click', () => {
    contributeModal.style.display = 'flex';
    contributeAuth.style.display = 'block';
    contributeForm.style.display = 'none';
    document.getElementById('contributePassword').value = '';
});

contributeClose.addEventListener('click', () => {
    contributeModal.style.display = 'none';
});

contributeModal.addEventListener('click', e => {
    if (e.target === contributeModal) contributeModal.style.display = 'none';
});

document.getElementById('contributeAuthBtn').addEventListener('click', () => {
    const pw = document.getElementById('contributePassword').value;
    if (pw === CONTRIB_PASSWORD) {
        contributeAuth.style.display = 'none';
        contributeForm.style.display = 'flex';
    } else {
        alert('Wrong password!');
    }
});

document.getElementById('contribSubmit').addEventListener('click', async () => {
    const file     = document.getElementById('contribFile').files[0];
    const caption  = document.getElementById('contribCaption').value.trim() || '';
    const category = document.getElementById('contribCategory').value;
    const status   = document.getElementById('contribStatus');
    const btn      = document.getElementById('contribSubmit');

    if (!file) { alert('Pilih foto dulu!'); return; }

    btn.disabled = true;
    btn.textContent = 'Uploading...';
    status.textContent = 'Uploading to Cloudinary...';

    try {
        // Upload ke Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'moments');

        const res  = await fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: formData });
        const data = await res.json();

        if (!data.secure_url) throw new Error('Upload failed');

        // Simpan ke Firebase
        await push(photosRef, {
            url: data.secure_url,
            caption,
            categories: [category],
            approved: true,
            uploadedBy: 'contributor',
            filename: file.name
        });

        status.textContent = 'Uploaded! Refresh to see your photo.';
        document.getElementById('contribFile').value = '';
        document.getElementById('contribCaption').value = '';

    } catch (err) {
        console.error(err);
        status.textContent = 'Failed. Try again.';
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-upload"></i> Upload';
    }
});