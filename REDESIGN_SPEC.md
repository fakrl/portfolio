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

---

## FASE 3 — Adaptasi referensi Renlenon (renlenon.vercel.app) · Aug 2026

Konteks: Fase 1 & 2 di atas SEBAGIAN BESAR SUDAH SELESAI (M3 icons, admin Google auth, guestbook threaded, Umami terpasang, positioning Full Stack). Section ini adalah lapisan baru, bukan pengganti — pertahankan glassmorphism + dark/light toggle yang sudah ada. **Ren pakai flat dark minimal — kita TIDAK ikut visual itu, cuma struktur/kontennya.**

Referensi hidup: https://renlenon.vercel.app/ (homepage) dan https://renlenon.vercel.app/keepr (case-study page).

### T9. Featured Build spotlight (baru, di bawah hero, sebelum "Featured Works" grid)
- 1 project tunggal di-highlight besar (bukan grid): screenshot besar + judul + 1 paragraf cerita + tag stack + tombol "Read case study →" (link ke halaman case-study, lihat T13).
- Kandidat pertama: **Nobel Akademi — Bootcamp Module** (butuh screenshot dulu, masih placeholder — lihat catatan blocker lama) ATAU **Evermos** (sudah ada 14 screenshot siap pakai di `image/proj-evermos-*.webp`).
- Acceptance: ada 1 section baru "Featured Build" yang jelas beda dari grid "Featured Works" biasa.

### T10. Tech chip inline di hero-bio
- Ganti sebagian `<p class="hero-bio">` (baris ±1639-1641) supaya nama teknologi utama (Laravel, Golang, Vue.js) tampil sebagai chip kecil inline di tengah kalimat, bukan teks polos. Style baru `.bio-chip` (badge kecil, ikon devicon + label, inline-block, vertical-align middle).
- Acceptance: minimal 3 tech chip inline di kalimat hero-bio.

### T11. Badge "IN PROGRESS" di project card
- Tambah varian badge baru di card project (`.exp-card-badge--progress` atau sejenis di `components.css`), dipakai kalau ada project yang statusnya belum kelar (misal NobiLive nanti pas sudah masuk).
- Acceptance: badge siap dipakai, tidak harus langsung dipasang di project manapun sekarang (belum ada yang berstatus progress di homepage).

### T12. "Outside the IDE" section (baru, sebelum footer)
- Section ringkas: judul + 1 kalimat pembuka + tag list hobi (Main Gitar, Naik Gunung/Camping, Nonton — Interstellar/CODA/The 100, Podcast — Raditya Dika/Malaka Project). Ambil dari `info dasar about fakrul.md` bagian "KEHIDUPAN & MINAT".
- Style: konsisten glass-card, bukan flat kaya Ren.
- Acceptance: section baru muncul, singkat (tidak lebih dari 4-5 baris + tag row).

### T13. Template case-study project (halaman dinamis, opsi 2 yang dipilih)
- File baru: `project/index.html` (satu template, dipakai semua project, dibedakan lewat query param `?id=`).
- Baca data dari `data/proof-data.json` (field id harus match salah satu entry di `projects[]`).
- **Field baru yang perlu ditambah ke schema `proof-data.json` per project** (opsional per-item, kalau kosong section terkait disembunyikan):
  ```
  "caseStudy": {
    "whyBuilt": "...",       // 1 paragraf, personal motivation
    "goal": "...",           // 1 paragraf, tujuan project
    "overview": { "role": "...", "period": "...", "type": "...", "architecture": "..." },
    "whatItDoes": ["...", "..."],           // checklist bullets
    "screens": [
      { "icon": "msym-name", "title": "...", "desc": "...", "images": ["../image/..."] }
    ],
    "techNote": "..."        // 1 paragraf technical-depth (kenapa pilih teknologi X)
  }
  ```
