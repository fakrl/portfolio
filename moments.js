import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue, serverTimestamp, get }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();
const photosRef   = ref(db, "photos");
const commentsRef = ref(db, "feedback");

// ── Guestbook owner auth ──
const OWNER_UID = "624rNLzK3JSG61VOCF9ddWEEUm33";
let currentUser = null;
let latestFeedback = null;
const isOwner = () => !!currentUser && currentUser.uid === OWNER_UID;

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
function renderSkeletons(grid, n = PAGE_SIZE) {
    grid.innerHTML = '';
    for (let i = 0; i < n; i++) {
        const el = document.createElement('div');
        el.className = 'moment-item skeleton';
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

// ── Feedback (Threads-style guestbook, same as homepage) ──
function relativeTime(ts) {
    if (!ts) return "";
    const diff = Date.now() - ts;
    if (diff < 60000) return "just now";
    const m = Math.floor(diff / 60000);
    if (m < 60) return m + "m";
    const h = Math.floor(m / 60);
    if (h < 24) return h + "h";
    const d = Math.floor(h / 24);
    if (d < 7) return d + "d";
    return formatTime(ts);
}

function replyHtml(r) {
    return `<div class="gb-reply">
        <span class="gb-avatar gb-avatar--owner"><img src="../image/profile.webp" alt="Fakhrul" onerror="this.replaceWith(document.createTextNode('FM'))"></span>
        <div class="gb-main">
            <div class="gb-head">
                <span class="gb-name">Fakhrul</span>
                <span class="gb-badge"><i class="fa-solid fa-circle-check"></i> Owner</span>
                <span class="gb-time">· ${relativeTime(r.waktu)}</span>
            </div>
            <p class="gb-text">${escapeHtml(r.pesan)}</p>
        </div>
    </div>`;
}

function renderFeedback() {
    const list  = document.getElementById("feedbackList");
    const empty = document.getElementById("feedbackEmpty");
    list.querySelectorAll(".gb-post").forEach(el => el.remove());
    if (!latestFeedback) { empty.style.display = "block"; return; }
    empty.style.display = "none";
    Object.entries(latestFeedback).reverse().forEach(([key, item]) => {
        const replies = item.replies ? Object.values(item.replies) : [];
        const repliesHtml = replies.length
            ? `<div class="gb-replies">${replies.map(replyHtml).join("")}</div>` : "";
        const replyForm = isOwner()
            ? `<div class="gb-reply-to">Replying to <strong>${escapeHtml(item.nama)}</strong></div>
               <div class="gb-reply-form">
                    <input class="feedback-input gb-reply-input" placeholder="Post your reply…" maxlength="300">
                    <button class="gb-reply-send" data-key="${key}">Reply</button>
               </div>` : "";
        const fromLine = item.dari ? `<div class="gb-from">${escapeHtml(item.dari)}</div>` : "";
        const post = document.createElement("article");
        post.className = "gb-post fade-in";
        post.innerHTML = `
            <span class="gb-avatar">${escapeHtml((item.nama || "?").charAt(0).toUpperCase())}</span>
            <div class="gb-main">
                <div class="gb-head">
                    <span class="gb-name">${escapeHtml(item.nama)}</span>
                    <span class="gb-time">· ${relativeTime(item.waktu)}</span>
                </div>
                ${fromLine}
                <p class="gb-text">${escapeHtml(item.pesan)}</p>
                ${repliesHtml}
                ${replyForm}
            </div>
        `;
        list.appendChild(post);
    });
}

onValue(commentsRef, (snapshot) => { latestFeedback = snapshot.val(); renderFeedback(); });

document.getElementById("feedbackSubmit").addEventListener("click", async () => {
    const nameEl = document.getElementById("feedbackName");
    const fromEl = document.getElementById("feedbackFrom");
    const msgEl  = document.getElementById("feedbackMessage");
    const btn    = document.getElementById("feedbackSubmit");
    const nama = nameEl.value.trim(), dari = fromEl.value.trim(), pesan = msgEl.value.trim();
    if (!nama || !pesan) { alert("Name and message required."); return; }
    btn.textContent = "Sending..."; btn.disabled = true;
    try {
        await push(commentsRef, { nama, dari: dari || "Anonymous", pesan, waktu: serverTimestamp() });
        nameEl.value = ""; fromEl.value = ""; msgEl.value = "";
    } catch(err) { alert("Failed to send, try again."); console.error(err); }
    finally { btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message'; btn.disabled = false; }
});

// ── Owner auth (Google sign-in) ──
function doLogin() {
    signInWithPopup(auth, provider).catch(err => {
        console.error(err);
        alert("Sign-in failed. Enable the Google provider in Firebase Console → Authentication.");
    });
}
function updateAuthBar() {
    const bar = document.getElementById("ownerAuthBar");
    if (!bar) return;
    if (currentUser) {
        bar.innerHTML =
            `<span class="owner-auth-status">${isOwner() ? "✓ Owner mode — you can reply" : "Signed in (not recognized as owner)"}</span>
             <button id="ownerLogoutBtn" class="owner-auth-link">Logout</button>`;
        document.getElementById("ownerLogoutBtn").addEventListener("click", () => signOut(auth));
    } else {
        bar.innerHTML =
            `<button id="ownerLoginBtn" class="owner-auth-link"><i class="fa-brands fa-google"></i> Owner? Sign in to reply</button>`;
        document.getElementById("ownerLoginBtn").addEventListener("click", doLogin);
    }
}
updateAuthBar();

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    updateAuthBar();
    renderFeedback();
});

document.getElementById("feedbackList").addEventListener("click", async (e) => {
    const btn = e.target.closest(".gb-reply-send");
    if (!btn) return;
    if (!isOwner()) { alert("Owner only."); return; }
    const key   = btn.dataset.key;
    const input = btn.parentElement.querySelector(".gb-reply-input");
    const pesan = input.value.trim();
    if (!pesan) return;
    btn.disabled = true;
    try {
        await push(ref(db, `feedback/${key}/replies`), { pesan, waktu: serverTimestamp(), uid: currentUser.uid });
        input.value = "";
    } catch(err) { console.error(err); alert("Reply failed. Check your Firebase DB rules."); }
    finally { btn.disabled = false; }
});

// Photo upload moved to /admin (Google-authenticated). The "+" button now links there.