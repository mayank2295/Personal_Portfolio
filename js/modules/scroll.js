/* ===== SCROLL EFFECTS ===== */

// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if(progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll reveal
const revealOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
setTimeout(revealOnScroll, 100);

// Scroll velocity skew effect
let skewConfig = {
    current: 0,
    target: 0,
    ease: 0.1
};

const skewElements = document.querySelectorAll('.project-card, .skill-card, .achievement-card');

window.addEventListener('scroll', () => {
     skewConfig.target = window.scrollY - (skewConfig.lastScroll || window.scrollY);
     skewConfig.lastScroll = window.scrollY;
});

function animateSkew() {
    skewConfig.current += (skewConfig.target - skewConfig.current) * skewConfig.ease;
    skewConfig.target *= 0.9;
    
    if (Math.abs(skewConfig.current) > 0.1) {
        const skewVal = Math.min(Math.max(skewConfig.current * 0.1, -5), 5);
        skewElements.forEach(el => {
             if (!el.matches(':hover')) {
                el.style.transform = `skewY(${skewVal}deg)`;
             }
        });
    } else {
        skewElements.forEach(el => {
             if (!el.matches(':hover') && el.style.transform.includes('skew')) {
                el.style.transform = 'skewY(0deg)';
             }
        });
    }
    requestAnimationFrame(animateSkew);
}
animateSkew();
