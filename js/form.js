/* ===== CONTACT FORM + EMAIL COPY ===== */
window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.querySelectorAll('.form-control').forEach((input) => {
            input.addEventListener('blur', function () {
                if (this.value.trim() && !this.checkValidity()) this.classList.add('invalid');
                else this.classList.remove('invalid');
            });
            input.addEventListener('input', function () {
                if (this.classList.contains('invalid') && this.checkValidity()) this.classList.remove('invalid');
            });
        });

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const original = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending…</span>';
            formMessage.textContent = '';
            formMessage.className = 'form-message';

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });
                if (res.ok) {
                    formMessage.textContent = 'Message sent — I\'ll get back to you soon.';
                    formMessage.className = 'form-message success';
                    form.reset();
                } else {
                    throw new Error('failed');
                }
            } catch (err) {
                formMessage.textContent = 'Something went wrong. Please email me directly.';
                formMessage.className = 'form-message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = original;
            }
        });
    }

    // Copy email
    const emailEl = document.getElementById('contactEmail');
    const toast = document.getElementById('toast');
    function copyEmail(e) {
        if (e) e.preventDefault();
        const email = 'mayankgupta23081@gmail.com';
        const show = () => {
            if (!toast) return;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        };
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(show).catch(show);
        } else {
            const ta = document.createElement('textarea');
            ta.value = email; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); } catch (_) {}
            document.body.removeChild(ta); show();
        }
    }
    if (emailEl) emailEl.addEventListener('click', copyEmail);
    window.copyEmail = copyEmail;
});
