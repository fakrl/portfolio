// ==========================================
// MOMENTS.JS
// Dipakai di: moments/index.html
// Load: <script src="../script.js"></script>
//        <script type="module" src="../moments.js"></script>
// CATATAN: Firebase pakai type="module" jadi
// file ini harus di-load sebagai module juga
// ==========================================

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue, serverTimestamp }
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

const app         = initializeApp(firebaseConfig);
const db          = getDatabase(app);
const commentsRef = ref(db, "feedback");

// ── Helpers ───────────────────────────────
function escapeHtml(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function formatTime(ts) {
    if (!ts) return "";
    return new Date(ts).toLocaleDateString("id-ID", {
        day:"numeric", month:"short", year:"numeric",
        hour:"2-digit", minute:"2-digit"
    });
}

function createCard(data) {
    const card = document.createElement("div");
    card.className = "glass-card feedback-card fade-in";
    card.innerHTML = `
        <div class="feedback-card-header">
            <span class="feedback-avatar">${escapeHtml(data.nama.charAt(0).toUpperCase())}</span>
            <div class="feedback-card-meta">
                <strong class="feedback-card-name">${escapeHtml(data.nama)}</strong>
                <span class="feedback-card-from">📍 ${escapeHtml(data.dari || "")}</span>
                <span class="feedback-card-time">${formatTime(data.waktu)}</span>
            </div>
        </div>
        <p class="feedback-card-msg">${escapeHtml(data.pesan)}</p>
    `;
    return card;
}

// ── Listen realtime ───────────────────────
onValue(commentsRef, (snapshot) => {
    const list  = document.getElementById("feedbackList");
    const empty = document.getElementById("feedbackEmpty");
    const data  = snapshot.val();
    list.querySelectorAll(".feedback-card").forEach(el => el.remove());
    if (!data) { empty.style.display = "block"; return; }
    empty.style.display = "none";
    Object.values(data).reverse().forEach(item => list.appendChild(createCard(item)));
});

// ── Submit feedback ───────────────────────
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

// ── Filter gallery ────────────────────────
document.getElementById('momentsFilters').addEventListener('click', e => {
    const btn = e.target.closest('.moments-filter');
    if (!btn) return;
    document.querySelectorAll('.moments-filter').forEach(b => b.classList.remove('moments-filter--active'));
    btn.classList.add('moments-filter--active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.moment-item').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
    });
});

// ── Lightbox ──────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCaption');
let momentItems   = [];
let currentMoment = 0;

function openLightbox(index) {
    currentMoment = index;
    const item = momentItems[index];
    lightboxImg.src         = item.querySelector('img').src;
    lightboxCap.textContent = item.querySelector('.moment-caption')?.textContent || '';
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
}

function lightboxNav(dir) {
    const visible = momentItems.filter(i => i.style.display !== 'none');
    const idx     = visible.indexOf(momentItems[currentMoment]);
    currentMoment = momentItems.indexOf(visible[(idx + dir + visible.length) % visible.length]);
    openLightbox(currentMoment);
}

document.getElementById('momentsGrid').addEventListener('click', e => {
    const item = e.target.closest('.moment-item');
    if (!item) return;
    momentItems = Array.from(document.querySelectorAll('.moment-item'));
    openLightbox(momentItems.indexOf(item));
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