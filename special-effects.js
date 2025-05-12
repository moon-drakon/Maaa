

document.addEventListener('DOMContentLoaded', function() {
    
    initSpecialEffects();
});

function initSpecialEffects() {
    
    createSnowflakes();
    
    
    initWaveText();
    
    
    initSparkleCursor();
    
    
    initRippleEffect();
    
    
    addPhotoFrameEffect();
    
    
    addRevealEffect();

    
    add3DTextEffect();
}


function createSnowflakes() {
    const container = document.createElement('div');
    container.className = 'snowflakes';
    document.body.appendChild(container);
    
    
    for (let i = 0; i < 30; i++) {
        createSnowflake(container);
    }
    
    
    setInterval(() => {
        createSnowflake(container);
    }, 800); 
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    
    
    let startX;
    if (Math.random() > 0.6) {
        
        startX = Math.random() > 0.5 ? 
            Math.random() * (window.innerWidth * 0.25) : 
            window.innerWidth - (Math.random() * (window.innerWidth * 0.25)); 
    } else {
        
        startX = Math.random() * window.innerWidth;
    }
    
    
    const size = Math.random() * 10 + 4; 
    
    
    const duration = Math.random() * 6 + 5; 
    
    
    const colors = ['#ffcce6', '#ffb3d9', '#ff99cc', '#ff80bf', '#ff66b3'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = 0.3 + (Math.random() * 0.4); 
    
    
    snowflake.style.left = `${startX}px`;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.backgroundColor = color;
    snowflake.style.opacity = opacity;
    snowflake.style.animationDuration = `${duration}s`;
      
    if (Math.random() > 0.6) { 
        
        const emojis = ['❤️', '💖', '💕', '🌸'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        snowflake.innerHTML = randomEmoji;
        snowflake.style.background = 'transparent';
        snowflake.style.fontSize = `${size * 1.8}px`; 
        snowflake.style.display = 'flex';
        snowflake.style.alignItems = 'center';
        snowflake.style.justifyContent = 'center';
        
        
        snowflake.style.filter = 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))';
    }
    
    
    snowflake.addEventListener('animationend', () => {
        if (container.contains(snowflake)) {
            container.removeChild(snowflake);
        }
    });
    
    container.appendChild(snowflake);
}


function initWaveText() {
    const elements = document.querySelectorAll('.wave-text');
    
    elements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        
        Array.from(text).forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.setProperty('--i', index);
            element.appendChild(span);
        });
    });
}


function initSparkleCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'sparkle-cursor';
    document.body.appendChild(cursor);
    
    
    const trail = [];
    const trailLength = 20;
    
    
    for (let i = 0; i < trailLength; i++) {
        trail.push({ x: 0, y: 0, opacity: 0 });
    }
    
    
    document.addEventListener('mousemove', (e) => {
        
        trail.unshift({ x: e.clientX, y: e.clientY, opacity: 1 });
        
        
        if (trail.length > trailLength) {
            trail.pop();
        }
        
        
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.opacity = '1';
        
        
        for (let i = 1; i < trail.length; i++) {
            const trailPoint = trail[i];
            trailPoint.opacity = 1 - (i / trailLength);
            
            
            let trailElement = document.getElementById(`trail-${i}`);
            
            if (!trailElement) {
                trailElement = document.createElement('div');
                trailElement.id = `trail-${i}`;
                trailElement.className = 'sparkle-cursor';
                document.body.appendChild(trailElement);
            }
            
            
            trailElement.style.left = `${trailPoint.x}px`;
            trailElement.style.top = `${trailPoint.y}px`;
            trailElement.style.opacity = `${trailPoint.opacity}`;
            trailElement.style.width = `${20 - (i * 0.8)}px`;
            trailElement.style.height = `${20 - (i * 0.8)}px`;
        }
    });
    
    
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
        
        
        for (let i = 1; i < trailLength; i++) {
            const trailElement = document.getElementById(`trail-${i}`);
            if (trailElement) {
                trailElement.style.opacity = '0';
            }
        }
    });
}


function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .cta-button, .nav-button, .back-button, .special-button');
    
    buttons.forEach(button => {
        button.classList.add('ripple');
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            
            const ripples = this.querySelectorAll('.ripple-effect');
            ripples.forEach(ripple => {
                ripple.remove();
            });
            
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.top = `${y}px`;
            ripple.style.left = `${x}px`;
            
            
            this.appendChild(ripple);
            
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}


function addPhotoFrameEffect() {
    
    const images = document.querySelectorAll('.gallery-section img, .mother-child-photo img');
    
    
    images.forEach(img => {
        const parent = img.parentElement;
        parent.classList.add('photo-frame', 'magnify');
    });
}


function addRevealEffect() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('reveal-effect');
    });
    
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    
    sections.forEach(section => {
        observer.observe(section);
    });
}


function add3DTextEffect() {
    const titles = document.querySelectorAll('.section-title, .main-title');
    
    titles.forEach(title => {
        title.classList.add('text-3d');
    });
}
