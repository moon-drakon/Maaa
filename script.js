document.addEventListener('DOMContentLoaded', function() {
    createFallingElements();
    createFloatingBalloons();
    handleLetterSection();
    
    if (document.querySelector('.carousel')) {
        initializeCarousel();
    }
    
    handlePageLoader();
});

// Create falling hearts and flowers animation
function createFallingElements() {
    const heartsContainer = document.querySelector('.hearts-container');
    const flowersContainer = document.querySelector('.flowers-container');
    
    // Create 40 hearts - increased for more visual impact
    for (let i = 0; i < 40; i++) {
        createHeart(heartsContainer);
    }
    
    // Create 25 flowers - increased for more visual impact
    for (let i = 0; i < 25; i++) {
        createFlower(flowersContainer);
    }
    
    // Continuously add new elements more frequently
    setInterval(() => createHeart(heartsContainer), 1500); // Faster interval
    setInterval(() => createFlower(flowersContainer), 2000); // Faster interval
}

function createHeart(container) {
    const heart = document.createElement('div');
    
    // Position hearts away from the center of content
    // Place more hearts on the sides of the screen
    let leftPosition;
    if (Math.random() > 0.6) { // 40% chance of being on the sides
        leftPosition = Math.random() > 0.5 ? 
            Math.random() * 15 : // Left 15%
            85 + (Math.random() * 15); // Right 15%
    } else {
        leftPosition = Math.random() * 100;
    }
    
    // Randomly choose between CSS heart shape or emoji heart for more variety
    const useEmoji = Math.random() > 0.5; // 50% chance for emoji
    
    if (useEmoji) {
        heart.classList.add('heart-emoji');
        // Selected heart emojis for visibility
        const heartEmojis = ['❤️', '💕', '💖', '💗'];
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    } else {
        heart.classList.add('heart');
    }
    
    // Random size - smaller hearts for better content visibility
    const size = Math.random() * 25 + 10; // Moderate size
    
    // Moderate animation duration for subtle effect
    const animationDuration = Math.random() * 12 + 10; // 10-22 seconds
    const delay = Math.random() * 5;
    
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${leftPosition}%`;
    
    // Add slight opacity for better content visibility
    heart.style.opacity = (Math.random() * 0.3 + 0.4).toString(); // 40-70% opacity
    
    // Choose animation type
    const animationType = Math.random() > 0.7 ? 'floatSides' : 'float'; // Mostly straight up
    heart.style.animation = `${animationType} ${animationDuration}s linear ${delay}s infinite`;
    heart.style.color = getRandomPinkShade();
    
    // Add pulsing effect to some hearts
    if (Math.random() > 0.7) {
        heart.classList.add('pulse');
    }
    
    container.appendChild(heart);
    
    // Remove heart after some time to prevent DOM from getting too large
    setTimeout(() => {
        if (container.contains(heart)) {
            container.removeChild(heart);
        }
    }, (animationDuration + delay) * 1000);
}

function createFlower(container) {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    
    // Position flowers on the edges more often
    let leftPosition;
    if (Math.random() > 0.5) { // 50% chance of being on the sides
        leftPosition = Math.random() > 0.5 ? 
            Math.random() * 20 : // Left 20%
            80 + (Math.random() * 20); // Right 20%
    } else {
        leftPosition = Math.random() * 100;
    }
    
    // Smaller size for better content visibility
    const size = Math.random() * 20 + 15;
    const animationDuration = Math.random() * 12 + 12;
    const delay = Math.random() * 5;
    
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.left = `${leftPosition}%`;
    // Better opacity for content visibility
    flower.style.opacity = (Math.random() * 0.3 + 0.3).toString(); // 30-60% opacity
    
    const animationType = Math.random() > 0.3 ? 'float' : 'floatSides';
    flower.style.animation = `${animationType} ${animationDuration}s linear ${delay}s infinite`;
    
    container.appendChild(flower);
    
    // Remove flower after some time to prevent DOM from getting too large
    setTimeout(() => {
        if (container.contains(flower)) {
            container.removeChild(flower);
        }
    }, (animationDuration + delay) * 1000);
}

function getRandomPinkShade() {
    const shades = [
        '#ff70a6', '#ff9ebc', '#ffa6c9', '#ff69b4', '#ff748c',
        '#ff8da1', '#ffc0cb', '#ffb6c1', '#ff77cc', '#de6fa1'
    ];
    return shades[Math.floor(Math.random() * shades.length)];
}

// Create floating balloons
function createFloatingBalloons() {
    const body = document.querySelector('body');
    const balloonColors = [
        '#ff70a6', '#ff9ebc', '#ffa6c9', '#ff69b4', '#ff748c',
        '#ff8da1', '#ffc0cb', '#ffb6c1', '#ff77cc', '#de6fa1',
        '#9370db', '#b19cd9', '#dda0dd', '#d8bfd8', '#e6e6fa'
    ];
    
    // Create 10 balloons
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        
        // Random position, size, and animation duration
        const size = Math.random() * 20 + 30;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.3}px`;
        balloon.style.left = `${left}%`;
        balloon.style.bottom = `-${size * 2}px`;
        balloon.style.backgroundColor = color;
        balloon.style.animationDelay = `${delay}s`;
        
        body.appendChild(balloon);
    }
}

// Handle letter section visibility
function handleLetterSection() {
    const scrollButton = document.getElementById('scroll-button');
    const letterSection = document.getElementById('letter-section');
    
    if (scrollButton && letterSection) {
        // Scroll to letter section on button click
        scrollButton.addEventListener('click', () => {
            letterSection.classList.add('visible');
            letterSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Detect when letter section is visible during scrolling
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    letterSection.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(letterSection);
    }
}

// 3D Carousel functionality
function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Initialize carousel positions
    updateCarousel();
    
    // Navigation buttons
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    // Item click navigation
    items.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            if (index !== currentIndex) {
                // If clicked on a non-active item, make it active
                currentIndex = index;
                updateCarousel();
            }
        });
    });
    
    // Update carousel positions
    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'farPrev', 'farNext');
            
            // Calculate relative position
            let position = (index - currentIndex + totalItems) % totalItems;
            
            // Apply appropriate class based on position
            if (position === 0) {
                item.classList.add('active');
            } else if (position === 1) {
                item.classList.add('next');
            } else if (position === totalItems - 1) {
                item.classList.add('prev');
            } else if (position === 2) {
                item.classList.add('farNext');
            } else if (position === totalItems - 2) {
                item.classList.add('farPrev');
            }
        });
    }
    
    // Auto-rotation for the carousel
    let autoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
    
    // Pause auto-rotation on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    });
}

// Handle page loader
function handlePageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        // Hide loader after a short delay
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            
            // Remove from DOM after transition
            loader.addEventListener('transitionend', () => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            });
        }, 2000); // 2 seconds delay
    }
}
