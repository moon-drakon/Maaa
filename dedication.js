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
        const duration = Math.random() * 10 + 10;
        const type = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
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
            element.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(color)}"><path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z"/></svg>')`;
        } else if (type === 'clock') {
            element.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(color)}"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/></svg>')`;
        } else if (type === 'compass') {
            element.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(color)}"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,10.9L9.39,13.5L12,16.1L14.61,13.5L12,10.9Z"/></svg>')`;
        } else {
            element.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(color)}"><path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6"/></svg>')`;
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
