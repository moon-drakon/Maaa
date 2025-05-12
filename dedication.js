document.addEventListener('DOMContentLoaded', function() {
    createFloatingSymbols();
    addTiltEffect();
    setupTextReplay();
});

function createFloatingSymbols() {
    const elementsContainer = document.querySelector('.floating-elements');
    if (!elementsContainer) return;
    
    const symbolTypes = ['plane', 'clock', 'compass', 'letter'];
    const colors = ['rgba(255,255,255,0.7)', 'rgba(255,112,166,0.5)', 'rgba(147,112,219,0.5)'];
    
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-symbol');
        const size = Math.random() * 30 + 20;
        const left = Math.random() * 90 + 5;
        const top = Math.random() * 90 + 5;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;        const type = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        element.style.position = 'absolute';
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.opacity = '0.5';
        element.style.backgroundSize = 'contain';
        element.style.backgroundRepeat = 'no-repeat';
        element.style.backgroundPosition = 'center';
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        if (type === 'plane') {
            element.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http:
        } else if (type === 'clock') {
            element.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http:
        } else if (type === 'compass') {
            element.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http:
        } else {
            element.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http:
        }
        
        elementsContainer.appendChild(element);
    }
}

function addTiltEffect() {
    const frame = document.querySelector('.dedication-frame');
    if (!frame) return;
    
    frame.addEventListener('mousemove', (e) => {
        const rect = frame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = -((y - centerY) / centerY) * 5;
        
        frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    frame.addEventListener('mouseleave', () => {
        frame.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

function setupTextReplay() {
    const message = document.querySelector('.promise-message');
    if (!message) return;
    
    message.addEventListener('click', () => {
        if (typeof replayTypewriterEffect === 'function') {
            replayTypewriterEffect();
        }
    });
}
