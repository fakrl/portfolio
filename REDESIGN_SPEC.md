# Portfolio Redesign — Build Spec (untuk dijalankan di Claude Code)

Owner: Fakhrul Mukhlisin · Repo: github.com/fakrl/portfolio · Host: Netlify · Stack: Vanilla HTML/CSS/JS + Firebase
Disusun: 16 Jun 2026. Jalankan section per section sambil cek preview live.

---

## 0. Konteks & state sekarang
- File utama: `index.html` (2061 baris, banyak CSS inline di <style>), `proof/index.html`, `moments/index.html`, `style.css` (CSS variables + theme), `components.css`, `animations.css`, `forms.css`, `experience-carousel.css`, `pages.css`, `script.js`, `moments.js`, `proof.js`.
- Theme: monokromatik glass UI, toggle dark/light via `body.light`/`body.dark`, font Plus Jakarta Sans, ikon devicon + Font Awesome.
- Firebase udah dipakai untuk: feedback (realtime DB) + moments gallery (ada admin sederhana).
- Konten proof/projects/experience saat ini HARDCODED di HTML (belum data-driven).

## 1. Positioning baru (WAJIB, konsisten dgn CV & LinkedIn)
**Full Stack Developer | Software Engineer.** Backend andalan = Laravel; Golang & Vue tetap aset. JANGAN klaim Inggris berlebihan, JANGAN cantumkan "Claude" sebagai skill inti.

## 2. Arah desain
- Pertahankan glassmorphism + dark/light toggle yang sudah ada.
- Referensi: **Deft Valian** (deftvalian.vercel.app) untuk navbar, hero profile card, experience cards + baris "Technologies Used", dan Featured Works cards. **Rifki Izzulhaq** untuk metric callouts di project card. **Pertahankan 3D skill globe milik sendiri.**

## 3. Keputusan yang sudah dikunci
- **Skill globe:** dipertahankan. Bersihkan ikon → pakai devicon SVG jsdelivr yang konsisten. Tambah label nama skill di center + counter ("N technologies") saat hover/fokus. TANPA band kategori (biar tidak berantakan).
- **Guestbook:** threaded (reply bersarang 1 level). Reply sebagai owner DIKUNCI di balik Google auth (bukan password).
- **Admin:** Fase 2. Firebase Auth Google sign-in (BUKAN password client-side). Analytics pakai tool jadi (Cloudflare Web Analytics / Plausible / Umami / GA) — JANGAN bikin tracker sendiri.
- **English:** hapus klaim "B2 Proficiency" di section Languages. Cukup Indonesian (Native, UKBI Madya). English boleh dihapus atau ditulis netral; jangan over-claim (TOEFL aktual = Beginner).

---

## FASE 1 — Redesign publik (yang dilihat recruiter) → KERJAKAN DULU

### T1. Positioning sweep
- `<title>` & meta description/keywords/og: tambah Full Stack + Laravel; jangan cuma "backend & frontend, Golang and Vue.js".
- Hero `.hero-label`: "Full Stack Developer" (atau "Software Engineer").
- Hero `.hero-role`: ganti "Backend · Frontend · Information Systems" → "Full Stack · Laravel · Vue.js · Golang".
- Hero `.hero-bio`: tulis ulang, sebut Indotech/Nobel sebagai current + Evermos/Core sebagai bukti. Contoh: "Fullstack Developer Intern di PT Indotech Digital (Laravel). Sebelumnya bikin REST API marketplace di Golang (90.91) & e-commerce Vue.js (87.79). Peringkat #5/926 Yandex ML. GPA 3.68."
- Acceptance: tidak ada lagi penyebutan "Backend · Frontend" sebagai identitas utama.

### T2. Hero — Deft-style glass profile card
- Layout: sisi teks (label, nama, role, bio, CTA) + **kartu profil glass** (foto cycling yang sudah ada, nama, role, @fak.rl, dot "Online" hijau, tombol "Contact Me" + "Download CV").
- Pertahankan foto cycling + dots yang sudah ada, pindahkan ke dalam card.
- Acceptance: hero terlihat seperti business-card glass, bukan foto bulat polos.

### T3. Experience → cards (ganti timeline)
- Format kartu per item: Role · Company · Tanggal · Lokasi · 2-3 bullet · baris "Technologies Used" (tag chips).
- **Tambah Indotech sebagai item PALING ATAS:** Full Stack Developer Intern — PT Indotech Digital Group · Jun 2026 – Present · Jakarta (Hybrid). Bullet: bangun modul Bootcamp Nobel Akademi end-to-end di Laravel 11 (data model 6 tabel, backend, admin CMS, halaman publik); eager-loaded Eloquent (hindari N+1); slug routing, YouTube embed, ratings; Git workflow (branch/PR/review). Tech: Laravel, PHP, MySQL, Eloquent, Bootstrap.
- Item lain tetap (Evermos, Core, Kesbang, Yandex, LKA, PT CMS, FSJ) — boleh tetap link ke /proof/#anchor.
- Acceptance: Indotech tampil teratas dengan tag teknologi.

