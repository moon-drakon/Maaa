// Special visual effects for Mother's Day website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all special effects
    initSpecialEffects();
});

function initSpecialEffects() {
    // Create snowflake effect
    createSnowflakes();
    
    // Initialize wave text effect
    initWaveText();
    
    // Add sparkle cursor effect
    initSparkleCursor();
    
    // Add ripple effect to buttons
    initRippleEffect();
    
    // Add photo frame effect to images
    addPhotoFrameEffect();
    
    // Add reveal effect to sections
    addRevealEffect();

    // Add 3D text effect
    add3DTextEffect();
}

// Create snowflake effect - gentle floating hearts and flowers
function createSnowflakes() {
    const container = document.createElement('div');
    container.className = 'snowflakes';
    document.body.appendChild(container);
    
    // Create 30 snowflakes - balanced for visual impact without overwhelming content
    for (let i = 0; i < 30; i++) {
        createSnowflake(container);
    }
    
    // Continue adding snowflakes at a moderate pace
    setInterval(() => {
        createSnowflake(container);
    }, 800); // Moderate pace to ensure content visibility
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Set random position - keep more to the sides to avoid text
    // This creates more concentration of elements at the edges, less in the center where content is
    let startX;
    if (Math.random() > 0.6) {
        // More to the sides (40% of the time)
        startX = Math.random() > 0.5 ? 
            Math.random() * (window.innerWidth * 0.25) : // Left 25%
            window.innerWidth - (Math.random() * (window.innerWidth * 0.25)); // Right 25%
    } else {
        // Sometimes still in the middle
        startX = Math.random() * window.innerWidth;
    }
    
    // Set random size - smaller for better content visibility
    const size = Math.random() * 10 + 4; // Moderate size
    
    // Set random duration with moderate variance
    const duration = Math.random() * 6 + 5; // Slower, more gentle
    
    // Set random color with semi-transparent options for text visibility
    const colors = ['#ffcce6', '#ffb3d9', '#ff99cc', '#ff80bf', '#ff66b3'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = 0.3 + (Math.random() * 0.4); // 30-70% opacity
    
    // Apply styles
    snowflake.style.left = `${startX}px`;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.backgroundColor = color;
    snowflake.style.opacity = opacity;
    snowflake.style.animationDuration = `${duration}s`;
      // Use heart and flower emojis occasionally, but with translucent effect
    if (Math.random() > 0.6) { // 40% chance of emoji
        // Selection of love emojis - fewer types for consistency
        const emojis = ['❤️', '💖', '💕', '🌸'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        snowflake.innerHTML = randomEmoji;
        snowflake.style.background = 'transparent';
        snowflake.style.fontSize = `${size * 1.8}px`; // Smaller emoji for better content visibility
        snowflake.style.display = 'flex';
        snowflake.style.alignItems = 'center';
        snowflake.style.justifyContent = 'center';
        
        // Subtle glow effect to prevent interference with text
        snowflake.style.filter = 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))';
    }
    
    // Remove after animation
    snowflake.addEventListener('animationend', () => {
        if (container.contains(snowflake)) {
            container.removeChild(snowflake);
        }
    });
    
    container.appendChild(snowflake);
}

// Initialize wave text effect
function initWaveText() {
    const elements = document.querySelectorAll('.wave-text');
    
    elements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        // Create span for each character with delay
        Array.from(text).forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.setProperty('--i', index);
            element.appendChild(span);
        });
    });
}

// Initialize sparkle cursor effect
function initSparkleCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'sparkle-cursor';
    document.body.appendChild(cursor);
    
    // Create sparkle trail array
    const trail = [];
    const trailLength = 20;
    
    // Fill trail with initial positions
    for (let i = 0; i < trailLength; i++) {
        trail.push({ x: 0, y: 0, opacity: 0 });
    }
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        // Add new position to beginning of trail
        trail.unshift({ x: e.clientX, y: e.clientY, opacity: 1 });
        
        // Remove last position
        if (trail.length > trailLength) {
            trail.pop();
        }
        
        // Update cursor position
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.opacity = '1';
        
        // Create trail effect
        for (let i = 1; i < trail.length; i++) {
            const trailPoint = trail[i];
            trailPoint.opacity = 1 - (i / trailLength);
            
            // Create or update trail element
            let trailElement = document.getElementById(`trail-${i}`);
            
            if (!trailElement) {
                trailElement = document.createElement('div');
                trailElement.id = `trail-${i}`;
                trailElement.className = 'sparkle-cursor';
                document.body.appendChild(trailElement);
            }
            
            // Update trail element
            trailElement.style.left = `${trailPoint.x}px`;
            trailElement.style.top = `${trailPoint.y}px`;
            trailElement.style.opacity = `${trailPoint.opacity}`;
            trailElement.style.width = `${20 - (i * 0.8)}px`;
            trailElement.style.height = `${20 - (i * 0.8)}px`;
        }
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
        
        // Hide trail
        for (let i = 1; i < trailLength; i++) {
            const trailElement = document.getElementById(`trail-${i}`);
            if (trailElement) {
                trailElement.style.opacity = '0';
            }
        }
    });
}

// Initialize ripple effect on buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .cta-button, .nav-button, .back-button, .special-button');
    
    buttons.forEach(button => {
        button.classList.add('ripple');
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Remove existing ripple
            const ripples = this.querySelectorAll('.ripple-effect');
            ripples.forEach(ripple => {
                ripple.remove();
            });
            
            // Create new ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.top = `${y}px`;
            ripple.style.left = `${x}px`;
            
            // Add to button
            this.appendChild(ripple);
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add photo frame effect to images
function addPhotoFrameEffect() {
    // Find all images in the gallery
    const images = document.querySelectorAll('.gallery-section img, .mother-child-photo img');
    
    // Apply frame effect
    images.forEach(img => {
        const parent = img.parentElement;
        parent.classList.add('photo-frame', 'magnify');
    });
}

// Add reveal effect to sections
function addRevealEffect() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('reveal-effect');
    });
    
    // Create observer for reveal on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add 3D text effect to titles
function add3DTextEffect() {
    const titles = document.querySelectorAll('.section-title, .main-title');
    
    titles.forEach(title => {
        title.classList.add('text-3d');
    });
}
