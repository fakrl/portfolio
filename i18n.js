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
        en: 'Full Stack Developer currently shipping features to a live LMS in <span class="bio-chip"><i class="devicon-laravel-plain colored"></i>Laravel</span> at PT Indotech Digital, with 20+ pull requests merged to production, while also replacing a casting agency\'s manual WhatsApp-and-spreadsheet workflow with a centralized Laravel system as my final year project. Previously: a marketplace REST API in <span class="bio-chip"><i class="devicon-go-plain colored"></i>Golang</span> (scored 90.91) and a <span class="bio-chip"><i class="devicon-vuejs-plain colored"></i>Vue.js</span> e-commerce frontend (87.79). Ranked #5 of 926 in Yandex ML. GPA 3.70. <strong>Available now for full-time opportunities.</strong>',
        id: 'Full Stack Developer yang saat ini ngerjain fitur-fitur di LMS yang sudah live dengan <span class="bio-chip"><i class="devicon-laravel-plain colored"></i>Laravel</span> di PT Indotech Digital, dengan 20+ pull request udah merge ke production, sambil ngeganti alur kerja manual WhatsApp-dan-spreadsheet punya agensi casting jadi sistem Laravel terpusat buat tugas akhir. Sebelumnya: REST API marketplace dengan <span class="bio-chip"><i class="devicon-go-plain colored"></i>Golang</span> (skor 90.91) dan frontend e-commerce <span class="bio-chip"><i class="devicon-vuejs-plain colored"></i>Vue.js</span> (87.79). Peringkat #5 dari 926 di kompetisi Yandex ML. IPK 3.70. <strong>Tersedia sekarang untuk peluang full-time.</strong>'
    },

    // ── Experience ──
    'exp.title': { en: 'Experience', id: 'Pengalaman' },
    'exp.techLabel': { en: 'Technologies Used', id: 'Teknologi yang Digunakan' },
    'exp.focusLabel': { en: 'Focus', id: 'Fokus' },

    'exp.apik.role': { en: 'Data Analyst (OJT)', id: 'Data Analyst (OJT)' },
    'exp.apik.meta': { en: 'Aug 2026 – Present', id: 'Agu 2026 – Sekarang' },
    'exp.apik.bullet1': {
        en: 'Scholarship-funded on-the-job training program, rotating every ~3 months across Bakti Pemuda Foundation\'s affiliated partner organizations; currently placed with <strong>Gatra Data</strong>, a data-analytics partner.',
        id: 'Program OJT beasiswa, rotasi tiap ~3 bulan ke organisasi mitra yang terafiliasi Bakti Pemuda Foundation; saat ini ditempatkan di <strong>Gatra Data</strong>, mitra data analytics.'
    },
    'exp.apik.bullet2': {
        en: 'Built an automated donor segmentation engine and self-service dashboard in Google Apps Script for a 16,000+ row dataset, fully automated with zero manual reruns.',
        id: 'Membangun mesin segmentasi donatur otomatis dan dashboard self-service dengan Google Apps Script untuk dataset 16.000+ baris, sepenuhnya otomatis tanpa rerun manual.'
    },
    'exp.apik.bullet3': {
        en: 'Designed a self-service Dashboard sheet, with a global favorite-program ranking plus a cumulative month-over-month segment growth table, so non-technical teammates and the mentor could read trends without touching the underlying data.',
        id: 'Mendesain sheet Dashboard self-service, dengan ranking program favorit secara global plus tabel pertumbuhan segmen kumulatif per bulan, biar tim & mentor yang nggak teknis bisa baca tren tanpa nyentuh data mentahnya.'
    },
    'exp.apik.bullet4': {
        en: 'Automated the whole pipeline with a daily time-driven trigger, replacing manual reruns, including debugging a getUi() execution-context error along the way.',
        id: 'Mengotomasi seluruh pipeline-nya dengan daily time-driven trigger, gantiin rerun manual, termasuk debug error konteks eksekusi getUi() di tengah jalan.'
    },
    'exp.apik.hub.summary': {
        en: 'APIKpreneur (Bakti Pemuda Foundation) is a scholarship-funded on-the-job training program. It rotates recipients across affiliated partner organizations roughly every 3 months rather than placing them permanently at one company. The card below is my current placement.',
        id: 'APIKpreneur (Bakti Pemuda Foundation) adalah program OJT berbasis beasiswa. Penerimanya dirotasi ke organisasi mitra terafiliasi kira-kira tiap 3 bulan, bukan ditempatkan permanen di satu perusahaan. Card di bawah ini penempatan saya saat ini.'
    },

    // Experience hub pages (/experience/<slug>/) — shared strings
    'exp.hub.back': { en: 'Back to Experience', id: 'Kembali ke Pengalaman' },
    'exp.hub.eyebrow': { en: 'Experience', id: 'Pengalaman' },
    'exp.hub.employmentType': { en: 'Employment Type', id: 'Jenis Kerja' },
    'exp.hub.internship': { en: 'Internship', id: 'Magang' },
    'exp.hub.scholarshipOjt': { en: 'Scholarship OJT', id: 'OJT Beasiswa' },
    'exp.hub.currentPlacement': { en: 'Current Placement', id: 'Penempatan Saat Ini' },
    'exp.hub.productsLabel': { en: 'Products', id: 'Produk' },
    'exp.hub.productionLms': { en: 'Production LMS', id: 'LMS Production' },
    'exp.hub.preLaunch': { en: 'Pre-launch product', id: 'Produk Pre-launch' },
    'exp.hub.projectsTitle': { en: 'Projects I Worked On', id: 'Project yang Saya Kerjakan' },

    'exp.indotech.hub.summary': {
        en: "PT Indotech Digital Group is a software agency running two Laravel product lines I've shipped features to: Nobel Akademi's LMS and NobiPlay's live-streaming platform. Both cards below link to their own proof-of-work case study.",
        id: 'PT Indotech Digital Group adalah software agency yang menjalankan dua lini produk Laravel yang saya kerjakan fiturnya: LMS Nobel Akademi dan platform live-streaming NobiPlay. Kedua card di bawah ini nyambung ke case study proof-of-work masing-masing.'
    },

    'exp.indotech.role': { en: 'Full Stack Engineer', id: 'Full Stack Engineer' },
    'exp.indotech.meta': { en: 'Jun 2026 – Present · Jakarta (Hybrid)', id: 'Jun 2026 – Sekarang · Jakarta (Hybrid)' },
    'exp.indotech.bullet1': {
        en: 'Shipping features to a live LMS in Laravel 11, with <strong>20+ pull requests merged to production</strong> through a dev → staging → main review flow.',
        id: 'Merilis fitur ke LMS yang sudah live dengan Laravel 11, dengan <strong>20+ pull request sudah merge ke production</strong> lewat alur review dev → staging → main.'
    },
    'exp.indotech.bullet2': {
        en: "Two product lines shipped: Nobel Akademi's Bootcamp module end-to-end, and a feature slice of NobiPlay's live-streaming platform.",
        id: 'Dua lini produk yang dikerjakan: modul Bootcamp Nobel Akademi end-to-end, dan sebagian fitur platform live-streaming NobiPlay.'
    },
    'exp.indotech.bullet3': {
        en: 'Delivered the Webinar module (registration flow, Mailable confirmation emails) plus e-portfolio, certification, and corporate pages.',
        id: 'Merilis modul Webinar (alur pendaftaran, email konfirmasi via Mailable) plus halaman e-portfolio, sertifikasi, dan korporat.'
    },
    'exp.indotech.bullet4': {
        en: "Debugged a production outage down to root cause: a corrupted vendor asset was silently halting JavaScript execution. Fixed it and hardened the page so one failing library can't break unrelated features.",
        id: 'Melacak root cause sebuah production outage: vendor asset yang corrupt diam-diam menghentikan eksekusi JavaScript. Diperbaiki dan halamannya diperkuat supaya satu library yang gagal nggak bisa merusak fitur lain.'
    },

    'exp.evermos.role': { en: 'Backend Developer Intern', id: 'Magang Backend Developer' },
    'exp.evermos.meta': { en: 'Dec 2025 · Remote', id: 'Des 2025 · Remote' },
    'exp.evermos.desc': {
        en: 'Full marketplace REST API in Golang, using Gin, MySQL, and JWT. 7 modules, clean architecture, atomic transactions. Score: Excellent.',
        id: 'REST API marketplace lengkap dengan Golang, pakai Gin, MySQL, dan JWT. 7 modul, clean architecture, atomic transactions. Skor: Excellent.'
    },

    'exp.core.role': { en: 'Frontend Developer Intern', id: 'Magang Frontend Developer' },
    'exp.core.meta': { en: 'Oct – Nov 2025 · Remote', id: 'Okt – Nov 2025 · Remote' },
    'exp.core.desc': {
        en: 'E-commerce catalog in Vue.js 2 with 3 dynamic UI themes, pixel-perfect Figma, and CI/CD to Firebase. Score: Excellent.',
        id: 'Katalog e-commerce dengan Vue.js 2, 3 tema UI dinamis, Figma pixel-perfect, dan CI/CD ke Firebase. Skor: Excellent.'
    },

    'exp.yandex.role': { en: 'Machine Learning Program', id: 'Program Machine Learning' },
    'exp.yandex.meta': { en: 'May – Jul 2025 · Online', id: 'Mei – Jul 2025 · Online' },
    'exp.yandex.desc': {
        en: 'Ranked #5 out of 926 participants. Built ML models across 91 hrs of intensive Python curriculum.',
        id: 'Peringkat #5 dari 926 peserta. Membangun model ML sepanjang 91 jam kurikulum Python intensif.'
    },

    'exp.lka.role': { en: 'Data Management Intern', id: 'Magang Manajemen Data' },
    'exp.lka.desc': {
        en: 'Digitized 500+ records and built JS automation to archive 1,000+ files, eliminating manual processing.',
        id: 'Mendigitalkan 500+ arsip dan membangun otomatisasi JS untuk mengarsipkan 1.000+ file, menghilangkan proses manual.'
    },

    'exp.kesbang.role': { en: 'Computer Operator', id: 'Operator Komputer' },
    'exp.kesbang.meta': { en: 'Nov – Dec 2025 · Jakarta Pusat', id: 'Nov – Des 2025 · Jakarta Pusat' },

    'exp.cms.desc': {
        en: 'Wrote content scripts, led main footage capture (photo & video), contributed to digital marketing strategy.',
        id: 'Menulis naskah konten, memimpin pengambilan footage utama (foto & video), berkontribusi pada strategi digital marketing.'
    },

    'exp.fsj.role': { en: 'President', id: 'Ketua' },
    'exp.fsj.meta': { en: 'Oct 2021 – Nov 2022', id: 'Okt 2021 – Nov 2022' },
    'exp.fsj.desc': {
        en: 'Led a 300+ member student journalism org: set editorial direction, organized 15+ events, and managed the internal team structure end to end.',
        id: 'Memimpin organisasi jurnalistik mahasiswa 300+ anggota: nentuin arah editorial, ngatur 15+ acara, dan pegang struktur tim internal end-to-end.'
    },
    'exp.kesbang.desc': {
        en: 'Handled day-to-day data entry and document digitization for a government office, encoding records into internal systems and keeping physical/digital archives in sync.',
        id: 'Nanganin input data harian dan digitalisasi dokumen di kantor pemerintahan, encode data ke sistem internal dan jaga arsip fisik/digital tetap sinkron.'
    },

    // ── GitHub Activity ──
    'ghActivity.title': { en: 'GitHub Activity', id: 'Aktivitas GitHub' },
    'ghActivity.loading': { en: 'Loading activity…', id: 'Memuat aktivitas…' },
    'ghActivity.captionSuffix': { en: 'contributions since Apr {year}', id: 'kontribusi sejak Apr {year}' },
    'ghActivity.error': { en: "Couldn't load activity. View on GitHub →", id: 'Gagal memuat aktivitas. Lihat di GitHub →' },

    // ── Featured Build ──
    'spotlight.eyebrow': { en: 'Featured Build', id: 'Karya Unggulan' },
    'spotlight.jbtb.title': { en: 'SIM Casting — PT. JBTB Casting Creative Group', id: 'SIM Casting — PT. JBTB Casting Creative Group' },
    'spotlight.jbtb.sub': { en: 'Project Lead & Lead Developer · Final Year Project (team of 3)', id: 'Project Lead & Lead Developer · Tugas Akhir (tim 3 orang)' },
    'spotlight.jbtb.desc': {
        en: "PT. JBTB Casting Creative Group ran recruitment and payment for its extras through WhatsApp groups, spreadsheets, and Google Drive, so fee deals, staff honor, and project money were easy to dispute or lose track of. I built the Laravel 13 system that replaced it as our final year project: fee negotiation is logged round by round, staff get real payslips, and each project's honor, invoices, and costs are recorded in one place.",
        id: 'PT. JBTB Casting Creative Group ngurus rekrutmen dan pembayaran extras lewat grup WhatsApp, spreadsheet, dan Google Drive, jadi kesepakatan fee, honor staf, dan uang proyek gampang dibantah atau nggak ketelusuran. Saya bangun sistem Laravel 13 yang gantiin itu sebagai tugas akhir kami: nego fee tercatat tiap ronde, staf dapet slip honor beneran, dan honor, invoice, serta biaya tiap proyek tercatat di satu tempat.'
    },
    'extra.nobel.title': { en: 'Nobel Akademi', id: 'Nobel Akademi' },
    'extra.nobel.sub': { en: 'Production LMS · PT Indotech Digital', id: 'LMS Production · PT Indotech Digital' },
    'extra.visitSite': { en: 'Visit Site', id: 'Kunjungi Situs' },

    // ── Featured Works ──
    'featured.title': { en: 'Featured Works', id: 'Karya Pilihan' },
    'featured.exploreAll': { en: 'Explore all projects & certifications →', id: 'Lihat semua proyek & sertifikasi →' },

    'work.readCaseStudy': { en: 'Read case study →', id: 'Baca studi kasus →' },
    'work.viewDetails': { en: 'View details →', id: 'Lihat detail →' },
    'work.view': { en: 'View →', id: 'Lihat →' },
    'work.viewOnGithub': { en: 'View on GitHub →', id: 'Lihat di GitHub →' },

    'metric.modules': { en: 'Modules', id: 'Modul' },
    'metric.score': { en: 'Score / 100', id: 'Skor / 100' },
    'metric.prsMerged': { en: 'PRs Merged', id: 'PR Merged' },
    'metric.modulesShipped': { en: 'Modules Shipped', id: 'Modul Dirilis' },
    'metric.dynamicThemes': { en: 'Dynamic Themes', id: 'Tema Dinamis' },
    'metric.keyScreens': { en: 'Key Screens', id: 'Layar Utama' },
    'metric.prototype': { en: 'Prototype', id: 'Prototipe' },
    'metric.problems': { en: 'Core Problems Solved', id: 'Masalah Inti Diselesaikan' },
    'metric.teamSize': { en: 'Team Size', id: 'Jumlah Tim' },

    'work.nobel.desc': {
        en: 'End-to-end Bootcamp module on a live LMS: data model, backend, admin CMS, and public pages, implemented from provided designs.',
        id: 'Modul Bootcamp end-to-end di LMS yang sudah live: data model, backend, admin CMS, dan halaman publik, diimplementasikan dari desain yang udah disediakan.'
    },
    'work.nobiplay.title': { en: 'NobiPlay — Live Streaming Module', id: 'NobiPlay — Modul Live Streaming' },
    'work.nobiplay.sub': { en: 'PT Indotech Digital Group · Live Streaming Feature', id: 'PT Indotech Digital Group · Fitur Live Streaming' },
    'work.nobiplay.desc': {
        en: "The live-streaming module I built for NobiPlay's platform, shown with my mentor's permission. The preview is NobiPlay's public site; my part is the live-streaming module behind it.",
        id: "Modul live-streaming yang saya bangun untuk platform NobiPlay, ditampilkan dengan izin mentor. Preview-nya situs publik NobiPlay; bagian saya adalah modul live-streaming di baliknya."
    },
    'work.nobiplay.comingSoon': { en: 'Coming soon, pending public URL', id: 'Segera hadir, nunggu URL publik' },
    'work.evermos.title': { en: 'Marketplace REST API', id: 'Marketplace REST API' },
    'work.evermos.sub': { en: 'Evermos · Backend', id: 'Evermos · Backend' },
    'work.evermos.desc': {
        en: 'Full marketplace REST API in Golang with Gin, MySQL, and JWT auth: clean architecture and atomic transactions across 7 modules.',
        id: 'REST API marketplace lengkap dengan Golang, Gin, MySQL, dan JWT auth: clean architecture dan atomic transactions di 7 modul.'
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
        en: 'Pet grooming mobile app concept: full UI/UX design and interactive Figma prototype, from wireframes to polished screens.',
        id: 'Konsep aplikasi mobile pet grooming: desain UI/UX lengkap dan prototipe interaktif Figma, dari wireframe sampai layar jadi.'
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
    'feedback.desc': { en: 'Got something to say? Drop a message, it shows up instantly.', id: 'Ada yang mau disampaikan? Tulis pesan, langsung muncul.' },
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
        en: 'Built a production-grade marketplace REST API in Golang: 7 modules, clean architecture, JWT auth, multi-image upload, atomic transactions. Final score: <strong>90.91 / 100 (Excellent)</strong>.',
        id: 'Membangun REST API marketplace kelas production dengan Golang: 7 modul, clean architecture, JWT auth, multi-image upload, atomic transactions. Skor akhir: <strong>90.91 / 100 (Excellent)</strong>.'
    },
    'cert.evermos.tag': { en: 'Internship Certificate', id: 'Sertifikat Magang' },

    'cert.core.title': { en: 'Frontend Developer Intern', id: 'Magang Frontend Developer' },
    'cert.core.desc': {
        en: 'Delivered a pixel-perfect e-commerce catalog in Vue.js 2: live REST API integration, 3 dynamic UI themes, Figma-to-code, deployed via GitLab CI/CD. Final score: <strong>87.79 / 100 (Excellent)</strong>.',
        id: 'Merilis katalog e-commerce pixel-perfect dengan Vue.js 2: integrasi REST API live, 3 tema UI dinamis, Figma-to-code, deploy lewat GitLab CI/CD. Skor akhir: <strong>87.79 / 100 (Excellent)</strong>.'
    },
    'cert.core.tag': { en: 'Internship Certificate', id: 'Sertifikat Magang' },

    'cert.huawei.title': { en: 'HCIA Cloud Service', id: 'HCIA Cloud Service' },
    'cert.huawei.desc': {
        en: '40-hour cloud computing program covering Huawei Cloud architecture, core services, and deployment fundamentals.',
        id: 'Program cloud computing 40 jam yang mencakup arsitektur Huawei Cloud, layanan inti, dan dasar-dasar deployment.'
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
        en: "Completed Microsoft's Azure AI training, covering machine learning concepts, cognitive services, and responsible AI principles.",
        id: 'Menyelesaikan pelatihan Azure AI dari Microsoft, mencakup konsep machine learning, cognitive services, dan prinsip responsible AI.'
    },
    'cert.azure.tag': { en: 'Training Certificate', id: 'Sertifikat Pelatihan' },

    'cert.yandex.title': { en: 'Linear Models in Machine Learning', id: 'Linear Models in Machine Learning' },
    'cert.yandex.desc': {
        en: '91-hour intensive program: linear regression, classification, and model evaluation. Closed with an in-class hackathon, <strong>ranked #5 out of 926 participants</strong>.',
        id: 'Program intensif 91 jam: linear regression, klasifikasi, dan evaluasi model. Ditutup dengan hackathon internal, <strong>peringkat #5 dari 926 peserta</strong>.'
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

    'cert.ensa.title': { en: 'Enterprise Networking, Security & Automation (ENSA)', id: 'Enterprise Networking, Security & Automation (ENSA)' },
    'cert.ensa.desc': {
        en: 'Cisco Networking Academy course on enterprise routing and switching, network security hardening, and network automation. The final assessment was done in Cisco Packet Tracer Physical Mode: rack-mounting, cabling, OSPFv2, NAT/PAT, ACLs, SSH, TFTP backup, and an IOS upgrade. Score: 96%.',
        id: 'Kursus Cisco Networking Academy tentang routing dan switching enterprise, pengamanan jaringan, dan otomasi jaringan. Ujian akhirnya dikerjakan di Cisco Packet Tracer Physical Mode: rack-mounting, pemasangan kabel, OSPFv2, NAT/PAT, ACL, SSH, backup TFTP, dan upgrade IOS. Skor: 96%.'
    },
    'cert.ensa.tag': { en: 'Networking', id: 'Jaringan' },

    // ── Project cards ──
    'proj.nobilive.date': { en: 'Jul 2026 – Present', id: 'Jul 2026 – Sekarang' },
    'proj.nobilive.title': { en: 'NobiPlay — Live Streaming Module', id: 'NobiPlay — Modul Live Streaming' },
    'proj.nobilive.desc': {
        en: "Feature work on the live-streaming module of NobiPlay, Indonesia's streaming platform: role-based studio CMS, stream scheduling, and automated stream-channel setup. The preview shows NobiPlay's public site; my work is limited to the live-streaming module behind it, which is not visible on the homepage. Shown with my mentor's permission.",
        id: "Kerjaan feature di modul live-streaming NobiPlay, platform streaming Indonesia: studio CMS berbasis role, penjadwalan siaran, dan setup channel siaran otomatis. Preview menampilkan situs publik NobiPlay; kerjaan saya terbatas di modul live-streaming di baliknya, yang tidak terlihat di beranda. Ditampilkan dengan izin mentor."
    },
    'proj.nobilive.credential': {
        en: "Live product · my scope: live-streaming module only · shown with mentor permission",
        id: "Produk live · scope saya: modul live-streaming saja · ditampilkan dengan izin mentor"
    },

    'proj.notes.date': { en: "Oct 2026", id: "Okt 2026" },
    'proj.notes.title': { en: "Notes: Personal Blog", id: "Notes: Blog Pribadi" },
    'proj.notes.issuer': { en: "Personal project · notes.fakrul.dev", id: "Proyek pribadi · notes.fakrul.dev" },
    'proj.notes.desc': {
        en: "My own blog, built on a static site generator I wrote: Markdown posts with front matter, per-post SEO, light and dark themes, a visitor counter, and GitHub-based comments, deployed to GitHub Pages on a custom subdomain.",
        id: "Blog saya sendiri, dibangun di atas generator situs statis yang saya tulis: post Markdown dengan front matter, SEO per post, tema terang dan gelap, penghitung pengunjung, dan komentar berbasis GitHub, di-deploy ke GitHub Pages di subdomain custom."
    },

    'proj.nobel.date': { en: 'Jun 2026 – Present', id: 'Jun 2026 – Sekarang' },
    'proj.nobel.title': { en: 'Nobel Akademi', id: 'Nobel Akademi' },
    'proj.nobel.screenshotSoon': { en: 'Screenshot coming soon', id: 'Screenshot menyusul' },
    'proj.nobel.desc': {
        en: 'End-to-end bootcamp LMS module in Laravel 11, covering the data model (6 related tables), backend, admin CMS, and public pages. Eager-loaded Eloquent relations (no N+1), slug routing, YouTube embeds, and a ratings system.',
        id: 'Modul LMS bootcamp end-to-end dengan Laravel 11, mencakup data model (6 tabel terkait), backend, admin CMS, dan halaman publik. Eager-loaded Eloquent relations (bebas N+1), slug routing, embed YouTube, dan sistem rating.'
    },
    'proj.nobel.credential': { en: 'Internal production project · code & data under NDA', id: 'Proyek production internal · kode & data di bawah NDA' },

    'proj.evermos.badge': { en: 'Internship', id: 'Magang' },
    'proj.evermos.title': { en: 'Marketplace REST API', id: 'Marketplace REST API' },
    'proj.evermos.issuer': { en: 'Evermos × Rakamin — Backend Internship', id: 'Evermos × Rakamin — Magang Backend' },
    'proj.evermos.desc': {
        en: 'Full marketplace API: Golang, Gin, MySQL, JWT. 7 modul, clean architecture, pagination, multi-image upload, atomic transactions.',
        id: 'API marketplace lengkap: Golang, Gin, MySQL, JWT. 7 modul, clean architecture, pagination, multi-image upload, atomic transactions.'
    },

    'proj.core.date': { en: 'Oct – Nov 2025', id: 'Okt – Nov 2025' },
    'proj.core.title': { en: 'E-Commerce Catalog', id: 'Katalog E-Commerce' },
    'proj.core.issuer': { en: 'Core Initiative × Rakamin — Frontend Internship', id: 'Core Initiative × Rakamin — Magang Frontend' },
    'proj.core.desc': {
        en: 'Katalog e-commerce Vue.js 2, live REST API, 3 dynamic UI themes, pixel-perfect Figma, deployed via GitLab CI/CD.',
        id: 'Katalog e-commerce Vue.js 2, REST API live, 3 tema UI dinamis, Figma pixel-perfect, deploy lewat GitLab CI/CD.'
    },

    'proj.cms.badge': { en: 'Marketing', id: 'Marketing' },
    'proj.cms.title': { en: 'Brand Social Media Presence', id: 'Kehadiran Brand di Media Sosial' },
    'proj.cms.desc': {
        en: "Part of a 3-person team building and maintaining the company's social media presence from scratch: consistent posting cadence, brand voice, and AI-assisted copywriting via prompt engineering.",
        id: 'Bagian dari tim 3 orang yang membangun dan mengelola kehadiran media sosial perusahaan dari nol: jadwal posting konsisten, brand voice, dan copywriting berbantuan AI lewat prompt engineering.'
    },

    'proj.ypkb.badge': { en: 'Volunteer', id: 'Relawan' },
    'proj.ypkb.title': { en: 'WordPress Web Developer', id: 'WordPress Web Developer' },
    'proj.ypkb.desc': {
        en: "Volunteer developer building and maintaining the foundation's website on WordPress. Also appeared as on-camera talent in several Instagram content pieces for @ypkb_indonesia.",
        id: 'Developer relawan yang membangun dan mengelola website yayasan dengan WordPress. Juga tampil di depan kamera untuk beberapa konten Instagram @ypkb_indonesia.'
    },

    'proj.groomy.badge': { en: 'UI/UX', id: 'UI/UX' },
    'proj.groomy.title': { en: 'Groomy — Mobile App UI/UX', id: 'Groomy — UI/UX Aplikasi Mobile' },
    'proj.groomy.issuer': { en: 'UAS Project · Information Systems · UNPAM', id: 'Proyek UAS · Sistem Informasi · UNPAM' },
    'proj.groomy.desc': {
        en: 'End-to-end mobile UI/UX design for an on-demand grooming and beauty service booking app. Covers user flows, component library, and interactive prototype.',
        id: 'Desain UI/UX mobile end-to-end untuk aplikasi booking layanan grooming dan kecantikan on-demand. Mencakup user flow, component library, dan prototipe interaktif.'
    },

    // ── Award cards ──
    'award.foto.badge': { en: '1st Place', id: 'Juara 1' },
    'award.foto.title': { en: '1st Place — Photography Competition', id: 'Juara 1 — Kompetisi Fotografi' },
    'award.foto.desc': {
        en: 'Won first place in a creative photography competition at pesantren level, part of the Digital Creation 2 event.',
        id: 'Meraih juara 1 dalam kompetisi fotografi kreatif tingkat pesantren, bagian dari acara Digital Creation 2.'
    },
    'award.foto.tag': { en: 'Photography Competition', id: 'Kompetisi Fotografi' },

    'award.ketum.badge': { en: 'Chairman', id: 'Ketua' },
    'award.ketum.title': { en: 'Chairman — Journalism Study Forum', id: 'Ketua — Forum Studi Jurnalis' },
    'award.ketum.desc': {
        en: 'Led 300+ members as Chairman of the Journalism Study Forum. Coordinated 15+ events and technical seminars over a one-year tenure.',
        id: 'Memimpin 300+ anggota sebagai Ketua Forum Studi Jurnalis. Mengoordinasi 15+ acara dan seminar teknis selama satu tahun masa jabatan.'
    },
    'award.ketum.tag': { en: 'Leadership', id: 'Kepemimpinan' },

    'award.diploy.badge': { en: 'Active', id: 'Aktif' },
    'award.diploy.title': { en: 'Active Participant — DiploY × NyokKerja', id: 'Peserta Aktif — DiploY × NyokKerja' },
    'award.diploy.desc': {
        en: 'Recognized as an active participant in DiploY × NyokKerja 2025, a career development and entrepreneurship program for young professionals.',
        id: 'Diakui sebagai peserta aktif di DiploY × NyokKerja 2025, program pengembangan karier dan kewirausahaan untuk profesional muda.'
    },
    'award.diploy.tag': { en: 'Career Development', id: 'Pengembangan Karier' },

    'award.lka.title': { en: 'Internship Completion — LKA UNPAM', id: 'Penyelesaian Magang — LKA UNPAM' },
    'award.lka.desc': {
        en: 'Certificate handover ceremony marking the completion of a 6-month Data Management internship. Managed 500+ student records and 1,000+ digital archive files. Grade: <strong>Sangat Baik (Excellent)</strong>.',
        id: 'Seremoni penyerahan sertifikat menandai selesainya magang Manajemen Data selama 6 bulan. Mengelola 500+ arsip data mahasiswa dan 1.000+ file arsip digital. Nilai: <strong>Sangat Baik (Excellent)</strong>.'
    },
    'award.lka.tag': { en: 'Internship', id: 'Magang' },

    // ── Case study page labels ──
    'cs.back': { en: 'Back to Proof of Work', id: 'Kembali ke Bukti Karya' },
    'cs.eyebrow': { en: 'Featured Build', id: 'Karya Unggulan' },
    'cs.whyBuilt': { en: 'Why I Built It', id: 'Kenapa Saya Bikin Ini' },
    'cs.goal': { en: 'Project Goal', id: 'Tujuan Proyek' },
    'cs.role': { en: 'Role', id: 'Peran' },
    'cs.period': { en: 'Period', id: 'Periode' },
    'cs.type': { en: 'Type', id: 'Tipe' },
    'cs.architecture': { en: 'Architecture', id: 'Arsitektur' },
    'cs.whatItDoes': { en: 'What It Does', id: 'Yang Dilakukan' },
    'cs.keyScreens': { en: 'Key Screens', id: 'Layar Utama' },
    'cs.techStack': { en: 'Tech Stack', id: 'Tech Stack' },
    'cs.ctaText': { en: 'Open to full-time Full Stack Developer opportunities.', id: 'Terbuka untuk peluang full-time sebagai Full Stack Developer.' },
    'cs.downloadCv': { en: 'Download CV', id: 'Unduh CV' },
    'cs.emailMe': { en: 'Email Me', id: 'Email Saya' },
    'cs.screenshotSoon': { en: 'Screenshot coming soon', id: 'Screenshot menyusul' },

    // ── Case study body content — per project (cs.<ns>.*) ──
    // Nobel Akademi
    'cs.nobel.title': { en: 'Nobel Akademi', id: 'Nobel Akademi' },
    'cs.nobel.summary': {
        en: 'End-to-end bootcamp LMS module in Laravel 11, covering the data model (6 related tables), backend, admin CMS, and public pages. Eager-loaded Eloquent relations (no N+1), slug routing, YouTube embeds, and a ratings system.',
        id: 'Modul LMS bootcamp end-to-end dengan Laravel 11, mencakup data model (6 tabel berelasi), backend, admin CMS, dan halaman publik. Eloquent relations eager-loaded (bebas N+1), routing berbasis slug, embed YouTube, dan sistem rating.'
    },
    'cs.nobel.whyBuilt': {
        en: 'This was feature work on a live production LMS during my Full Stack internship at PT Indotech Digital, and a chance to ship a complete module end to end (data model to public pages) inside an existing large Laravel codebase, not a greenfield project.',
        id: 'Ini kerjaan feature di LMS production yang sudah live, selama magang Full Stack saya di PT Indotech Digital, sekaligus kesempatan buat ship satu modul lengkap dari ujung ke ujung (data model sampai halaman publik) di dalam codebase Laravel besar yang sudah ada, bukan proyek dari nol.'
    },
    'cs.nobel.goal': {
        en: "Build the Bootcamp module for Nobel Akademi's LMS end to end: a normalized data layer, an admin CMS for managing bootcamp content, and public listing/detail pages. I implemented the UI from designs the team already had, while owning the data model and full-stack logic myself.",
        id: 'Membangun modul Bootcamp untuk LMS Nobel Akademi secara end-to-end: data layer yang ternormalisasi, admin CMS untuk mengelola konten bootcamp, serta halaman listing/detail publik. Saya mengimplementasikan UI dari desain yang sudah disiapkan tim, sementara data model dan logic full-stack-nya saya yang pegang sendiri.'
    },
    'cs.nobel.role': { en: 'Full Stack Engineer (feature team)', id: 'Full Stack Engineer (tim feature)' },
    'cs.nobel.period': { en: 'Jun 2026 – Present', id: 'Jun 2026 – Sekarang' },
    'cs.nobel.type': { en: 'Production feature work (internship)', id: 'Kerjaan feature production (magang)' },
    'cs.nobel.arch': { en: 'Laravel 11, MVC, eager-loaded Eloquent relations', id: 'Laravel 11, MVC, Eloquent relations eager-loaded' },
    'cs.nobel.step0': {
        en: 'Normalized 6-table data model (Bootcamp, Category, Learning, Tool, Module, ModuleItem) across 7 migrations, including banner/video schema iterations',
        id: 'Data model 6 tabel yang ternormalisasi (Bootcamp, Category, Learning, Tool, Module, ModuleItem) lewat 7 migration, termasuk beberapa iterasi schema banner/video'
    },
    'cs.nobel.step1': {
        en: 'Public listing + detail pages with eager-loaded relations (category, instructor, learnings, tools, modules.items) to avoid N+1 queries',
        id: 'Halaman listing + detail publik dengan eager-loaded relations (category, instructor, learnings, tools, modules.items) supaya nggak kena N+1 queries'
    },
    'cs.nobel.step2': {
        en: 'Slug-based routing, YouTube embed, and an inline video player on detail pages',
        id: 'Routing berbasis slug, embed YouTube, dan video player inline di halaman detail'
    },
    'cs.nobel.step3': {
        en: 'Admin CMS with full CRUD for bootcamps, categories, and curriculum modules/items',
        id: 'Admin CMS dengan CRUD lengkap untuk bootcamp, kategori, dan modul/item kurikulum'
    },
    'cs.nobel.step4': {
        en: 'firstOrFail() for clean not-found handling, plus is_active scoping to keep drafts off public pages',
        id: "firstOrFail() buat handling not-found yang rapi, plus scoping is_active biar draft nggak nongol di halaman publik"
    },
    'cs.nobel.techNote': {
        en: 'The UI came from designs the team already had. My part was turning that into a working data model and the full-stack logic behind it: normalizing what could\'ve been one flat table into 6 related tables, then eager-loading everything a detail page needs in one query instead of N+1 lazy loads per related module, tool, and learning row.',
        id: 'UI-nya dari desain yang sudah disiapkan tim. Bagian saya adalah mengubahnya jadi data model yang jalan plus logic full-stack di baliknya: menormalisasi yang tadinya bisa jadi satu tabel flat menjadi 6 tabel yang saling berelasi, lalu eager-load semua yang dibutuhkan halaman detail dalam satu query, bukan N+1 lazy load per baris module, tool, dan learning.'
    },

    // NobiPlay — Live Streaming Module
    'cs.nobilive.title': { en: 'NobiPlay — Live Streaming Module', id: 'NobiPlay — Modul Live Streaming' },
    'cs.nobilive.summary': {
        en: "Feature work on the live-streaming module of NobiPlay, Indonesia's streaming platform: role-based studio CMS, stream scheduling, and automated stream-channel setup. The preview shows NobiPlay's public site; my work is limited to the live-streaming module behind it, which is not visible on the homepage. Shown with my mentor's permission.",
        id: "Kerjaan feature di modul live-streaming NobiPlay, platform streaming Indonesia: studio CMS berbasis role, penjadwalan siaran, dan setup channel siaran otomatis. Preview menampilkan situs publik NobiPlay; kerjaan saya terbatas di modul live-streaming di baliknya, yang tidak terlihat di beranda. Ditampilkan dengan izin mentor."
    },
    'cs.nobilive.whyBuilt': {
        en: "A second product line at PT Indotech Digital Group alongside Nobel Akademi: feature work on the live-streaming module of the NobiPlay streaming platform. Shared here with explicit permission from my mentor, without exposing source code.",
        id: "Lini produk kedua di PT Indotech Digital Group selain Nobel Akademi: kerjaan feature di modul live-streaming platform streaming NobiPlay. Ditampilkan di sini dengan izin eksplisit dari mentor saya, tanpa membuka source code."
    },
    'cs.nobilive.goal': {
        en: 'Contribute to the live-streaming module: a studio-side CMS for hosts and admins to manage streams and schedules.',
        id: 'Berkontribusi ke modul live-streaming: CMS sisi studio buat host dan admin mengelola siaran dan jadwal.'
    },
    'cs.nobilive.role': { en: 'Full Stack Engineer (feature team)', id: 'Full Stack Engineer (tim feature)' },
    'cs.nobilive.period': { en: 'Jul 2026 – Present', id: 'Jul 2026 – Sekarang' },
    'cs.nobilive.type': { en: 'Production feature work (internship)', id: 'Kerjaan feature production (magang)' },
    'cs.nobilive.arch': { en: 'Laravel 13, role-based access control', id: 'Laravel 13, role-based access control' },
    'cs.nobilive.step0': { en: 'Role-based Studio CMS for hosts and admins', id: 'Studio CMS berbasis role buat host dan admin' },
    'cs.nobilive.step1': { en: 'Stream scheduling consolidated into a single Live Studio flow', id: 'Penjadwalan siaran digabung jadi satu alur Live Studio' },
    'cs.nobilive.step2': {
        en: 'Automated stream-channel setup from the Studio, with a live health indicator and readable error messages when the streaming provider refuses a request',
        id: 'Setup channel siaran otomatis dari Studio, dengan indikator kesehatan live dan pesan error yang terbaca saat provider streaming menolak request'
    },
    'cs.nobilive.step3': {
        en: 'Guards so the automation only ever touches channels the app itself created, plus login throttling and viewing rules per stream visibility',
        id: 'Pengaman supaya otomasi cuma pernah menyentuh channel yang dibuat app sendiri, plus throttle login dan aturan menonton per visibilitas siaran'
    },
    'cs.nobilive.step4': {
        en: 'Pause and end controls for hosts and admins, backed by a test suite that stays green (442 tests)',
        id: 'Kontrol jeda dan akhiri siaran buat host dan admin, dengan test suite yang tetap hijau (442 test)'
    },
    'cs.nobilive.techNote': {
        en: "The live preview is NobiPlay's public site. My contribution is only the live-streaming module (studio CMS and stream setup), which sits behind the creator and admin logins and is not visible there. No source code, database schema, or business metrics are shared.",
        id: "Preview live adalah situs publik NobiPlay. Kontribusi saya hanya modul live-streaming (studio CMS dan setup siaran), yang ada di balik login creator dan admin dan tidak terlihat di sana. Tidak ada source code, skema database, atau metrik bisnis yang dibagikan."
    },

    // Gatra Data — Donor Segmentation Automation
    'cs.gatra.title': { en: 'Donor Segmentation & Reporting Automation', id: 'Otomasi Segmentasi & Pelaporan Donatur' },
    'cs.gatra.summary': {
        en: 'Automated donor segmentation and a self-service reporting dashboard in Google Apps Script for a 16,000+ row donation dataset. Client and donor data are confidential, so this page describes the system, not the underlying data.',
        id: 'Otomasi segmentasi donatur dan dashboard pelaporan self-service dengan Google Apps Script untuk dataset donasi 16.000+ baris. Data klien dan donatur bersifat rahasia, jadi halaman ini menjelaskan sistemnya, bukan data mentahnya.'
    },
    'cs.gatra.whyBuilt': {
        en: 'Placed with Gatra Data, a data-analytics partner, as part of the APIKpreneur on-the-job-training program. The client needed donor activity turned into segments a non-technical team could act on, without paying for a BI tool.',
        id: 'Ditempatkan di Gatra Data, mitra data analytics, sebagai bagian program OJT APIKpreneur. Klien butuh aktivitas donatur diubah jadi segmen yang bisa langsung ditindaklanjuti tim non-teknis, tanpa perlu bayar tool BI.'
    },
    'cs.gatra.goal': {
        en: 'Turn a 16,000+ row raw transaction sheet into an always-up-to-date donor segmentation and a dashboard non-technical teammates and the mentor could read without touching the underlying data.',
        id: 'Mengubah sheet transaksi mentah 16.000+ baris jadi segmentasi donatur yang selalu ter-update dan dashboard yang bisa dibaca tim non-teknis serta mentor tanpa perlu menyentuh data mentahnya.'
    },
    'cs.gatra.role': { en: 'Data Analyst (OJT)', id: 'Data Analyst (OJT)' },
    'cs.gatra.period': { en: 'Aug 2026 – Present', id: 'Agu 2026 – Sekarang' },
    'cs.gatra.type': { en: 'Client engagement (scholarship OJT placement)', id: 'Kerjaan klien (penempatan OJT beasiswa)' },
    'cs.gatra.arch': { en: 'Google Apps Script, Google Sheets', id: 'Google Apps Script, Google Sheets' },
    'cs.gatra.step0': {
        en: 'Hierarchical RFM-style segmentation (Potential/Loyal/Active/New/Passive) plus a sub-level engagement-health status, recalculated in one batched read/write pass instead of per-row calls',
        id: 'Segmentasi hierarkis ala RFM (Potensial/Loyal/Aktif/Baru/Pasif) plus sub-status kesehatan keaktifan, dihitung ulang dalam satu batch read/write, bukan per baris'
    },
    'cs.gatra.step1': {
        en: 'Self-service Dashboard sheet with a global favorite-program ranking plus a cumulative month-over-month segment growth table',
        id: 'Sheet Dashboard self-service dengan ranking program favorit global plus tabel pertumbuhan segmen kumulatif per bulan'
    },
    'cs.gatra.step2': {
        en: 'Daily time-driven trigger automating the whole pipeline, replacing manual reruns',
        id: 'Time-driven trigger harian yang mengotomasi seluruh pipeline, menggantikan rerun manual'
    },
    'cs.gatra.step3': {
        en: 'Resolved ambiguous requirements (multi-label vs. hierarchy, monthly snapshot vs. overwrite) directly with stakeholders before finalizing the logic',
        id: 'Menyelesaikan requirement ambigu (multi-label vs hierarki, snapshot bulanan vs nimpa data) langsung sama stakeholder sebelum logic-nya difinalkan'
    },
    'cs.gatra.techNote': {
        en: 'Donor names, contact details, and the underlying spreadsheet are confidential. Screenshots on this page (once added) will show the segmentation logic and dashboard structure with all donor-identifying data redacted.',
        id: 'Nama donatur, kontak, dan spreadsheet mentahnya bersifat rahasia. Screenshot di halaman ini (kalau sudah ditambahkan) akan menampilkan logic segmentasi dan struktur dashboard dengan semua data identitas donatur disensor.'
    },

    // SIM Casting JBTB
    'cs.jbtb.title': { en: 'SIM Casting — PT. JBTB Casting Creative Group', id: 'SIM Casting — PT. JBTB Casting Creative Group' },
    'cs.jbtb.summary': {
        en: "A Laravel 13 system that replaced a casting agency's manual WhatsApp, Excel, and Drive workflow, so fee agreements, staff honor, and project finances are recorded instead of argued over later. Built as a team final year project, where I lead the build: data model, backend, and full-stack logic end to end.",
        id: 'Sistem Laravel 13 yang gantiin alur kerja manual WhatsApp, Excel, dan Drive punya agensi casting, biar kesepakatan fee, honor staf, dan keuangan proyek tercatat, bukan dibantah belakangan. Dibangun sebagai tugas akhir tim, di mana saya yang mimpin pembangunannya: data model, backend, dan logic full-stack end-to-end.'
    },
    'cs.jbtb.whyBuilt': {
        en: "I wanted my final year project to solve a real problem for a real company, not be a tutorial-scale CRUD app. The agency's own team described how fee deals and pay were tracked across chat threads and spreadsheets, and our team took that on as the project, with me leading the system build while teammates cover the academic documentation.",
        id: 'Saya pengen tugas akhir yang nyelesain masalah beneran buat perusahaan beneran, bukan CRUD app skala tutorial. Tim agensinya sendiri cerita kalau kesepakatan fee dan pembayaran dicatat di thread chat dan spreadsheet, dan tim kami ambil itu sebagai proyek, dengan saya yang mimpin pembangunan sistemnya sementara rekan tim handle dokumentasi akademiknya.'
    },
    'cs.jbtb.goal': {
        en: "Replace the agency's manual recruitment-and-payment process with one system that solves three concrete problems: fee agreements between Admin and Extras that can't be disputed after the fact, staff honor that comes with a clear payslip per project instead of a guess, and project money (honor, invoices, other costs) recorded in one place instead of scattered spreadsheets.",
        id: 'Ganti proses rekrutmen-dan-pembayaran manual agensi jadi satu sistem yang nyelesain tiga masalah konkret: kesepakatan fee antara Admin dan Extras yang nggak bisa dibantah belakangan, honor staf yang ada slip jelasnya per proyek, bukan kira-kira, dan uang proyek (honor, invoice, biaya lain) yang tercatat di satu tempat, bukan spreadsheet yang tersebar.'
    },
    'cs.jbtb.role': { en: 'Project Lead & Lead Developer', id: 'Project Lead & Lead Developer' },
    'cs.jbtb.period': { en: 'Sep 2026 – Present', id: 'Sep 2026 – Sekarang' },
    'cs.jbtb.type': { en: 'Final Year Project · team of 3', id: 'Tugas Akhir · tim 3 orang' },
    'cs.jbtb.arch': { en: 'Laravel 13, Blade, role-based access control', id: 'Laravel 13, Blade, access control berbasis role' },
    'cs.jbtb.step0': {
        en: "In-app multi-round fee negotiation between Admin and Extras, every offer logged until there's a deal, so what got agreed to is never up for dispute later",
        id: 'Nego fee multi-round in-app antara Admin dan Extras, tiap tawaran tercatat sampai deal, jadi kesepakatan yang udah dibuat nggak bisa dibantah belakangan'
    },
    'cs.jbtb.step1': {
        en: 'Staff honor set per event, with a payslip PDF generated automatically once the project wraps, replacing a guessed number with an actual slip',
        id: 'Honor staf ditetapkan per event, dengan slip honor PDF yang digenerate otomatis begitu proyek kelar, gantiin nominal kira-kira jadi slip beneran'
    },
    'cs.jbtb.step2': {
        en: 'Project money kept as records, not guesses: honor per Extras, staff payroll with payslips and work history, and invoices that get signed and marked paid',
        id: 'Uang proyek dicatat sebagai rekaman, bukan kira-kira: honor per Extras, penggajian staf dengan slip dan riwayat kerja, dan invoice yang ditandatangani dan ditandai lunas'
    },
    'cs.jbtb.step3': {
        en: 'Digital contract generated automatically when a candidate is confirmed, signed on screen, and voided automatically if the booking is cancelled (audit trail preserved)',
        id: 'Kontrak digital yang digenerate otomatis saat kandidat dikonfirmasi, ditandatangani di layar, dan otomatis di-void kalau booking dibatalkan (audit trail tetap tersimpan)'
    },
    'cs.jbtb.step4': {
        en: 'Field attendance: Extras check in with a selfie, the on-site coordinator validates or rejects it, and notes or sanctions are logged per person',
        id: 'Absensi lapangan: Extras check-in pakai selfie, koordinator lapangan memvalidasi atau menolaknya, dan catatan atau sanksi tercatat per orang'
    },
    'cs.jbtb.step5': {
        en: 'In-app notifications as the primary channel, plus a self-hosted WhatsApp gateway running as a queued job so a failed message never blocks the action that triggered it',
        id: 'Notifikasi in-app sebagai kanal utama, ditambah gateway WhatsApp self-hosted yang jalan sebagai queued job, biar pesan yang gagal kirim nggak pernah nge-block action yang men-trigger-nya'
    },
    'cs.jbtb.step6': {
        en: 'Invite an Extras to a project in-app (tracked), with a WhatsApp button so the admin can follow up manually',
        id: 'Undang Extras ke proyek lewat app (tercatat), dengan tombol WhatsApp biar admin bisa follow up manual'
    },
    'cs.jbtb.step7': {
        en: 'Payment disputes can be resolved: Extras flag a problem, the admin is notified, adds a resolution note and optional new proof, and the payment returns for confirmation',
        id: 'Sengketa pembayaran bisa diselesaikan: Extras lapor masalah, admin dinotifikasi, isi catatan penyelesaian dan bukti baru (opsional), lalu pembayaran kembali untuk dikonfirmasi'
    },
    'cs.jbtb.step8': {
        en: 'Checked by 769 automated tests (SQLite, then MySQL) and a 198-finding UX audit across five roles, with the fixes shipped in batches',
        id: 'Dicek 769 test otomatis (SQLite, lalu MySQL) dan audit UX 198 temuan dari lima role, dengan perbaikan yang dirilis per batch'
    },
    'cs.jbtb.techNote': {
        en: 'Mass assignment is attribute-based (PHP 8 #[Fillable]) rather than the classic $fillable property, paired with Model::preventSilentlyDiscardingAttributes() in non-production, so a forgotten column on a new field throws immediately in dev instead of silently dropping data in production. NIK lookups use a separate HMAC-hashed column (keyed independently from APP_KEY) specifically so duplicate-detection queries never need to decrypt the encrypted NIK column itself.',
        id: "Mass assignment pakai attribute-based (PHP 8 #[Fillable]) bukan property $fillable klasik, dipasangkan dengan Model::preventSilentlyDiscardingAttributes() di non-production, jadi kalau ada kolom baru yang kelupaan, langsung throw error pas development, bukan diam-diam ke-drop datanya pas production. Lookup NIK pakai kolom hash HMAC terpisah (key-nya independen dari APP_KEY) khusus supaya query deteksi duplikat nggak pernah perlu decrypt kolom NIK yang terenkripsi itu sendiri."
    },

    // Re:Daily Coffee Website
    'cs.redaily.title': { en: "Re:Daily Coffee Website", id: "Website Re:Daily Coffee" },
    'cs.redaily.summary': {
        en: "A fast, mobile-first website for a local café: menu, location, and reviews in one place, with the structured data and metadata search engines need. Built and deployed solo for a friend's business.",
        id: "Website cepat dan mobile-first buat kafe lokal: menu, lokasi, dan ulasan di satu tempat, lengkap dengan structured data dan metadata yang dibutuhkan mesin pencari. Dibangun dan di-deploy sendiri buat bisnis teman."
    },
    'cs.redaily.whyBuilt': {
        en: "The café had a Google Maps listing and an old Blogger page, but no proper site of its own. A friend owns it, so I built an official one, and used it to practice local SEO on something real.",
        id: "Kafenya punya listing Google Maps dan halaman Blogger lama, tapi belum punya website sendiri. Karena pemiliknya teman saya, saya bikinin yang resmi, sekalian latihan SEO lokal di sesuatu yang nyata."
    },
    'cs.redaily.goal': {
        en: "Answer what people ask before they visit (what is on the menu, how much, where, until when) on one fast page set that Google can read and index.",
        id: "Jawab apa yang orang tanyain sebelum datang (menunya apa, berapa harganya, di mana, tutup jam berapa) di satu set halaman cepat yang bisa dibaca dan diindeks Google."
    },
    'cs.redaily.role': { en: "Solo developer", id: "Developer tunggal" },
    'cs.redaily.period': { en: "Oct 2026", id: "Okt 2026" },
    'cs.redaily.type': { en: "Client site for a friend's café", id: "Website klien, kafe milik teman" },
    'cs.redaily.arch': { en: "Static HTML from a Node build script, GitHub Pages", id: "HTML statis dari script build Node, GitHub Pages" },
    'cs.redaily.step0': {
        en: "Home, full menu in four categories with the café's own prices, and a location page with an embedded map",
        id: "Beranda, menu lengkap dalam empat kategori dengan harga asli kafenya, dan halaman lokasi dengan peta tertanam"
    },
    'cs.redaily.step1': {
        en: "Visitor reviews section built from real Google Maps comments",
        id: "Bagian ulasan pengunjung dari komentar asli Google Maps"
    },
    'cs.redaily.step2': {
        en: "Local SEO: café structured data (address, hours, menu), sitemap, robots, canonical tags, and social previews per page",
        id: "SEO lokal: structured data kafe (alamat, jam buka, menu), sitemap, robots, tag canonical, dan preview sosial per halaman"
    },
    'cs.redaily.step3': {
        en: "Light and dark themes with a floating pill navigation, checked at phone widths",
        id: "Tema terang dan gelap dengan navigasi pill melayang, dicek di lebar layar HP"
    },
    'cs.redaily.step4': {
        en: "Anonymous visitor counter on a small realtime database",
        id: "Penghitung pengunjung anonim di realtime database kecil"
    },
    'cs.redaily.techNote': {
        en: "A zero-dependency Node script writes plain HTML into dist/, and a GitHub Actions workflow deploys it to GitHub Pages on the custom domain. Internal links are relative, so the same build works on a sub-path preview and at the domain root. I moved hosting off Netlify after its free tier injected a platform badge into the pages.",
        id: "Script Node tanpa dependency menulis HTML biasa ke dist/, dan workflow GitHub Actions men-deploy-nya ke GitHub Pages di domain custom. Link internalnya relatif, jadi build yang sama jalan di preview sub-path maupun di root domain. Saya pindah hosting dari Netlify setelah free tier-nya menyisipkan badge platform ke halaman."
    },

    // Notes: Personal Blog
    'cs.notes.title': { en: "Notes: Personal Blog", id: "Notes: Blog Pribadi" },
    'cs.notes.summary': {
        en: "A personal blog where publishing a post means writing one Markdown file, and every page ships the metadata search engines and link previews need. I wrote the generator myself instead of using a theme.",
        id: "Blog pribadi di mana publish post berarti nulis satu file Markdown, dan tiap halaman membawa metadata yang dibutuhkan mesin pencari dan preview link. Generator-nya saya tulis sendiri, bukan pakai tema."
    },
    'cs.notes.whyBuilt': {
        en: "I wanted a place to write about coding, campus life, and the cafés I work from, and a real site to practice SEO on. Building the generator myself meant knowing exactly what every tag on the page is for.",
        id: "Saya pengen punya tempat nulis soal ngoding, kehidupan kampus, dan kafe tempat saya kerja, dan situs nyata buat latihan SEO. Dengan nulis generator sendiri, saya tahu persis fungsi tiap tag di halaman."
    },
    'cs.notes.goal': {
        en: "A fast blog with no database to run, where a new post is a file, and every page is correct for search, sharing, and reading on a phone.",
        id: "Blog cepat tanpa database yang harus dijalankan, di mana post baru cukup satu file, dan tiap halaman benar untuk pencarian, berbagi, dan dibaca di HP."
    },
    'cs.notes.role': { en: "Solo developer", id: "Developer tunggal" },
    'cs.notes.period': { en: "Oct 2026", id: "Okt 2026" },
    'cs.notes.type': { en: "Personal project", id: "Proyek pribadi" },
    'cs.notes.arch': { en: "Static HTML from a Node build script (marked), GitHub Pages", id: "HTML statis dari script build Node (marked), GitHub Pages" },
    'cs.notes.step0': {
        en: "Markdown posts with front matter for tags, cover image, and a draft flag; the build fails if a placeholder is left in a published post",
        id: "Post Markdown dengan front matter untuk tag, cover, dan flag draft; build gagal kalau ada placeholder tersisa di post yang dipublikasikan"
    },
    'cs.notes.step1': {
        en: "Per-page SEO: canonical, Open Graph and Twitter cards, JSON-LD (BlogPosting, breadcrumbs, Person), sitemap, RSS, and robots",
        id: "SEO per halaman: canonical, Open Graph dan Twitter card, JSON-LD (BlogPosting, breadcrumb, Person), sitemap, RSS, dan robots"
    },
    'cs.notes.step2': {
        en: "An author page with Person schema linking my profiles, so search engines can tie them to one identity",
        id: "Halaman penulis dengan schema Person yang menautkan profil saya, supaya mesin pencari bisa menyatukannya sebagai satu identitas"
    },
    'cs.notes.step3': {
        en: "Floating pill navigation, sidebar with latest posts and topics, and light and dark themes",
        id: "Navigasi pill melayang, sidebar berisi post terbaru dan topik, dan tema terang dan gelap"
    },
    'cs.notes.step4': {
        en: "Comments through Giscus (GitHub Discussions), so there is no backend to run",
        id: "Komentar lewat Giscus (GitHub Discussions), jadi tidak ada backend yang dijalankan"
    },
    'cs.notes.step5': {
        en: "Anonymous visitor counter on a small realtime database",
        id: "Penghitung pengunjung anonim di realtime database kecil"
    },
    'cs.notes.techNote': {
        en: "One Node script with marked as its only dependency writes dist/, and GitHub Actions deploys it to GitHub Pages. Comments use Giscus with strict matching on the page path; the trade-off is that commenters need a GitHub account, which suits a developer audience but not every post.",
        id: "Satu script Node dengan marked sebagai satu-satunya dependency menulis dist/, dan GitHub Actions men-deploy-nya ke GitHub Pages. Komentar pakai Giscus dengan strict matching pada path halaman; konsekuensinya komentator butuh akun GitHub, cocok buat pembaca developer tapi tidak buat semua post."
    },

    // Evermos
    'cs.evermos.title': { en: 'Marketplace REST API', id: 'Marketplace REST API' },
    'cs.evermos.summary': {
        en: 'Full marketplace API: Golang, Gin, MySQL, JWT. 7 modul, clean architecture, pagination, multi-image upload, atomic transactions.',
        id: 'API marketplace lengkap: Golang, Gin, MySQL, JWT. 7 modul, clean architecture, pagination, upload multi-gambar, atomic transaction.'
    },
    'cs.evermos.whyBuilt': {
        en: "I wanted hands-on proof that I could design a backend from scratch, not just consume APIs someone else built. Evermos x Rakamin's brief was open enough to let me make real architectural calls instead of following a fixed spec.",
        id: 'Saya pengen bukti hands-on kalau saya bisa desain backend dari nol, bukan cuma consume API buatan orang lain. Brief dari Evermos x Rakamin cukup terbuka buat saya bikin keputusan arsitektur beneran, bukan sekadar ngikutin spec yang sudah fix.'
    },
    'cs.evermos.goal': {
        en: 'Build a marketplace REST API that could plausibly sit behind a real e-commerce app: sellers manage stores and products, buyers browse and transact, everything auth-gated and consistent even under concurrent writes.',
        id: 'Membangun REST API marketplace yang masuk akal buat jadi backend aplikasi e-commerce beneran: seller kelola toko dan produk, buyer browsing dan transaksi, semuanya auth-gated dan tetap konsisten meski ada concurrent writes.'
    },
    'cs.evermos.role': { en: 'Solo Backend Developer', id: 'Solo Backend Developer' },
    'cs.evermos.period': { en: 'Dec 2025', id: 'Des 2025' },
    'cs.evermos.type': { en: 'Internship Project', id: 'Proyek Magang' },
    'cs.evermos.arch': { en: 'Clean Architecture (Handler-Service-Repository)', id: 'Clean Architecture (Handler-Service-Repository)' },
    'cs.evermos.step0': { en: 'JWT authentication with role-based access control', id: 'Autentikasi JWT dengan role-based access control' },
    'cs.evermos.step1': { en: 'Store, address, and category management per seller', id: 'Manajemen toko, alamat, dan kategori per seller' },
    'cs.evermos.step2': { en: 'Multi-image product upload with pagination and price-range filtering', id: 'Upload produk multi-gambar dengan pagination dan filter rentang harga' },
    'cs.evermos.step3': { en: 'Atomic transactions for order/checkout consistency', id: 'Atomic transaction buat konsistensi order/checkout' },
    'cs.evermos.screen0Title': { en: 'Auth & User', id: 'Auth & User' },
    'cs.evermos.screen0Desc': {
        en: 'JWT-based login/register with role checks enforced at the middleware layer, not scattered across handlers.',
        id: 'Login/register berbasis JWT dengan pengecekan role yang dipaksakan di layer middleware, bukan tersebar di banyak handler.'
    },
    'cs.evermos.screen1Title': { en: 'Store & Product', id: 'Toko & Produk' },
    'cs.evermos.screen1Desc': {
        en: 'Sellers manage store profiles and products with multi-image upload and category assignment.',
        id: 'Seller kelola profil toko dan produk dengan upload multi-gambar dan penetapan kategori.'
    },
    'cs.evermos.screen2Title': { en: 'Transaction', id: 'Transaksi' },
    'cs.evermos.screen2Desc': {
        en: 'Checkout flow wrapped in atomic DB transactions so a failure partway through never leaves stock or balances inconsistent.',
        id: 'Alur checkout dibungkus atomic DB transaction, jadi kalau gagal di tengah jalan, stok atau saldo nggak pernah jadi nggak konsisten.'
    },
    'cs.evermos.techNote': {
        en: "Clean Architecture (Handler-Service-Repository) was the deliberate choice here over a quick MVC dump: it keeps business logic in the Service layer testable and independent of Gin's request/response types, so swapping the HTTP framework later wouldn't touch the domain logic at all. Atomic transactions on the Transaction module specifically guard against the classic race condition where two requests read the same stock count before either writes back.",
        id: 'Clean Architecture (Handler-Service-Repository) sengaja dipilih dibanding MVC yang cepat tapi berantakan: business logic di layer Service jadi testable dan nggak bergantung ke tipe request/response Gin, jadi kalau nanti ganti HTTP framework, domain logic-nya nggak perlu disentuh sama sekali. Atomic transaction di modul Transaction khusus buat jaga-jaga dari race condition klasik, di mana dua request baca stok yang sama sebelum salah satunya nulis balik.'
    },

    // Core Initiative
    'cs.core.title': { en: 'E-Commerce Catalog', id: 'Katalog E-Commerce' },
    'cs.core.summary': {
        en: 'Katalog e-commerce Vue.js 2, live REST API, 3 dynamic UI themes, pixel-perfect Figma, deployed via GitLab CI/CD.',
        id: 'Katalog e-commerce Vue.js 2, REST API live, 3 UI theme dinamis, pixel-perfect dari Figma, deploy lewat GitLab CI/CD.'
    },
    'cs.core.whyBuilt': {
        en: 'After a backend-heavy project (Evermos), I wanted to prove the frontend side too: taking a Figma design and live API data and shipping something pixel-accurate, not just functional.',
        id: 'Setelah proyek yang backend-heavy (Evermos), saya pengen buktiin sisi frontend juga: ambil desain Figma dan data API live, terus ship sesuatu yang pixel-accurate, bukan cuma sekadar jalan.'
    },
    'cs.core.goal': {
        en: 'Build an e-commerce catalog frontend in Vue.js 2 that consumes a live REST API and supports multiple brand themes without duplicating components per theme.',
        id: 'Membangun frontend katalog e-commerce di Vue.js 2 yang consume REST API live dan support banyak brand theme tanpa duplikasi komponen per theme.'
    },
    'cs.core.role': { en: 'Solo Frontend Developer', id: 'Solo Frontend Developer' },
    'cs.core.period': { en: 'Oct – Nov 2025', id: 'Okt – Nov 2025' },
    'cs.core.type': { en: 'Internship Project', id: 'Proyek Magang' },
    'cs.core.arch': { en: 'Vue.js 2, component-based', id: 'Vue.js 2, berbasis komponen' },
    'cs.core.step0': { en: 'Live REST API integration for product listings', id: 'Integrasi REST API live untuk listing produk' },
    'cs.core.step1': { en: '3 dynamic UI themes switchable via class binding + CSS variables', id: '3 UI theme dinamis yang bisa di-switch lewat class binding + CSS variable' },
    'cs.core.step2': { en: 'Pixel-perfect implementation from Figma source files', id: 'Implementasi pixel-perfect dari file Figma sumber' },
    'cs.core.step3': { en: 'Deployed via GitLab CI/CD to Firebase Hosting', id: 'Deploy lewat GitLab CI/CD ke Firebase Hosting' },
    'cs.core.screen0Title': { en: 'Catalog Listing', id: 'Listing Katalog' },
    'cs.core.screen0Desc': {
        en: 'Product grid pulling live data from the REST API, with the active theme controlling color tokens and imagery.',
        id: 'Grid produk yang narik data live dari REST API, dengan theme aktif yang ngatur color token dan gambar.'
    },
    'cs.core.screen1Title': { en: 'Theme Switching', id: 'Ganti Theme' },
    'cs.core.screen1Desc': {
        en: 'Three distinct brand themes toggled at runtime via a single class binding, backed by CSS custom properties rather than separate stylesheets.',
        id: 'Tiga brand theme berbeda yang di-toggle saat runtime lewat satu class binding, didukung CSS custom properties, bukan stylesheet terpisah-pisah.'
    },
    'cs.core.techNote': {
        en: 'Themes are implemented as CSS custom properties swapped via one root class binding, not three separate component trees. This kept the Figma-to-code work honest to pixel-perfect specs per theme while avoiding 3x the maintenance surface if a layout bug showed up later.',
        id: 'Theme diimplementasikan sebagai CSS custom properties yang di-swap lewat satu root class binding, bukan tiga component tree terpisah. Ini bikin kerjaan Figma-to-code tetap setia ke spec pixel-perfect tiap theme, sambil menghindari maintenance surface 3x lipat kalau nanti ada bug layout.'
    },

    // Brand Social Media Presence (CMS)
    'cs.cms.title': { en: 'Brand Social Media Presence', id: 'Kehadiran Brand di Media Sosial' },
    'cs.cms.summary': {
        en: "Part of a 3-person team building and maintaining the company's social media presence from scratch: consistent posting cadence, brand voice, and AI-assisted copywriting via prompt engineering.",
        id: 'Bagian dari tim 3 orang yang membangun dan menjaga kehadiran media sosial perusahaan dari nol: ritme posting yang konsisten, brand voice, dan copywriting berbantuan AI lewat prompt engineering.'
    },
    'cs.cms.whyBuilt': {
        en: 'The brand had no social presence at all. This was a chance to build one from zero with a small team, and to test how far prompt engineering could scale content production without making the brand voice feel robotic.',
        id: 'Brand-nya belum punya presence sosial media sama sekali. Ini kesempatan buat bangun dari nol bareng tim kecil, sekaligus nguji sejauh mana prompt engineering bisa scale produksi konten tanpa bikin brand voice-nya kerasa robotik.'
    },
    'cs.cms.goal': {
        en: "Establish and maintain a consistent brand voice and posting cadence for PT. Cahaya Millenial Sejahtera's social channels over a full year, not a short campaign burst.",
        id: 'Membangun dan menjaga brand voice serta ritme posting yang konsisten untuk kanal sosial media PT. Cahaya Millenial Sejahtera selama satu tahun penuh, bukan cuma campaign singkat.'
    },
    'cs.cms.role': { en: 'Content & AI Workflow (team of 3)', id: 'Content & AI Workflow (tim 3 orang)' },
    'cs.cms.period': { en: 'Jul 2024 – Jul 2025', id: 'Jul 2024 – Jul 2025' },
    'cs.cms.type': { en: 'Marketing engagement', id: 'Engagement marketing' },
    'cs.cms.arch': { en: 'Instagram + prompt-engineered content pipeline', id: 'Instagram + content pipeline berbasis prompt engineering' },
    'cs.cms.step0': { en: 'Consistent posting cadence sustained over a full year, not a short campaign', id: 'Ritme posting konsisten yang dijaga selama satu tahun penuh, bukan campaign singkat' },
    'cs.cms.step1': { en: 'Brand voice guidelines established and applied consistently across all content', id: 'Guideline brand voice yang dibuat dan diterapkan konsisten di semua konten' },
    'cs.cms.step2': {
        en: 'AI-assisted copywriting via prompt engineering, used to scale output across the team without losing consistency',
        id: 'Copywriting berbantuan AI lewat prompt engineering, dipakai buat scale output tim tanpa kehilangan konsistensi'
    },
    'cs.cms.screen0Title': { en: 'Brand Content', id: 'Konten Brand' },
    'cs.cms.screen0Desc': {
        en: 'Consistent visual and voice identity applied across posts, maintained over a full year rather than a short campaign burst.',
        id: 'Identitas visual dan voice yang konsisten diterapkan di semua post, dijaga selama satu tahun penuh, bukan cuma campaign singkat.'
    },
    'cs.cms.screen1Title': { en: 'AI-Assisted Copywriting', id: 'Copywriting Berbantuan AI' },
    'cs.cms.screen1Desc': {
        en: 'Prompt engineering used to scale content output across a 3-person team while keeping the brand voice consistent.',
        id: 'Prompt engineering dipakai buat scale output konten di tim 3 orang sambil tetap menjaga brand voice konsisten.'
    },
    'cs.cms.techNote': {
        en: "The interesting part wasn't the posting itself. It was building prompt templates specific enough that 3 different people writing copy still sounded like one consistent brand voice, instead of needing a single bottleneck writer to review everything.",
        id: 'Bagian menariknya bukan posting-nya. Tapi bikin prompt template yang cukup spesifik sampai 3 orang berbeda yang nulis copy tetap kedengeran kayak satu brand voice yang konsisten, tanpa perlu satu penulis jadi bottleneck buat review semuanya.'
    },

    // YPKB
    'cs.ypkb.title': { en: 'WordPress Web Developer', id: 'WordPress Web Developer' },
    'cs.ypkb.summary': {
        en: 'Volunteer developer building and maintaining the foundation\'s website on WordPress. Also appeared as on-camera talent in several Instagram content pieces for @ypkb_indonesia.',
        id: 'Developer relawan yang membangun dan maintain website yayasan di WordPress. Juga tampil sebagai talent on-camera di beberapa konten Instagram @ypkb_indonesia.'
    },
    'cs.ypkb.whyBuilt': {
        en: "A nonprofit foundation needed a working website and someone to keep it maintained, a straightforward volunteer commitment that kept my WordPress skills active outside of the PHP/Laravel work I was doing elsewhere.",
        id: 'Sebuah yayasan nonprofit butuh website yang jalan dan ada yang maintain, komitmen relawan yang cukup straightforward, sekaligus bikin skill WordPress saya tetap kepakai di luar kerjaan PHP/Laravel yang saya lakuin di tempat lain.'
    },
    'cs.ypkb.goal': {
        en: "Build and maintain a functional WordPress website for Yayasan Peduli Kesejahteraan Bersama, keeping content current without requiring the foundation's own staff to touch code.",
        id: 'Membangun dan maintain website WordPress yang fungsional untuk Yayasan Peduli Kesejahteraan Bersama, menjaga konten tetap up to date tanpa staf yayasan perlu sentuh kode.'
    },
    'cs.ypkb.role': { en: 'Volunteer WordPress Developer', id: 'Volunteer WordPress Developer' },
    'cs.ypkb.period': { en: '2023 – 2024', id: '2023 – 2024' },
    'cs.ypkb.type': { en: 'Volunteer work', id: 'Kerja sukarela' },
    'cs.ypkb.arch': { en: 'WordPress', id: 'WordPress' },
    'cs.ypkb.step0': { en: 'Website build and ongoing maintenance on WordPress for a nonprofit foundation', id: 'Bangun dan maintain website WordPress untuk yayasan nonprofit' },
    'cs.ypkb.step1': { en: 'Content updates handled without requiring foundation staff to edit code directly', id: 'Update konten ditangani tanpa staf yayasan perlu edit kode langsung' },
    'cs.ypkb.screen0Title': { en: 'Foundation Website', id: 'Website Yayasan' },
    'cs.ypkb.screen0Desc': {
        en: "A maintained WordPress site for the foundation's public-facing presence.",
        id: 'Situs WordPress yang di-maintain buat presence publik yayasan.'
    },
    'cs.ypkb.techNote': {
        en: "Domain has since expired, so this one's no longer live. It's kept here as a record of the volunteer work rather than a demoable site.",
        id: 'Domainnya sudah expired, jadi yang ini udah nggak live lagi. Disimpan di sini sebagai catatan kerja relawan, bukan sebagai site yang bisa didemoin.'
    },

    // Groomy
    'cs.groomy.title': { en: 'Groomy — Mobile App UI/UX', id: 'Groomy — UI/UX Aplikasi Mobile' },
    'cs.groomy.summary': {
        en: 'End-to-end mobile UI/UX design for an on-demand grooming and beauty service booking app. Covers user flows, component library, and interactive prototype.',
        id: 'Desain UI/UX mobile end-to-end untuk aplikasi booking layanan grooming dan kecantikan on-demand. Mencakup user flow, component library, dan prototype interaktif.'
    },
    'cs.groomy.whyBuilt': {
        en: 'I wanted a complete UI/UX piece for my coursework that went past static mockups: full user flows, a reusable component library, and an interactive prototype someone could actually click through.',
        id: 'Saya pengen bikin karya UI/UX yang lengkap buat tugas kuliah, yang lebih dari sekadar mockup statis: user flow lengkap, component library yang reusable, dan prototype interaktif yang beneran bisa diklik-klik orang.'
    },
    'cs.groomy.goal': {
        en: 'Design an on-demand grooming and beauty service booking app end to end in Figma: from user flows through a reusable component library to a clickable, interactive prototype.',
        id: 'Mendesain aplikasi booking layanan grooming dan kecantikan on-demand secara end-to-end di Figma: dari user flow, component library yang reusable, sampai prototype interaktif yang bisa diklik.'
    },
    'cs.groomy.role': { en: 'UI/UX Designer', id: 'UI/UX Designer' },
    'cs.groomy.period': { en: '2024', id: '2024' },
    'cs.groomy.type': { en: 'Coursework project (UAS)', id: 'Proyek kuliah (UAS)' },
    'cs.groomy.arch': { en: 'Figma, component-based design system', id: 'Figma, design system berbasis komponen' },
    'cs.groomy.step0': {
        en: 'End-to-end user flows for browsing, booking, and managing grooming service appointments',
        id: 'User flow end-to-end untuk browsing, booking, dan mengelola janji layanan grooming'
    },
    'cs.groomy.step1': {
        en: 'Reusable component library instead of one-off screens, so variants stay visually consistent',
        id: 'Component library yang reusable, bukan screen satu-satu, jadi tiap varian tetap konsisten secara visual'
    },
    'cs.groomy.step2': { en: 'Interactive, clickable prototype covering the key screens', id: 'Prototype interaktif yang bisa diklik, mencakup screen-screen utama' },
    'cs.groomy.screen0Title': { en: 'Booking Flow', id: 'Alur Booking' },
    'cs.groomy.screen0Desc': {
        en: 'Core user flow from browsing services to confirming a booking.',
        id: 'User flow inti dari browsing layanan sampai konfirmasi booking.'
    },
    'cs.groomy.screen1Title': { en: 'Component Library', id: 'Component Library' },
    'cs.groomy.screen1Desc': {
        en: 'Reusable components kept the design consistent across screens instead of one-off layouts per screen.',
        id: 'Komponen reusable menjaga desain tetap konsisten di semua screen, bukan layout satu-satu per screen.'
    },
    'cs.groomy.techNote': {
        en: "Built as a component library first, screens second. Every button, card, and input state was a reusable component before a single full screen was assembled, which is what made the prototype's interactions consistent instead of each screen behaving slightly differently.",
        id: 'Dibangun component library dulu, baru screen. Tiap button, card, dan input state jadi komponen reusable sebelum satu full screen pun dirakit, dan itu yang bikin interaksi prototype-nya konsisten, bukan tiap screen kelakuannya beda-beda dikit.'
    },
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
