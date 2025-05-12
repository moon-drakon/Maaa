document.addEventListener('DOMContentLoaded', function() {
    initAdvancedEffects();
});

function initAdvancedEffects() {
    createAnimatedBackground();
    initSpotlightEffect();
    createRandomHearts();
    setupPageTransitions();
    setupParallaxEffect();
    init3DTiltEffect();
}

function createAnimatedBackground() {
    const bg = document.createElement('div');
    bg.className = 'animated-bg';
    document.body.prepend(bg);
}

function initSpotlightEffect() {
    const containers = document.querySelectorAll('.spotlight-container');
    
    containers.forEach(container => {
        const spotlight = document.createElement('div');
        spotlight.className = 'spotlight';
        container.appendChild(spotlight);
        
        container.addEventListener('mouseenter', () => {
            spotlight.style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, transparent 50%)`;
        });
    });
}

function createRandomHearts() {
    const container = document.body;
    
    for (let i = 0; i < 15; i++) {
        createPulsingHeart(container);
    }
    
    setInterval(() => {
        createPulsingHeart(container);
    }, 3000);
}

function createPulsingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'pulsing-heart';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    const size = Math.random() * 20 + 15;
    
    const colors = ['#ff70a6', '#ff9ebc', '#b19cd9', '#9370db'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    heart.innerHTML = '<svg viewBox="0 0 512 512" width="100%" height="100%"><path fill="' + color + '" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>';
    
    heart.style.left = `${x}%`;
    heart.style.top = `${y}%`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    heart.addEventListener('animationend', () => {
        if (container.contains(heart)) {
            container.removeChild(heart);
        }
    });
    
    container.appendChild(heart);
}

function setupPageTransitions() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    const internalLinks = document.querySelectorAll('a[href^="index"], a[href^="gallery"], a[href^="dedication"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            transition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = target;
            }, 600);
        });
    });
}

function setupParallaxEffect() {
    if (document.querySelector('.parallax-container')) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxBg = document.querySelector('.parallax-bg');
            
            if (parallaxBg) {
                parallaxBg.style.transform = `translateZ(-1px) scale(2) translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

function init3DTiltEffect() {
    const elements = document.querySelectorAll('.tilt-effect');
    
    elements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            elem.style.transition = 'transform 0.1s ease';
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            elem.style.transition = 'transform 0.3s ease';
        });
    });
}

function createFloatingGallery(container, images) {
    if (!container) return;
    
    const gallery = document.createElement('div');
    gallery.className = 'floating-gallery';
    
    images.forEach(img => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'floating-photo tilt-effect';
        
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt || 'Gallery Photo';
        
        photoDiv.appendChild(imgElement);
        gallery.appendChild(photoDiv);
        
        photoDiv.addEventListener('click', () => {
            createFullscreenView(img.src);
        });
    });
    
    container.appendChild(gallery);
}

function createFullscreenView(imgSrc) {
    const fullscreen = document.createElement('div');
    fullscreen.className = 'fullscreen-view';
    
    fullscreen.style.position = 'fixed';
    fullscreen.style.top = '0';
    fullscreen.style.left = '0';
    fullscreen.style.width = '100%';
    fullscreen.style.height = '100%';
    fullscreen.style.backgroundColor = 'rgba(0,0,0,0.9)';
    fullscreen.style.display = 'flex';
    fullscreen.style.alignItems = 'center';
    fullscreen.style.justifyContent = 'center';
    fullscreen.style.zIndex = '10000';
    fullscreen.style.cursor = 'pointer';
    fullscreen.style.opacity = '0';
    fullscreen.style.transition = 'opacity 0.3s ease';
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.boxShadow = '0 0 20px rgba(255,255,255,0.5)';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'transform 0.3s ease';
    
    fullscreen.appendChild(img);
    document.body.appendChild(fullscreen);
    
    setTimeout(() => {
        fullscreen.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);
    
    fullscreen.addEventListener('click', () => {
        fullscreen.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(fullscreen);
        }, 300);
    });
}
