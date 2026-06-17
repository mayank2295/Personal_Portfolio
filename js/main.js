/* =====================================================================
   MAIN — Lenis smooth scroll + GSAP scroll motion
   ===================================================================== */
(function () {
    'use strict';

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGSAP = typeof window.gsap !== 'undefined';
    const hasST = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
    const hasLenis = typeof window.Lenis !== 'undefined';

    if (hasST) gsap.registerPlugin(ScrollTrigger);

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Safety: if GSAP failed to load, reveal everything ---------- */
    function revealAllStatic() {
        document.querySelectorAll('[data-reveal]').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
    if (!hasGSAP || reduce) revealAllStatic();

    /* ---------- LENIS SMOOTH SCROLL ---------- */
    let lenis = null;
    if (hasLenis && !reduce) {
        lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.6,
        });

        if (hasST) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
            requestAnimationFrame(raf);
        }
    }

    // Anchor links → Lenis (or native fallback)
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            closeMenu();
            if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.3 });
            else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        });
    });

    /* ---------- NAV ---------- */
    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const scrollBar = document.getElementById('scrollBar');

    function closeMenu() {
        if (!navLinks) return;
        navLinks.classList.remove('open');
        if (menuBtn) {
            menuBtn.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
        }
    }
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            menuBtn.classList.toggle('open', open);
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });
    }
    // Close the mobile menu on Escape
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

    function onScroll() {
        const y = window.scrollY || document.documentElement.scrollTop;
        if (nav) nav.classList.toggle('shrink', y > 60);
        if (scrollBar) {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            scrollBar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
        }
    }
    if (lenis) lenis.on('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- MARQUEE (seamless loop) ---------- */
    const marquee = document.getElementById('marquee');
    if (marquee && hasGSAP && !reduce) {
        marquee.innerHTML += marquee.innerHTML; // duplicate for seamless loop
        const total = marquee.scrollWidth / 2;
        gsap.to(marquee, {
            x: -total,
            duration: 22,
            ease: 'none',
            repeat: -1,
            modifiers: { x: (x) => (parseFloat(x) % total) + 'px' },
        });
    }

    /* ---------- THE BUILD ---------- */
    window.addEventListener('load', () => {
        runLoader();
    });

    function runLoader() {
        const loader = document.getElementById('loader');
        const countEl = document.getElementById('loaderCount');
        const barEl = document.getElementById('loaderBar');

        const finish = () => {
            if (loader) loader.classList.add('done');
            startReveals();
        };

        // Only show the intro loader once per browser session; never block returning views.
        const seen = sessionStorage.getItem('mg-loaded');
        if (!loader || reduce || !hasGSAP || seen) {
            if (loader) loader.style.display = 'none';
            finish();
            return;
        }
        sessionStorage.setItem('mg-loaded', '1');

        const obj = { v: 0 };
        gsap.to(obj, {
            v: 100,
            duration: 0.8,
            ease: 'power2.inOut',
            onUpdate: () => {
                const val = Math.round(obj.v);
                if (countEl) countEl.textContent = val;
                if (barEl) barEl.style.width = val + '%';
            },
            onComplete: () => {
                gsap.to(loader, { duration: 0.1, onComplete: finish });
            },
        });
    }

    function startReveals() {
        if (!hasGSAP) return;

        // Hero title — word reveal
        const words = document.querySelectorAll('.hero-title .word');
        if (words.length) {
            gsap.set(words, { yPercent: 110 });
            gsap.to(words, {
                yPercent: 0,
                duration: 1.1,
                ease: 'power4.out',
                stagger: 0.08,
                delay: 0.1,
            });
        }

        // Hero meta / actions fade in
        gsap.to('.hero [data-reveal]', {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.5,
        });

        if (!hasST) { revealAllStatic(); return; }

        // Generic fade-up reveals
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
            if (el.closest('.hero')) return; // hero handled above
            gsap.to(el, {
                opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
        });

        // Line / clip-path wipe reveals for big type
        gsap.utils.toArray('[data-reveal-lines]').forEach((el) => {
            gsap.fromTo(el,
                { clipPath: 'inset(0 0 100% 0)', y: 30 },
                {
                    clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, ease: 'power4.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                }
            );
        });

        // Counters
        gsap.utils.toArray('[data-count]').forEach((el) => {
            const target = parseFloat(el.getAttribute('data-count'));
            const o = { v: 0 };
            ScrollTrigger.create({
                trigger: el, start: 'top 90%', once: true,
                onEnter: () => gsap.to(o, {
                    v: target, duration: 1.6, ease: 'power2.out',
                    onUpdate: () => { el.textContent = Math.round(o.v); },
                }),
            });
        });

        // Subtle parallax on section indices
        gsap.utils.toArray('.section-index').forEach((el) => {
            gsap.to(el, {
                y: -20, ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            });
        });

        ScrollTrigger.refresh();
    }
})();
