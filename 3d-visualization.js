// 3D Visualization Effects for Mother's Day Website

document.addEventListener('DOMContentLoaded', function() {
    init3DVisualization();
});

function init3DVisualization() {
    // Create 3D Transform Scene
    createHolographicEffect();
    
    // Add interactive 3D photo tilt
    enhanceTiltEffect();
    
    // Add floating 3D elements
    addFloating3DElements();
    
    // Handle resize events
    window.addEventListener('resize', function() {
        updateHolographicEffect();
    });
}

// Create holographic-style 3D effect for hero section
function createHolographicEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Add holographic class
    heroSection.classList.add('holographic-scene');
    
    // Create parallax layers for depth
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) {
        // Add depth classes to elements for layering
        const title = heroContent.querySelector('.main-title');
        const subtitle = heroContent.querySelector('.subtitle');
        const button = heroContent.querySelector('#scroll-button');
        const image = heroContent.querySelector('.hero-image');
        
        if (title) title.setAttribute('data-depth', '0.2');
        if (subtitle) subtitle.setAttribute('data-depth', '0.4');
        if (button) button.setAttribute('data-depth', '0.6');
        if (image) image.setAttribute('data-depth', '0.1');
        
        // Setup holographic effect
        setupHolographicMovement(heroSection);
    }
}

// Setup movement tracking for holographic effect
function setupHolographicMovement(element) {
    const maxTilt = 10; // max degrees of rotation
    const maxShift = 15; // max pixels of shift
    
    // Store initial transform
    const initialTransform = window.getComputedStyle(element).transform;
    
    // Add mouse move listener for desktop
    element.addEventListener('mousemove', function(e) {
        // Calculate mouse position relative to element center
        const rect = element.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate rotation and shift based on mouse position
        const rotateY = ((mouseX - centerX) / centerX) * maxTilt;
        const rotateX = ((centerY - mouseY) / centerY) * maxTilt;
        
        updateHolographicTransform(element, rotateX, rotateY);
        
        // Update layers with parallax effect
        const layers = element.querySelectorAll('[data-depth]');
        layers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute('data-depth'));
            const shiftX = ((mouseX - centerX) / centerX) * maxShift * depth;
            const shiftY = ((mouseY - centerY) / centerY) * maxShift * depth;
            
            layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
        });
    });
    
    // Reset on mouse leave
    element.addEventListener('mouseleave', function() {
        // Reset main element
        element.style.transform = initialTransform;
        
        // Reset layers
        const layers = element.querySelectorAll('[data-depth]');
        layers.forEach(layer => {
            layer.style.transform = 'translate3d(0, 0, 0)';
        });
    });
    
    // Add device orientation listener for mobile
    window.addEventListener('deviceorientation', function(e) {
        if (!e.beta || !e.gamma) return;
        
        // Calculate rotation based on device orientation
        const rotateX = (e.beta - 90) / 9; // -10 to 10 degrees
        const rotateY = e.gamma / 9; // -10 to 10 degrees
        
        updateHolographicTransform(element, rotateX, rotateY);
        
        // Update layers with parallax effect
        const layers = element.querySelectorAll('[data-depth]');
        layers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute('data-depth'));
            const shiftX = rotateY * maxShift * depth;
            const shiftY = rotateX * maxShift * depth;
            
            layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
        });
    });
}

// Update holographic transform based on rotation values
function updateHolographicTransform(element, rotateX, rotateY) {
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// Update holographic effect on resize
function updateHolographicEffect() {
    const heroSection = document.querySelector('.holographic-scene');
    if (!heroSection) return;
    
    // Reset transforms
    heroSection.style.transform = 'perspective(1000px)';
    
    const layers = heroSection.querySelectorAll('[data-depth]');
    layers.forEach(layer => {
        layer.style.transform = 'translate3d(0, 0, 0)';
    });
}

// Enhance tilt effect for photos
function enhanceTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(elem => {
        // Remove existing event listeners
        elem.replaceWith(elem.cloneNode(true));
        
        // Get new reference
        const newElem = document.querySelector(`#${elem.id}`) || elem;
        
        // Add reflective surface effect
        const reflection = document.createElement('div');
        reflection.className = 'reflection-overlay';
        newElem.appendChild(reflection);
        
        // Add 3D tilt effect with reflections
        newElem.addEventListener('mousemove', e => {
            const rect = newElem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation - more subtle than before
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;
            
            // Apply transforms
            newElem.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale3d(1.03, 1.03, 1.03)
            `;
            
            // Update reflection
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
        
        // Reset on mouse leave
        newElem.addEventListener('mouseleave', () => {
            newElem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            reflection.style.background = 'none';
        });
        
        // Add smooth transition
        newElem.style.transition = 'transform 0.1s ease-out';
    });
}

// Add floating 3D elements
function addFloating3DElements() {
    // Create decorative elements for the hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        addDecorative3DElements(heroSection, 5);
    }
    
    // Add to letter section
    const letterSection = document.querySelector('.letter-section');
    if (letterSection) {
        addDecorative3DElements(letterSection, 3);
    }
}

// Add decorative 3D elements to a section
function addDecorative3DElements(section, count) {
    // Create container for 3D elements
    const container = document.createElement('div');
    container.className = 'decorative-3d-container';
    
    // Set container styles
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1';
    
    // Add elements
    const shapes = ['heart', 'circle', 'square', 'triangle'];
    
    for (let i = 0; i < count; i++) {
        // Create element
        const element = document.createElement('div');
        element.className = 'decorative-3d-element';
        
        // Random shape
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        element.classList.add(`shape-${shape}`);
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        
        // Random size
        const size = Math.random() * 40 + 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random animation
        const animDuration = Math.random() * 10 + 10;
        element.style.animation = `float ${animDuration}s ease-in-out infinite`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add to container
        container.appendChild(element);
    }
    
    // Insert container at the beginning of section
    section.insertBefore(container, section.firstChild);
}
