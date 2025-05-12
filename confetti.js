// Confetti animation script
document.addEventListener('DOMContentLoaded', function() {
    // Run confetti when page is fully loaded
    setTimeout(() => {
        startConfetti();
    }, 6500); // Start after text animation finishes
});

// Confetti settings
const confettiSettings = {
    maxCount: 150,      // Max confetti count
    speed: 3,           // How fast they fall
    frameInterval: 15,  // Animation frame rate
    alpha: 1.0,         // Alpha transparency
    gradient: false     // Use gradients for color
};

// Colors for the confetti
const colors = [
    [255, 112, 166], // pink
    [147, 112, 219], // purple
    [255, 215, 0],   // gold
    [255, 255, 255]  // white
];

// Setup canvas for confetti
let W = window.innerWidth;
let H = window.innerHeight;
let canvas, context, particles = [];
let angle = 0;
let tiltAngle = 0;
let confettiActive = false;
let animationTimer = null;

function setupCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    canvas.width = W;
    canvas.height = H;
    document.body.appendChild(canvas);
    
    context = canvas.getContext('2d');
}

function startConfetti() {
    setupCanvas();
    confettiActive = true;
    particles = [];
    
    // Create particles
    for (let i = 0; i < confettiSettings.maxCount; i++) {
        particles.push({
            color: colors[Math.floor(Math.random() * colors.length)],
            x: Math.random() * W,
            y: Math.random() * H - H,
            r: randomFromTo(5, 15),    // Size
            d: Math.random() * confettiSettings.maxCount,  // Density
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }
    
    // Start the animation
    if (animationTimer === null) {
        animationTimer = setInterval(drawConfetti, confettiSettings.frameInterval);
    }
    
    // Stop confetti after 8 seconds
    setTimeout(stopConfetti, 8000);
}

function drawConfetti() {
    context.clearRect(0, 0, W, H);
    
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        context.beginPath();
        context.lineWidth = p.r / 2;
        context.strokeStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${confettiSettings.alpha})`;
        context.moveTo(p.x + p.tilt + p.r / 4, p.y);
        context.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        context.stroke();
        
        updateConfettiParticle(p);
    }
}

function updateConfettiParticle(p) {
    p.tiltAngle += p.tiltAngleIncremental;
    p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) / 2 * confettiSettings.speed;
    p.x += Math.sin(angle) * 2;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    
    // If particle goes off the bottom of the screen, move it back to the top
    if (p.y > H) {
        if (confettiActive) {
            p.x = Math.random() * W;
            p.y = -10;
            p.tilt = Math.floor(Math.random() * 10) - 20;
        } else {
            particles.splice(particles.indexOf(p), 1);
        }
    }
}

function stopConfetti() {
    confettiActive = false;
    
    // Allow particles to fall off the screen
    setTimeout(() => {
        clearInterval(animationTimer);
        animationTimer = null;
        
        // Remove canvas
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
            canvas = null;
        }
    }, 3000);
}

// Helper function
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (canvas) {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    }
});
