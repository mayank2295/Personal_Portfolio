/* ===== NAVIGATION ===== */

// Mobile menu toggle
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul') || document.querySelector('nav .nav-links');
    hamburger.classList.toggle('active');
    navUl.classList.toggle('active');
}

// Make toggleMenu available globally
window.toggleMenu = toggleMenu;

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Magnetic navigation links
document.querySelectorAll('.nav-link, .social-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    const navUl = document.querySelector('nav ul') || document.querySelector('nav .nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navUl && navUl.classList.contains('active') && 
        !navUl.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navUl.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navUl = document.querySelector('nav ul') || document.querySelector('nav .nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navUl && navUl.classList.contains('active')) {
            navUl.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});
