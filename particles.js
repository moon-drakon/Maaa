document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.dedication-page')) {
        createParticleBackground();
    }
});

function createParticleBackground() {
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
    
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 1;
    
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    
    const opacity = Math.random() * 0.5 + 0.1;
    
    const duration = Math.random() * 20 + 10;
    
    const delay = Math.random() * 5;
    
    const colors = ['#ff70a6', '#9370db', '#ffffff', '#ffd700'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.left = `${xPos}%`;
    particle.style.top = `${yPos}%`;
    particle.style.opacity = opacity.toString();
    
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
    
    container.appendChild(particle);
}

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
