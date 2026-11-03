/* WhatsApp gate: the WhatsApp buttons stay visible, but the first click asks for a name and a one-line
   reason (sent to the Formspree inbox, never shown publicly). After that the chat opens with a
   pre-filled message and this browser is remembered, so repeat visits go straight to WhatsApp.
   The number is not in the HTML any more, it is assembled here only after the form is accepted. */
(function () {
    const FORM_URL = 'https://formspree.io/f/xwvjerjj';
    const KEY = 'waUnlocked';
    const num = () => ['62', '813', '1532', '4195'].join('');
    const isId = () => (localStorage.getItem('lang') || 'en') === 'id';
    const T = {
        en: { title: 'Chat on WhatsApp', desc: 'Leave a quick note first so I know who is reaching out. It goes to my inbox only, it is not shown on the site.',
              name: 'Your name', purpose: 'What would you like to talk about?', send: 'Continue to WhatsApp', sending: 'Sending...',
              cancel: 'Cancel', err: 'Could not send right now. You can use the contact form or email hi@fakrul.dev instead.',
              msg: (n, p) => `Hi Fakhrul, I'm ${n}. ${p}` },
        id: { title: 'Chat lewat WhatsApp', desc: 'Tinggalin catatan singkat dulu biar saya tahu siapa yang menghubungi. Masuk ke inbox saya saja, nggak ditampilkan di situs.',
              name: 'Nama kamu', purpose: 'Mau ngobrol soal apa?', send: 'Lanjut ke WhatsApp', sending: 'Mengirim...',
              cancel: 'Batal', err: 'Belum bisa terkirim sekarang. Pakai form kontak atau email hi@fakrul.dev saja ya.',
              msg: (n, p) => `Halo Fakhrul, saya ${n}. ${p}` },
    };
    const t = () => (isId() ? T.id : T.en);

    const buttons = document.querySelectorAll('.wa-fixed-btn, .wa-float-btn');
    if (!buttons.length) return;
    buttons.forEach(b => { b.setAttribute('href', '#whatsapp'); b.removeAttribute('target'); });

    const openChat = text => window.open(`https://wa.me/${num()}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    const unlocked = () => { try { return !!localStorage.getItem(KEY); } catch (_) { return false; } };

    let modal = null, openedAt = 0, lastFocus = null;
    function build() {
        const s = t();
        modal = document.createElement('div');
        modal.className = 'wa-gate';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'waGateTitle');
        modal.innerHTML = `
            <div class="wa-gate__card glass-card visible">
                <h3 id="waGateTitle">${s.title}</h3>
                <p class="wa-gate__desc">${s.desc}</p>
                <form class="wa-gate__form" novalidate>
                    <input class="feedback-input" name="name" maxlength="60" required placeholder="${s.name}" autocomplete="name">
                    <input class="feedback-input" name="purpose" maxlength="160" required placeholder="${s.purpose}">
                    <input class="wa-gate__hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <p class="wa-gate__err" role="alert" hidden></p>
                    <div class="wa-gate__actions">
                        <button type="button" class="btn btn-secondary wa-gate__cancel">${s.cancel}</button>
                        <button type="submit" class="btn btn-primary wa-gate__send">${s.send}</button>
                    </div>
                </form>
            </div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', e => { if (e.target === modal) close(); });
        modal.querySelector('.wa-gate__cancel').addEventListener('click', close);
        modal.querySelector('form').addEventListener('submit', submit);
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal && modal.classList.contains('on')) close(); });
    }
    function open() {
        if (!modal) build();
        lastFocus = document.activeElement;
        openedAt = Date.now();
        modal.classList.add('on');
        setTimeout(() => modal.querySelector('input[name="name"]').focus(), 60);
    }
    function close() {
        if (!modal) return;
        modal.classList.remove('on');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    async function submit(e) {
        e.preventDefault();
        const f = e.target, s = t();
        const name = f.name.value.trim(), purpose = f.purpose.value.trim();
        const err = f.querySelector('.wa-gate__err');
        err.hidden = true;
        if (!name || !purpose) { (name ? f.purpose : f.name).focus(); return; }
        if (f._gotcha.value || Date.now() - openedAt < 1500) return;        // bots: filled the hidden field or answered instantly
        const btn = f.querySelector('.wa-gate__send');
        btn.disabled = true; btn.textContent = s.sending;
        try {
            const d = new FormData();
            d.append('_subject', 'WhatsApp request from ' + name);
            d.append('name', name);
            d.append('message', purpose);
            d.append('source', 'whatsapp-gate');
            const res = await fetch(FORM_URL, { method: 'POST', headers: { Accept: 'application/json' }, body: d });
            if (!res.ok) throw new Error('bad status');
            try { localStorage.setItem(KEY, JSON.stringify({ name, at: Date.now() })); } catch (_) {}
            close();
            openChat(s.msg(name, purpose));
        } catch (_) {
            err.textContent = s.err; err.hidden = false;
        } finally {
            btn.disabled = false; btn.textContent = s.send;
        }
    }

    buttons.forEach(b => b.addEventListener('click', e => {
        e.preventDefault();
        if (unlocked()) {
            let n = '';
            try { n = JSON.parse(localStorage.getItem(KEY)).name || ''; } catch (_) {}
            openChat(isId() ? `Halo Fakhrul${n ? ', saya ' + n : ''}.` : `Hi Fakhrul${n ? ", I'm " + n : ''}.`);
        } else open();
    }));
})();
