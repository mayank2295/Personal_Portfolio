/* ===== CUSTOM CURSOR ===== */

const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
document.querySelectorAll("a, button, .btn, .project-card, .exp-card, .cert-card, .skill-item").forEach((el) => {
    el.addEventListener("mouseenter", () => {
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.style.background = "rgba(168, 85, 247, 0.5)";
        cursorFollower.style.width = "50px";
        cursorFollower.style.height = "50px";
        cursorFollower.style.borderColor = "var(--accent-primary)";
        cursorFollower.style.borderWidth = "3px";
        cursorFollower.style.backdropFilter = "blur(2px)";
    });
    el.addEventListener("mouseleave", () => {
        cursor.style.width = "10px";
        cursor.style.height = "10px";
        cursor.style.background = "var(--accent-primary)";
        cursorFollower.style.width = "35px";
        cursorFollower.style.height = "35px";
        cursorFollower.style.borderColor = "rgba(168, 85, 247, 0.5)";
        cursorFollower.style.borderWidth = "2px";
        cursorFollower.style.backdropFilter = "blur(5px)";
    });
});

// Sparkle effect on click
document.addEventListener("click", (e) => {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Cursor trail effect
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 25) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = (e.clientX - 5) + 'px';
        trail.style.top = (e.clientY - 5) + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0.2)';
        }, 10);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
        
        lastTrailTime = now;
    }
});

// Ripple click effect
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - 50) + 'px';
    ripple.style.top = (e.clientY - 50) + 'px';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});
