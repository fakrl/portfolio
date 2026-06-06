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
const PAGE_SIZE   = 9;
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
    const map = { momen:'🤝 Momen', photography:'📷 Photography', personal:'🙋 Personal' };
    return map[cat] || cat;
}

// ── Create moment card ────────────────────
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

// ── Load photos from Firebase ─────────────
window.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('momentsGrid');
    grid.innerHTML = '<p style="text-align:center;opacity:0.5;padding:2rem">Loading photos...</p>';

    try {
        const snapshot = await get(photosRef);
        const data = snapshot.val();

        if (!data) {
            grid.innerHTML = '<p style="text-align:center;opacity:0.5;padding:2rem">No photos yet.</p>';
            return;
        }

        allPhotos = Object.values(data).filter(p => p.approved !== false);
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
    lightboxCap.textContent = momentItems[index].querySelector('.moment-caption')?.textContent || '';
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
                    <span class="feedback-card-from">📍 ${escapeHtml(item.dari || "")}</span>
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
        btn.textContent = "Send Message ✉️"; btn.disabled = false;
    }
});