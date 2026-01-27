/* ===== ANIMATIONS & EFFECTS ===== */

// Initialize reveal & tilt
document.querySelectorAll('.project-card, .education-content, .achievement-card, .skill-card, .experience-card, .cert-card, .timeline-item').forEach(el => {
    el.classList.add('reveal');
    if (el.classList.contains('project-card') || el.classList.contains('skill-card') || el.classList.contains('achievement-card') || el.classList.contains('timeline-item')) {
         el.classList.add('tilt-card');
         
         if (!el.querySelector('.card-glare')) {
             const glare = document.createElement('div');
             glare.className = 'card-glare';
             el.appendChild(glare);
         }
    }
});

// Staggered text reveal
document.querySelectorAll('.education-content h3').forEach(title => {
    const text = title.textContent.trim();
    title.textContent = '';
    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char-reveal';
        span.style.transitionDelay = `${index * 30}ms`;
        title.appendChild(span);
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.char-reveal').forEach(char => char.classList.add('visible'));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(title);
});

// 3D tilt effect with glare
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        const glare = card.querySelector('.card-glare');
        if (glare) {
            glare.style.left = x + 'px';
            glare.style.top = y + 'px';
            glare.style.opacity = '1';
        }

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
        const glare = card.querySelector('.card-glare');
        if (glare) {
            glare.style.opacity = '0';
        }
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.zIndex = '1';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
             card.style.transition = '';
        }, 500);
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// Magnetic button effect
document.querySelectorAll(".magnetic-wrap, .btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
    });
});

// Enhanced magnetic effect
document.querySelectorAll('.btn, .social-link, .project-link').forEach(el => {
    el.classList.add('magnetic');
    
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

// Parallax effect on hero
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    document.querySelector('.hero-content').style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Interactive skills
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('click', () => {
        skill.style.animation = 'none';
        setTimeout(() => {
            skill.style.animation = '';
        }, 10);
    });
});

// Counter animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    entry.target.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target + '+';
                }
            };
            updateCounter();
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Staggered animation for cards
const staggerItems = document.querySelectorAll('.stagger-item');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 150);
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

staggerItems.forEach(item => staggerObserver.observe(item));

// Random floating shape movement
document.querySelectorAll('.shape').forEach((shape, i) => {
    shape.style.animationDuration = (15 + Math.random() * 10) + 's';
    shape.style.animationDelay = (-Math.random() * 20) + 's';
});
