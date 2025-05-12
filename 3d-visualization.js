document.addEventListener('DOMContentLoaded', function() {
    init3DVisualization();
});

function init3DVisualization() {
    createHolographicEffect();
    enhanceTiltEffect();
    addFloating3DElements();
    
    window.addEventListener('resize', function() {
        updateHolographicEffect();
    });
}

function createHolographicEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    heroSection.classList.add('holographic-scene');
    
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) {
        const title = heroContent.querySelector('.main-title');
        const subtitle = heroContent.querySelector('.subtitle');
        const button = heroContent.querySelector('#scroll-button');
        const image = heroContent.querySelector('.hero-image');
        
        if (title) title.setAttribute('data-depth', '0.2');
        if (subtitle) subtitle.setAttribute('data-depth', '0.4');
        if (button) button.setAttribute('data-depth', '0.6');
        if (image) image.setAttribute('data-depth', '0.1');
        
        setupHolographicMovement(heroSection);
    }
}

function setupHolographicMovement(element) {
    const maxTilt = 10;
    const maxShift = 15;
    
    const initialTransform = window.getComputedStyle(element).transform;
    
    element.addEventListener('mousemove', function(e) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const rotateY = ((mouseX - centerX) / centerX) * maxTilt;
        const rotateX = ((centerY - mouseY) / centerY) * maxTilt;
        
        updateHolographicTransform(element, rotateX, rotateY);
        
        const layers = element.querySelectorAll('[data-depth]');
        layers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute('data-depth'));
            const shiftX = ((mouseX - centerX) / centerX) * maxShift * depth;
            const shiftY = ((mouseY - centerY) / centerY) * maxShift * depth;
            
            layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
        });
    });
    
    element.addEventListener('mouseleave', function() {
        element.style.transform = initialTransform;
        
        const layers = element.querySelectorAll('[data-depth]');
        layers.forEach(layer => {
            layer.style.transform = 'translate3d(0, 0, 0)';
        });
    });
    
    window.addEventListener('deviceorientation', function(e) {
        if (!e.beta || !e.gamma) return;
        
        const rotateX = (e.beta - 90) / 9;
        const rotateY = e.gamma / 9;
        
        updateHolographicTransform(element, rotateX, rotateY);
        
        const layers = element.querySelectorAll('[data-depth]');
        layers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute('data-depth'));
            const shiftX = rotateY * maxShift * depth;
            const shiftY = rotateX * maxShift * depth;
            
            layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
        });
    });
}

function updateHolographicTransform(element, rotateX, rotateY) {
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function updateHolographicEffect() {
    const heroSection = document.querySelector('.holographic-scene');
    if (!heroSection) return;
    
    heroSection.style.transform = 'perspective(1000px)';
    
    const layers = heroSection.querySelectorAll('[data-depth]');
    layers.forEach(layer => {
        layer.style.transform = 'translate3d(0, 0, 0)';
    });
}

function enhanceTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(elem => {
        elem.replaceWith(elem.cloneNode(true));
        
        const newElem = document.querySelector(`#${elem.id}`) || elem;
        
        const reflection = document.createElement('div');
        reflection.className = 'reflection-overlay';
        newElem.appendChild(reflection);
        
        newElem.addEventListener('mousemove', e => {
            const rect = newElem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;
            
            newElem.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale3d(1.03, 1.03, 1.03)
            `;
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            reflection.style.background = `
                radial-gradient(
                    circle at ${percentX}% ${percentY}%, 
                    rgba(255, 255, 255, 0.3) 0%, 
                    rgba(255, 255, 255, 0) 60%
                )
            `;
        });
        
        newElem.addEventListener('mouseleave', () => {
            newElem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            reflection.style.background = 'none';
        });
        
        newElem.style.transition = 'transform 0.1s ease-out';
    });
}

function addFloating3DElements() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        addDecorative3DElements(heroSection, 5);
    }
    
    const letterSection = document.querySelector('.letter-section');
    if (letterSection) {
        addDecorative3DElements(letterSection, 3);
    }
}

function addDecorative3DElements(section, count) {
    const container = document.createElement('div');
    container.className = 'decorative-3d-container';
    
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1';
    
    const shapes = ['heart', 'circle', 'square', 'triangle'];
    
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.className = 'decorative-3d-element';
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        element.classList.add(`shape-${shape}`);
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        
        const size = Math.random() * 40 + 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        const animDuration = Math.random() * 10 + 10;
        element.style.animation = `float ${animDuration}s ease-in-out infinite`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(element);
    }
    
    section.insertBefore(container, section.firstChild);
}