- Layout template: breadcrumb "← Back to Home" → eyebrow "FEATURED BUILD" + judul + ringkasan → hero image besar → 2 kolom "Why Built It" / "Project Goal" → grid meta "Project Overview" → checklist "What It Does" → "Key Screens" (per screen: ikon+judul+desc+carousel gambar, dots pagination kalau >1 image) → "Tech Stack" (chip + `techNote`) → CTA penutup ("Open to opportunities" + link CV/email, BUKAN "let's collaborate" ala freelance Ren).
- Kalau `caseStudy` kosong untuk suatu id → tampilkan pesan graceful "Case study coming soon" + link balik, JANGAN page kosong/error.
- Pilot pertama: **Evermos** (`proj-evermos`, bahan lengkap) atau **Core Initiative** (`proj-core-initiative`).
- Acceptance: `project/index.html?id=proj-evermos` render lengkap dari data JSON, tidak ada hardcode per-project di HTML.

### T14. Redesign Skills section — dari 3D sphere ke grouped chip list
- **Keputusan berubah dari REDESIGN_SPEC lama (yang bilang "pertahankan skill globe")** — setelah lihat referensi Ren, disepakati static chip lebih scannable buat recruiter. Turunkan prioritas 3D sphere, boleh disimpan sebagai elemen dekoratif kecil di tempat lain (opsional), tapi BUKAN representasi utama skill lagi.
- Ganti isi `<section id="skills">` (baris ±1954-1960 di `index.html`) dan hapus/nonaktifkan script sphere (baris ±2182-akhir file, cari `Skills 3D Sphere`).
- Data SKILLS yang sudah ada (baris 2185-2206) dipindah, dikelompokkan per kategori mengikuti struktur CV (`gen_cv.js` skillLine): **Languages** (PHP, JavaScript, Golang, SQL, HTML5, CSS3), **Frameworks** (Laravel, Vue.js, Bootstrap, Tailwind), **Databases** (MySQL, Firebase), **Tools & DevOps** (Git, GitHub, Postman, VS Code, Figma), **AI & Cloud** (Azure, AI-Assisted Dev).
- Layout: per kategori = label kecil + row chip (ikon devicon + nama), pakai `.tag`/glass-chip style yang sudah ada di `components.css` (konsisten sama tag di exp-card), BUKAN card flat ala Ren.
- Acceptance: semua 20 skill lama tetap ada, tersusun per kategori, bisa di-scan tanpa interaksi drag/hover apapun.

### T15. Redesign project card layout (grid "Featured Works" & proof cards)
- Adaptasi urutan info dari Ren: gambar besar di atas (frame/bezel tipis) → judul (bold) → role/subtitle di baris terpisah (bukan digabung ke judul) → 1-2 kalimat desc → tag teknologi row di paling bawah.
- Terapkan ke `.exp-card` grid Featured Works di `index.html` DAN card di `proof/index.html` biar konsisten.
- **Pertahankan** glass-card surface (blur/translucency) yang sudah ada — cuma urutan & hierarki info yang diadaptasi, bukan visual base-nya.
- Acceptance: card project baru punya pemisahan judul/role/desc/tag yang jelas, masih terlihat glassmorphic bukan flat.

### T16. Visitor counter (Firebase, bukan expose Umami)
- Reuse Firebase project yang sudah dipakai admin/guestbook. Tambah 1 collection/document counter (misal `stats/visits`, field `count`).
- Client-side: on page load, cek `localStorage.getItem('rb_visited')` — kalau belum ada, increment counter via Firebase (transaction/increment atom) lalu set flag localStorage supaya refresh berikutnya nggak nge-gandain angka.
- Tampilkan sebagai pill kecil di footer: "Visited by {count} people" + opsional avatar stack dekoratif (pakai ikon generik/dicebear, BUKAN foto asli — privasi).
- **JANGAN** coba tarik angka dari Umami Cloud API di client-side (butuh token privat, risiko bocor kalau ditaro di JS publik).
- Acceptance: angka bertambah 1 per visitor unik (per browser), tidak reset kalau di-refresh berkali-kali oleh orang yang sama.

---

## Catatan & blocker
- Nobel: izin SUDAH di-ACC lead. Butuh screenshot UI buat kartu Featured Works (sementara placeholder). Tetap sensor kredensial/data/kode internal.
- Jangan klaim "Claude" sebagai skill inti — framing "AI-assisted development".
- Konsistensi: CV (folder cv/, versi Full Stack + hyperlink proof) & LinkedIn sudah Full Stack — portfolio harus ikut.
- Hanya kamu yang bisa: Firebase Console (Google provider, config, rules), pendaftaran analytics, push/deploy Netlify.