### T4. Featured Works (BARU di home) — value terbesar
- Section baru "Featured Works" di home (sebelumnya project cuma di proof page).
- Kartu project: screenshot + judul + deskripsi singkat + ikon tech + **metric highlights** (ala Rifki, mis. "7 modules", "90.91/100", "6 related tables").
- Project yang masuk:
  1. **Nobel Akademi — Bootcamp Module** (PT Indotech Digital) — Laravel 11. Metrics: LMS produksi, 6 tabel berelasi, admin CMS. IZIN: SUDAH DI-ACC lead. ⚠️ BUTUH screenshot UI (publik index+detail / admin) tanpa data sensitif → sementara pakai placeholder.
  2. **Marketplace REST API — Evermos** — Golang/Gin. Metrics: 7 modules, 90.91/100. Link github.com/fakrl/evermos-backend.
  3. **E-Commerce Catalog — Core Initiative** — Vue.js 2. Metrics: 3 dynamic themes, 87.79/100. Link github.com/fakrl/ecommerce-catalog.
  4. **Groomy** (sudah ada di proof, proj-groomy) — UI/UX.
- Acceptance: minimal 3-4 project card tampil di home dengan metrik.

### T5. Skills globe cleanup + update
- Seragamkan SEMUA ikon ke devicon SVG jsdelivr (hapus SVG buatan tangan REST API/Postman yang bikin tidak konsisten — pakai devicon yang ada atau ikon seragam).
- Update daftar skill: naikkan Laravel; pastikan ada PHP, Laravel, Vue, Golang, MySQL, JS, Git, Figma, Bootstrap, Tailwind(?), Postman. Tambahkan kapabilitas AI-assisted development / Prompt Engineering (framing: cara kerja, BUKAN "Claude" sebagai skill).
- Tambah label center + counter "N technologies" saat hover/fokus. TANPA band kategori.
- Acceptance: semua ikon rapi konsisten, ada label center.

### T6. Fix Languages (English overclaim)
- Section Education & Languages: hapus badge "English — B2 Proficiency". Sisakan Indonesian (Native · UKBI Madya). English: hapus atau tulis netral. JANGAN over-claim.

### T7. Fix link CV (case-sensitive Netlify)
- HTML menunjuk `cv/cv_fakhrul_mukhlisin_2026.pdf` (huruf kecil), file di git huruf besar `CV_Fakhrul_Mukhlisin_2026.pdf`. Di Netlify (case-sensitive) bisa 404.
- Solusi: samakan — rename file jadi lowercase di git ATAU ubah 2 link di index.html (hero + section contact) ke nama file aktual. Pastikan PDF terbaru (versi Full Stack, sudah ada di folder cv/) yang ke-serve.

### T8. OG image
- Bikin OG image 1200×630 (nama + role Full Stack), taruh di /image/, update meta og:image. (Saat ini referensi og-image.webp — pastikan ada.)

---

## FASE 2 — Unified Admin + data-driven (yang dilihat hanya kamu) → NANTI, bisa jadi project portfolio sendiri

### P1. Migrasi konten ke data-driven (Firebase)
- Pindahkan proof, projects, experience dari hardcoded HTML → Firebase Realtime DB / Firestore; render client-side. (Moments sudah data-driven, jadikan pola.)

### P2. Firebase Auth — Google sign-in
- Enable Google provider di Firebase Console. (HANYA kamu yang bisa.)
- Security rules: hanya UID kamu yang boleh write ke node admin (proof/projects/experience/guestbook-reply).

### P3. Admin panel terpadu (1 panel semua page)
- CRUD: moments + proof + projects. Reply guestbook sebagai owner.
- Gate seluruh panel di balik Google auth.

### P4. Analytics
- Integrasi tool jadi: Cloudflare Web Analytics (gratis, privacy-friendly) / Plausible / Umami / GA. Tempel 1 script. (Daftar akun = hanya kamu.)
- Di admin cukup tampilkan link / embed dashboard. JANGAN bikin tracker manual.

### P5. Guestbook threaded
- Tambah reply 1-level di bawah tiap feedback. Reply owner hanya muncul/boleh dibuat saat login (P2).

---

## Catatan & blocker
- Nobel: izin SUDAH di-ACC lead. Butuh screenshot UI buat kartu Featured Works (sementara placeholder). Tetap sensor kredensial/data/kode internal.
- Jangan klaim "Claude" sebagai skill inti — framing "AI-assisted development".
- Konsistensi: CV (folder cv/, versi Full Stack + hyperlink proof) & LinkedIn sudah Full Stack — portfolio harus ikut.
- Hanya kamu yang bisa: Firebase Console (Google provider, config, rules), pendaftaran analytics, push/deploy Netlify.
