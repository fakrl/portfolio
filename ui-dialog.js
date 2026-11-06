/* Small popup helper that replaces native alert(): UIDialog.alert(msg) and
   UIDialog.confirm({ title, message, preview: [{label, value}], ok, cancel }) -> Promise<boolean>.
   Reuses the .wa-gate modal styles from components.css. All text is inserted with textContent. */
(function () {
    const isId = () => { try { return localStorage.getItem('lang') === 'id'; } catch (_) { return false; } };
    const L = () => (isId() ? { ok: 'OK', cancel: 'Batal', notice: 'Info' } : { ok: 'OK', cancel: 'Cancel', notice: 'Notice' });

    function show(opts) {
        return new Promise(resolve => {
            const last = document.activeElement;
            const root = document.createElement('div');
            root.className = 'wa-gate on';
            root.setAttribute('role', 'dialog');
            root.setAttribute('aria-modal', 'true');
            const card = document.createElement('div');
            card.className = 'wa-gate__card glass-card visible';
            const h = document.createElement('h3');
            h.textContent = opts.title;
            card.appendChild(h);
            if (opts.message) {
                const p = document.createElement('p');
                p.className = 'wa-gate__desc';
                p.textContent = opts.message;
                card.appendChild(p);
            }
            if (opts.preview && opts.preview.length) {
                const box = document.createElement('div');
                box.className = 'ui-preview';
                opts.preview.filter(r => r.value).forEach(r => {
                    const row = document.createElement('div');
                    const k = document.createElement('span');
                    k.className = 'ui-preview__k';
                    k.textContent = r.label;
                    const v = document.createElement('p');
                    v.className = 'ui-preview__v';
                    v.textContent = r.value;
                    row.append(k, v);
                    box.appendChild(row);
                });
                card.appendChild(box);
            }
            const actions = document.createElement('div');
            actions.className = 'wa-gate__actions';
            const done = value => {
                document.removeEventListener('keydown', onKey, true);
                root.remove();
                if (last && last.focus) last.focus();
                resolve(value);
            };
            if (opts.cancel) {
                const c = document.createElement('button');
                c.type = 'button'; c.className = 'btn btn-secondary'; c.textContent = opts.cancel;
                c.addEventListener('click', () => done(false));
                actions.appendChild(c);
            }
            const ok = document.createElement('button');
            ok.type = 'button'; ok.className = 'btn btn-primary'; ok.textContent = opts.ok;
            ok.addEventListener('click', () => done(true));
            actions.appendChild(ok);
            card.appendChild(actions);
            root.appendChild(card);
            const onKey = e => {
                if (e.key === 'Escape') { e.stopPropagation(); done(false); }
            };
            document.addEventListener('keydown', onKey, true);
            root.addEventListener('click', e => { if (e.target === root) done(false); });
            document.body.appendChild(root);
            ok.focus();
        });
    }

    window.UIDialog = {
        alert(message, title) {
            const s = L();
            return show({ title: title || s.notice, message, ok: s.ok });
        },
        confirm(o) {
            const s = L();
            return show({ title: o.title, message: o.message, preview: o.preview, ok: o.ok || s.ok, cancel: o.cancel || s.cancel });
        },
    };
})();
