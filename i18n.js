// ==========================================
// I18N.JS — EN / ID language switch
// Shared across all pages. Load AFTER script.js.
// Usage: tag any element with data-i18n="key" and the key
// must exist in I18N below with { en: "...", id: "..." }.
// For attributes (e.g. placeholder), use data-i18n-attr="placeholder:key".
// ==========================================

const I18N = {
    // ── Navbar ──
    'nav.home': { en: 'Home', id: 'Beranda' },
    'nav.experience': { en: 'Experience', id: 'Pengalaman' },
    'nav.work': { en: 'Work', id: 'Karya' },
    'nav.skills': { en: 'Skills', id: 'Keahlian' },
    'nav.education': { en: 'Education', id: 'Pendidikan' },
    'nav.contact': { en: 'Contact', id: 'Kontak' },
    'nav.proof': { en: 'Proof of Work', id: 'Bukti Karya' },
    'nav.proofShort': { en: 'Proof', id: 'Bukti' },
    'nav.moments': { en: 'Moments', id: 'Momen' },

    // ── Hero ──
    'hero.label': { en: 'Full Stack Developer', id: 'Full Stack Developer' },
    'hero.roleTag': { en: 'Full Stack Developer', id: 'Full Stack Developer' },
    'hero.roleLine': { en: 'Full Stack · Laravel · Vue.js · Golang', id: 'Full Stack · Laravel · Vue.js · Golang' },
    'hero.online': { en: 'Online · Open to Work', id: 'Online · Terbuka untuk Kerja' },
    'hero.contactBtn': { en: 'Contact Me', id: 'Hubungi Saya' },
    'hero.downloadCv': { en: 'Download CV', id: 'Unduh CV' },
    'hero.getInTouch': { en: 'Get In Touch', id: 'Hubungi Saya' },
    'hero.bio': {
        en: 'Full Stack Developer — currently a Full Stack Developer Intern at PT Indotech Digital, shipping features with <span class="bio-chip"><i class="devicon-laravel-plain colored"></i>Laravel</span> on a live product with 20+ pull requests merged to production. Before that: a marketplace REST API in <span class="bio-chip"><i class="devicon-go-plain colored"></i>Golang</span> (scored 90.91) and a <span class="bio-chip"><i class="devicon-vuejs-plain colored"></i>Vue.js</span> e-commerce frontend (87.79). Ranked #5 of 926 in Yandex ML. GPA 3.68. <strong>Open to full-time opportunities</strong> alongside my current internship.',
        id: 'Full Stack Developer — saat ini menjalani internship sebagai Full Stack Developer di PT Indotech Digital, merilis fitur dengan <span class="bio-chip"><i class="devicon-laravel-plain colored"></i>Laravel</span> di produk yang sudah live dengan 20+ pull request yang sudah merge ke production. Sebelumnya: REST API marketplace dengan <span class="bio-chip"><i class="devicon-go-plain colored"></i>Golang</span> (skor 90.91) dan frontend e-commerce <span class="bio-chip"><i class="devicon-vuejs-plain colored"></i>Vue.js</span> (87.79). Peringkat #5 dari 926 di kompetisi Yandex ML. IPK 3.68. <strong>Terbuka untuk peluang full-time</strong> di samping internship yang sedang berjalan.'
    },

    // ── Experience ──
    'exp.title': { en: 'Experience', id: 'Pengalaman' },
    'exp.techLabel': { en: 'Technologies Used', id: 'Teknologi yang Digunakan' },
    'exp.focusLabel': { en: 'Focus', id: 'Fokus' },

    'exp.indotech.role': { en: 'Full Stack Developer Intern', id: 'Magang Full Stack Developer' },
    'exp.indotech.meta': { en: 'Jun 2026 – Present · Jakarta (Hybrid)', id: 'Jun 2026 – Sekarang · Jakarta (Hybrid)' },
    'exp.indotech.bullet1': {
        en: 'Shipping features to a live LMS in Laravel 11 — <strong>20+ pull requests merged to production</strong> through a dev → staging → main review flow.',
        id: 'Merilis fitur ke LMS yang sudah live dengan Laravel 11 — <strong>20+ pull request sudah merge ke production</strong> lewat alur review dev → staging → main.'
    },
    'exp.indotech.bullet2': {
        en: 'Built the Bootcamp module end-to-end: normalized data model (6 related tables), backend, admin CMS, and public pages — with eager-loaded Eloquent relations to avoid N+1 queries.',
        id: 'Membangun modul Bootcamp end-to-end: data model ternormalisasi (6 tabel terkait), backend, admin CMS, dan halaman publik — dengan eager-loaded Eloquent relations untuk menghindari N+1 queries.'
    },
    'exp.indotech.bullet3': {
        en: 'Delivered the Webinar module (registration flow, Mailable confirmation emails) plus e-portfolio, certification, and corporate pages.',
        id: 'Merilis modul Webinar (alur pendaftaran, email konfirmasi via Mailable) plus halaman e-portfolio, sertifikasi, dan korporat.'
    },
    'exp.indotech.bullet4': {
        en: "Debugged a production outage down to root cause: a corrupted vendor asset was silently halting JavaScript execution — fixed it and hardened the page so one failing library can't break unrelated features.",
        id: 'Melacak root cause sebuah production outage: vendor asset yang corrupt diam-diam menghentikan eksekusi JavaScript — diperbaiki dan halamannya diperkuat supaya satu library yang gagal nggak bisa merusak fitur lain.'
    },

    'exp.evermos.role': { en: 'Backend Developer Intern', id: 'Magang Backend Developer' },
    'exp.evermos.meta': { en: 'Dec 2025 · Remote', id: 'Des 2025 · Remote' },
    'exp.evermos.desc': {
        en: 'Full marketplace REST API in Golang — Gin, MySQL, JWT. 7 modules, clean architecture, atomic transactions. Score: Excellent.',
        id: 'REST API marketplace lengkap dengan Golang — Gin, MySQL, JWT. 7 modul, clean architecture, atomic transactions. Skor: Excellent.'
    },

    'exp.core.role': { en: 'Frontend Developer Intern', id: 'Magang Frontend Developer' },
    'exp.core.meta': { en: 'Oct – Nov 2025 · Remote', id: 'Okt – Nov 2025 · Remote' },
    'exp.core.desc': {
        en: 'E-commerce catalog in Vue.js 2 — 3 dynamic UI themes, pixel-perfect Figma, CI/CD to Firebase. Score: Excellent.',
        id: 'Katalog e-commerce dengan Vue.js 2 — 3 tema UI dinamis, Figma pixel-perfect, CI/CD ke Firebase. Skor: Excellent.'
    },

    'exp.yandex.role': { en: 'Machine Learning Program', id: 'Program Machine Learning' },
    'exp.yandex.meta': { en: 'May – Jul 2025 · Online', id: 'Mei – Jul 2025 · Online' },
    'exp.yandex.desc': {
        en: 'Ranked #5 out of 926 participants. Built ML models across 91 hrs of intensive Python curriculum.',
        id: 'Peringkat #5 dari 926 peserta. Membangun model ML sepanjang 91 jam kurikulum Python intensif.'
    },

    'exp.lka.role': { en: 'Data Management Intern', id: 'Magang Manajemen Data' },
    'exp.lka.desc': {
        en: 'Digitized 500+ records, built JS automation to archive 1,000+ files — eliminated manual processing.',
        id: 'Mendigitalkan 500+ arsip, membangun otomatisasi JS untuk mengarsipkan 1.000+ file — menghilangkan proses manual.'
    },

    'exp.kesbang.role': { en: 'Computer Operator', id: 'Operator Komputer' },
    'exp.kesbang.meta': { en: 'Nov – Dec 2025 · Jakarta Pusat', id: 'Nov – Des 2025 · Jakarta Pusat' },

    'exp.cms.desc': {
        en: 'Wrote content scripts, led main footage capture (photo & video), contributed to digital marketing strategy.',
        id: 'Menulis naskah konten, memimpin pengambilan footage utama (foto & video), berkontribusi pada strategi digital marketing.'
    },

    'exp.fsj.role': { en: 'President', id: 'Ketua' },
    'exp.fsj.meta': { en: 'Oct 2021 – Nov 2022', id: 'Okt 2021 – Nov 2022' },

    // ── Featured Build ──
    'spotlight.eyebrow': { en: 'Featured Build', id: 'Karya Unggulan' },
    'spotlight.evermos.title': { en: 'Marketplace REST API — Evermos', id: 'Marketplace REST API — Evermos' },
    'spotlight.evermos.sub': { en: 'Backend Developer Intern · Evermos × Rakamin Academy', id: 'Magang Backend Developer · Evermos × Rakamin Academy' },
    'spotlight.evermos.desc': {
        en: "A full marketplace REST API built solo in Golang: 7 modules (Auth, User, Store, Address, Category, Product, Transaction), JWT auth with RBAC, multi-image upload, price-range filtering, and atomic DB transactions using Clean Architecture. Scored 90.91/100 — the highest-scored project I've shipped, and the one I can defend line-by-line in an interview.",
        id: 'REST API marketplace lengkap yang dibangun sendirian dengan Golang: 7 modul (Auth, User, Store, Address, Category, Product, Transaction), JWT auth dengan RBAC, multi-image upload, filter rentang harga, dan atomic DB transactions dengan Clean Architecture. Skor 90.91/100 — proyek dengan skor tertinggi yang pernah saya rilis, dan yang bisa saya jelaskan baris per baris saat interview.'
    },

    // ── Featured Works ──
    'featured.title': { en: 'Featured Works', id: 'Karya Pilihan' },
    'featured.exploreAll': { en: 'Explore all projects & certifications →', id: 'Lihat semua proyek & sertifikasi →' },

    'work.readCaseStudy': { en: 'Read case study →', id: 'Baca studi kasus →' },
    'work.viewDetails': { en: 'View details →', id: 'Lihat detail →' },
    'work.view': { en: 'View →', id: 'Lihat →' },

    'metric.modules': { en: 'Modules', id: 'Modul' },
    'metric.score': { en: 'Score / 100', id: 'Skor / 100' },
    'metric.prsMerged': { en: 'PRs Merged', id: 'PR Merged' },
    'metric.modulesShipped': { en: 'Modules Shipped', id: 'Modul Dirilis' },
    'metric.dynamicThemes': { en: 'Dynamic Themes', id: 'Tema Dinamis' },
    'metric.keyScreens': { en: 'Key Screens', id: 'Layar Utama' },
    'metric.prototype': { en: 'Prototype', id: 'Prototipe' },

    'work.nobel.title': { en: 'Nobel Akademi — LMS Features', id: 'Nobel Akademi — Fitur LMS' },
    'work.nobel.sub': { en: 'PT Indotech Digital · Production LMS', id: 'PT Indotech Digital · LMS Production' },
    'work.nobel.desc': {
        en: 'Feature work on a live learning platform: Bootcamp module end-to-end (6-table data model, backend, admin CMS, public pages), Webinar registration with confirmation emails, plus e-portfolio and certification pages — shipped through PR review to production.',
        id: 'Mengerjakan fitur di platform pembelajaran yang sudah live: modul Bootcamp end-to-end (data model 6 tabel, backend, admin CMS, halaman publik), pendaftaran Webinar dengan email konfirmasi, plus halaman e-portfolio dan sertifikasi — dirilis lewat review PR ke production.'
    },

    'work.evermos.title': { en: 'Marketplace REST API', id: 'Marketplace REST API' },
    'work.evermos.sub': { en: 'Evermos · Backend', id: 'Evermos · Backend' },
    'work.evermos.desc': {
        en: 'Full marketplace REST API in Golang with Gin, MySQL, and JWT auth — clean architecture and atomic transactions across 7 modules.',
        id: 'REST API marketplace lengkap dengan Golang, Gin, MySQL, dan JWT auth — clean architecture dan atomic transactions di 7 modul.'
    },

    'work.core.title': { en: 'E-Commerce Catalog', id: 'Katalog E-Commerce' },
    'work.core.sub': { en: 'Core Initiative · Frontend', id: 'Core Initiative · Frontend' },
    'work.core.desc': {
        en: 'E-commerce catalog in Vue.js 2 with 3 dynamic UI themes, pixel-perfect Figma implementation, and CI/CD to Firebase.',
        id: 'Katalog e-commerce dengan Vue.js 2, 3 tema UI dinamis, implementasi Figma pixel-perfect, dan CI/CD ke Firebase.'
    },

    'work.groomy.title': { en: 'Groomy', id: 'Groomy' },
    'work.groomy.sub': { en: 'Mobile App · UI/UX Design', id: 'Aplikasi Mobile · Desain UI/UX' },
    'work.groomy.desc': {
        en: 'Pet grooming mobile app concept — full UI/UX design and interactive Figma prototype, from wireframes to polished screens.',
        id: 'Konsep aplikasi mobile pet grooming — desain UI/UX lengkap dan prototipe interaktif Figma, dari wireframe sampai layar jadi.'
    },

    // ── Skills ──
    'skills.title': { en: 'Technical Skills', id: 'Keahlian Teknis' },
    'skills.seeMore': { en: 'See full stack breakdown', id: 'Lihat rincian lengkap stack' },

    // ── Education & Certification ──
    'education.title': { en: 'Education & Certification', id: 'Pendidikan & Sertifikasi' },
    'education.degree': { en: 'Bachelor of Information Systems', id: 'Sarjana Sistem Informasi' },
    'education.school': {
        en: 'Universitas Pamulang · Tangerang Selatan · 120 credits completed',
        id: 'Universitas Pamulang · Tangerang Selatan · 120 SKS selesai'
    },
    'education.lang': {
        en: 'Indonesian (Native · UKBI Madya) · English (Conversational)',
        id: 'Indonesia (Native · UKBI Madya) · Inggris (Percakapan)'
    },
    'education.seeAllCerts': { en: 'See all certifications', id: 'Lihat semua sertifikasi' },
    'education.eduDate': { en: 'Sep 2023 – Present', id: 'Sep 2023 – Sekarang' },
    'education.cert.evermos.title': { en: 'Backend Developer Intern Certificate', id: 'Sertifikat Backend Developer Intern' },
    'education.cert.evermos.sub': { en: 'Evermos × Rakamin Academy · Final score 90.91 / 100', id: 'Evermos × Rakamin Academy · Skor akhir 90.91 / 100' },
    'education.cert.core.title': { en: 'Frontend Developer Intern Certificate', id: 'Sertifikat Frontend Developer Intern' },
    'education.cert.core.sub': { en: 'Core Initiative × Rakamin Academy · Final score 87.79 / 100', id: 'Core Initiative × Rakamin Academy · Skor akhir 87.79 / 100' },
    'education.cert.azure.title': { en: 'Azure AI Fundamentals (AI-900)', id: 'Azure AI Fundamentals (AI-900)' },
    'education.cert.azure.sub': { en: 'Microsoft · elevAIte · Merdeka Academy', id: 'Microsoft · elevAIte · Merdeka Academy' },
    'education.cert.googlepm.title': { en: 'Fundamental Project Management', id: 'Fundamental Project Management' },
    'education.cert.googlepm.sub': { en: 'Google · Digitalent Scholarship KOMDIGI', id: 'Google · Digitalent Scholarship KOMDIGI' },
    'education.cert.bnsp.title': { en: 'Junior Web Developer (BNSP)', id: 'Junior Web Developer (BNSP)' },
    'education.cert.bnsp.sub': { en: 'BPPTIK Kominfo · Digitalent Scholarship', id: 'BPPTIK Kominfo · Digitalent Scholarship' },

    // ── Stats ──
    'stats.gpa': { en: 'GPA / 4.00', id: 'IPK / 4.00' },
    'stats.evermos': { en: 'Evermos Score', id: 'Skor Evermos' },
    'stats.core': { en: 'Core Initiative Score', id: 'Skor Core Initiative' },
    'stats.yandex': { en: 'Yandex ML Competition', id: 'Kompetisi ML Yandex' },
    'stats.ml': { en: 'ML Training', id: 'Pelatihan ML' },

    // ── Contact ──
    'contact.title': { en: 'Hit Me Up', id: 'Hubungi Saya' },
    'contact.downloadHint': { en: 'PDF · Updated 2026', id: 'PDF · Diperbarui 2026' },
    'contact.letsTalk': { en: "Let's talk.", id: 'Yuk, ngobrol.' },
    'contact.namePh': { en: 'Your name', id: 'Nama kamu' },
    'contact.emailPh': { en: 'Your email', id: 'Email kamu' },
    'contact.messagePh': { en: "What's on your mind?", id: 'Ada yang mau disampaikan?' },
    'contact.send': { en: 'Send Message', id: 'Kirim Pesan' },
    'contact.igDesc': { en: 'Developer · Photographer · Creating things', id: 'Developer · Fotografer · Suka bikin sesuatu' },
    'contact.igFollow': { en: 'Follow', id: 'Ikuti' },
    'contact.liDesc': { en: 'Software Engineer · Open to Work', id: 'Software Engineer · Terbuka untuk Kerja' },
    'contact.liConnect': { en: 'Connect', id: 'Hubungkan' },

    // ── Feedback ──
    'feedback.title': { en: 'Leave a Feedback', id: 'Tinggalkan Kesan' },
    'feedback.desc': { en: 'Got something to say? Drop a message — shows up instantly.', id: 'Ada yang mau disampaikan? Tulis pesan — langsung muncul.' },
    'feedback.namePh': { en: 'Your name', id: 'Nama kamu' },
    'feedback.fromPh': { en: 'From where do you know this guy?', id: 'Kenal dari mana sama orang ini?' },
    'feedback.messagePh': { en: 'Your message...', id: 'Pesan kamu...' },
    'feedback.send': { en: 'Send Message', id: 'Kirim Pesan' },
    'feedback.empty': { en: 'No feedback yet. Be the first!', id: 'Belum ada kesan. Jadilah yang pertama!' },

    // ── Footer ──
    'footer.visited': { en: 'people', id: 'orang' },
    'footer.visitedPrefix': { en: 'Visited by', id: 'Sudah dikunjungi' },

    // ── Tech Tools page ──
    'tt.back': { en: 'Back to Home', id: 'Kembali ke Beranda' },
    'tt.eyebrow': { en: 'Tech Stack', id: 'Tumpukan Teknologi' },
    'tt.title': { en: 'Full Tech Stack', id: 'Tumpukan Teknologi Lengkap' },
    'tt.summary': {
        en: 'Comprehensive list of the languages, frameworks, and tools I use day to day.',
        id: 'Daftar lengkap bahasa, framework, dan tools yang saya pakai sehari-hari.'
    },
    'tt.languages': { en: 'Languages', id: 'Bahasa Pemrograman' },
    'tt.frameworks': { en: 'Frameworks', id: 'Framework' },
    'tt.databases': { en: 'Databases', id: 'Database' },
    'tt.tools': { en: 'Tools & DevOps', id: 'Tools & DevOps' },
    'tt.ai': { en: 'AI & Cloud', id: 'AI & Cloud' },

    // ── Proof filter bar (projects/certifications/awards pages) ──
    'proof.title': { en: 'Proof of Work', id: 'Bukti Karya' },
    'proof.tabProjects': { en: 'Projects', id: 'Proyek' },
    'proof.tabCerts': { en: 'Certifications', id: 'Sertifikasi' },
    'proof.tabAwards': { en: 'Awards', id: 'Penghargaan' },

    // ── Certification cards ──
    'cert.bnsp.title': { en: 'Junior Web Developer', id: 'Junior Web Developer' },
    'cert.bnsp.desc': {
        en: "National professional certification in web development, issued by BNSP (Indonesia's national competency certification body).",
        id: 'Sertifikasi kompetensi nasional bidang pengembangan web, dikeluarkan oleh BNSP (Badan Nasional Sertifikasi Profesi).'
    },
    'cert.bnsp.tag': { en: 'National Certification', id: 'Sertifikasi Nasional' },

    'cert.evermos.title': { en: 'Backend Developer Intern', id: 'Magang Backend Developer' },
    'cert.evermos.desc': {
        en: 'Built a production-grade marketplace REST API in Golang — 7 modules, clean architecture, JWT auth, multi-image upload, atomic transactions. Final score: <strong>90.91 / 100 (Excellent)</strong>.',
        id: 'Membangun REST API marketplace kelas production dengan Golang — 7 modul, clean architecture, JWT auth, multi-image upload, atomic transactions. Skor akhir: <strong>90.91 / 100 (Excellent)</strong>.'
    },
    'cert.evermos.tag': { en: 'Internship Certificate', id: 'Sertifikat Magang' },

    'cert.core.title': { en: 'Frontend Developer Intern', id: 'Magang Frontend Developer' },
    'cert.core.desc': {
        en: 'Delivered a pixel-perfect e-commerce catalog in Vue.js 2 — live REST API integration, 3 dynamic UI themes, Figma-to-code, deployed via GitLab CI/CD. Final score: <strong>87.79 / 100 (Excellent)</strong>.',
        id: 'Merilis katalog e-commerce pixel-perfect dengan Vue.js 2 — integrasi REST API live, 3 tema UI dinamis, Figma-to-code, deploy lewat GitLab CI/CD. Skor akhir: <strong>87.79 / 100 (Excellent)</strong>.'
    },
    'cert.core.tag': { en: 'Internship Certificate', id: 'Sertifikat Magang' },

    'cert.huawei.title': { en: 'HCIA Cloud Service', id: 'HCIA Cloud Service' },
    'cert.huawei.desc': {
        en: '40-hour cloud computing program — Huawei Cloud architecture, core services, and deployment fundamentals.',
        id: 'Program cloud computing 40 jam — arsitektur Huawei Cloud, layanan inti, dan dasar-dasar deployment.'
    },
    'cert.huawei.tag': { en: 'Cloud Computing', id: 'Cloud Computing' },

    'cert.googlepm.title': { en: 'Fundamental Project Management', id: 'Fundamental Project Management' },
    'cert.googlepm.desc': {
        en: '10-hour Google-issued program covering project planning, execution, stakeholder communication, and team management.',
        id: 'Program 10 jam dari Google yang mencakup perencanaan proyek, eksekusi, komunikasi stakeholder, dan manajemen tim.'
    },
    'cert.googlepm.tag': { en: 'Project Management', id: 'Manajemen Proyek' },

    'cert.lka.title': { en: 'Data Management Intern', id: 'Magang Manajemen Data' },
    'cert.lka.desc': {
        en: 'Managed 500+ student records and 1,000+ digital archive files for Tracer Study & Alumni division. Final grade: <strong>Sangat Baik (Excellent)</strong>.',
        id: 'Mengelola 500+ arsip data mahasiswa dan 1.000+ file arsip digital untuk divisi Tracer Study & Alumni. Nilai akhir: <strong>Sangat Baik (Excellent)</strong>.'
    },
    'cert.lka.tag': { en: 'Internship Certificate', id: 'Sertifikat Magang' },

    'cert.azure.desc': {
        en: "Completed Microsoft's Azure AI training — machine learning concepts, cognitive services, and responsible AI principles.",
        id: 'Menyelesaikan pelatihan Azure AI dari Microsoft — konsep machine learning, cognitive services, dan prinsip responsible AI.'
    },
    'cert.azure.tag': { en: 'Training Certificate', id: 'Sertifikat Pelatihan' },

    'cert.yandex.title': { en: 'Linear Models in Machine Learning', id: 'Linear Models in Machine Learning' },
    'cert.yandex.desc': {
        en: '91-hour intensive program: linear regression, classification, and model evaluation. Closed with an in-class hackathon — <strong>ranked #5 out of 926 participants</strong>.',
        id: 'Program intensif 91 jam: linear regression, klasifikasi, dan evaluasi model. Ditutup dengan hackathon internal — <strong>peringkat #5 dari 926 peserta</strong>.'
    },
    'cert.yandex.tag': { en: 'Machine Learning', id: 'Machine Learning' },
    'cert.yandex.attempt': { en: '#5 / 926 · Yandex Hackathon', id: '#5 / 926 · Hackathon Yandex' },

    'cert.jurnal.title': { en: 'Academic Journal Publication', id: 'Publikasi Jurnal Ilmiah' },
    'cert.jurnal.desc': {
        en: 'Published research: web-based decision support system for BLT recipient selection using the SAW (Simple Additive Weighting) method.',
        id: 'Penelitian yang dipublikasikan: sistem pendukung keputusan berbasis web untuk seleksi penerima BLT menggunakan metode SAW (Simple Additive Weighting).'
    },
    'cert.jurnal.tag': { en: 'Academic Publication', id: 'Publikasi Akademik' },

    'cert.ukbi.title': { en: 'UKBI — Madya Level', id: 'UKBI — Tingkat Madya' },
    'cert.ukbi.desc': {
        en: 'Official Indonesian language proficiency certification. Score: 549, Madya (Intermediate-Advanced) level. Valid until Sep 2027.',
        id: 'Sertifikasi resmi kemahiran berbahasa Indonesia. Skor: 549, tingkat Madya. Berlaku sampai Sep 2027.'
    },
    'cert.ukbi.tag': { en: 'Language Certification', id: 'Sertifikasi Bahasa' },
};

function getLang() {
    return localStorage.getItem('lang') || 'en';
}

function applyLang(lang) {
    document.documentElement.lang = lang === 'id' ? 'id' : 'en';
    // data-i18n-html: for elements with nested markup (e.g. inline chips inside a
    // bio paragraph) — replaces innerHTML, so the key's stored value may contain HTML.
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const entry = I18N[el.dataset.i18nHtml];
        if (!entry) return;
        const html = entry[lang] || entry.en;
        if (html != null) el.innerHTML = html;
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const entry = I18N[el.dataset.i18n];
        if (!entry) return;
        const text = entry[lang] || entry.en;
        if (text != null) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        el.dataset.i18nAttr.split(';').forEach(pair => {
            const [attr, key] = pair.split(':').map(s => s.trim());
            const entry = I18N[key];
            if (!attr || !entry) return;
            const text = entry[lang] || entry.en;
            if (text != null) el.setAttribute(attr, text);
        });
    });
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = lang === 'id' ? 'EN' : 'ID';
        btn.title = lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia';
    });
}

function setLang(lang) {
    localStorage.setItem('lang', lang);
    applyLang(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    applyLang(getLang());
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.addEventListener('click', () => setLang(getLang() === 'id' ? 'en' : 'id'));
    });
});
