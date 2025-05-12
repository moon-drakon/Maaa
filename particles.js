// Particle background effect
document.addEventListener('DOMContentLoaded', function() {
    // If on dedication page, create particles
    if (document.querySelector('.dedication-page')) {
        createParticleBackground();
    }
});

function createParticleBackground() {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-background';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.zIndex = '-2';
    particleContainer.style.pointerEvents = 'none';
    document.body.appendChild(particleContainer);
    
    // Create particles
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random() * 5 + 1;
    
    // Random position
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    
    // Random animation delay
    const delay = Math.random() * 5;
    
    // Random color
    const colors = ['#ff70a6', '#9370db', '#ffffff', '#ffd700'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Set particle styles
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.left = `${xPos}%`;
    particle.style.top = `${yPos}%`;
    particle.style.opacity = opacity.toString();
    
    // Add glow effect
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    // Add floating animation
    particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
    
    // Add particle to container
    container.appendChild(particle);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
@keyframes floatParticle {
    0%, 100% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(50px, -30px);
    }
    50% {
        transform: translate(100px, 0);
    }
    75% {
        transform: translate(50px, 30px);
    }
}
`;
document.head.appendChild(style);
