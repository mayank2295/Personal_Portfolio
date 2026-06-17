/* ===== THEME ===== */
(function () {
    const KEY = 'mg-theme';
    const saved = localStorage.getItem(KEY);
    // Default dark; honour saved choice. (No system sniff — editorial dark is the brand.)
    if (saved === 'light') document.body.classList.add('light-mode');

    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('themeBtn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const light = document.body.classList.toggle('light-mode');
            localStorage.setItem(KEY, light ? 'light' : 'dark');
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', light ? '#f1ede4' : '#0b0b0d');
        });
    });
})();
