/* ===== CUSTOM CURSOR (dot + elastic ring) + MAGNETIC + WORK PREVIEW + TORCH ===== */
(function () {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const label = document.getElementById('cursorLabel');
    if (!dot || !ring) return;

    // Signal CSS that the custom cursor is live (so it's safe to hide the native one).
    document.documentElement.classList.add('has-custom-cursor');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const glow = document.getElementById('cursorGlow');
    const bgFx = document.querySelector('.bg-fx');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my;          // dot — snappy
    let rx = mx, ry = my;          // ring — trails
    let prx = rx, pry = ry;        // previous ring pos (for velocity)
    let gx = mx, gy = my;          // torch glow — slow trail
    let glowOn = false;

    window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        if (glow && !glowOn) { glow.classList.add('on'); glowOn = true; }
    });

    function render() {
        // Dot — fast, precise
        dx += (mx - dx) * 0.4;
        dy += (my - dy) * 0.4;
        dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;

        // Ring — slower trail with velocity-based squash & stretch
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        const vx = rx - prx, vy = ry - pry;
        prx = rx; pry = ry;

        const hovering = ring.classList.contains('is-hover');
        let tf = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        if (!hovering && !reduce) {
            const speed = Math.min(Math.hypot(vx, vy), 70);
            const stretch = speed / 70;                 // 0..1
            const angle = Math.atan2(vy, vx) * 180 / Math.PI;
            const sx = 1 + stretch * 0.6;               // elongate along travel
            const sy = 1 - stretch * 0.4;               // squash across it
            tf += ` rotate(${angle}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
        }
        ring.style.transform = tf;

        if (!reduce) {
            // Torch glow — slow liquid trail
            gx += (mx - gx) * 0.08;
            gy += (my - gy) * 0.08;
            if (glow) glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;

            // Depth parallax on the orb field
            if (bgFx) {
                const ox = (mx / window.innerWidth - 0.5) * -34;
                const oy = (my / window.innerHeight - 0.5) * -34;
                bgFx.style.transform = `translate(${ox}px, ${oy}px)`;
            }
        }
        requestAnimationFrame(render);
    }
    render();

    // Press feedback — ring contracts on click
    window.addEventListener('mousedown', () => ring.classList.add('is-down'));
    window.addEventListener('mouseup', () => ring.classList.remove('is-down'));

    // Hide everything when pointer leaves the window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0'; ring.style.opacity = '0';
        if (glow) { glow.classList.remove('on'); glowOn = false; }
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = ''; ring.style.opacity = '';
        if (glow) { glow.classList.add('on'); glowOn = true; }
    });

    // Hover states on [data-cursor] elements
    document.querySelectorAll('[data-cursor]').forEach((el) => {
        const text = el.getAttribute('data-cursor');
        el.addEventListener('mouseenter', () => {
            ring.classList.add('is-hover');
            dot.classList.add('is-hover');
            if (label) label.textContent = text || '';
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('is-hover');
            dot.classList.remove('is-hover');
            if (label) label.textContent = '';
        });
    });

    // Magnetic effect for buttons / nav mark
    document.querySelectorAll('.submit-btn, .nav-mark, .theme-btn').forEach((el) => {
        const strength = 0.3;
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - (r.left + r.width / 2);
            const y = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    // Work list: image preview follows cursor
    const preview = document.getElementById('workPreview');
    const previewImg = document.getElementById('workPreviewImg');
    const rows = document.querySelectorAll('.work-row');

    if (preview && previewImg) {
        let px = mx, py = my, raf = null;
        function move() {
            px += (mx - px) * 0.12;
            py += (my - py) * 0.12;
            preview.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
            raf = requestAnimationFrame(move);
        }
        rows.forEach((row) => {
            row.addEventListener('mouseenter', () => {
                const src = row.getAttribute('data-img');
                const fallback = row.getAttribute('data-img-fallback');
                if (src) {
                    previewImg.onerror = fallback
                        ? () => { previewImg.onerror = null; previewImg.src = fallback; }
                        : null;
                    previewImg.src = src;
                }
                preview.classList.add('show');
                if (!raf) move();
            });
            row.addEventListener('mouseleave', () => {
                preview.classList.remove('show');
            });
        });
    }
})();
