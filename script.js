document.addEventListener('DOMContentLoaded', function() {
    createFallingElements();
    createFloatingBalloons();
    handleLetterSection();
    
    if (document.querySelector('.carousel')) {
        initializeCarousel();
    }
    
    handlePageLoader();
});


function createFallingElements() {
    const heartsContainer = document.querySelector('.hearts-container');
    const flowersContainer = document.querySelector('.flowers-container');
    
    
    for (let i = 0; i < 40; i++) {
        createHeart(heartsContainer);
    }
    
    
    for (let i = 0; i < 25; i++) {
        createFlower(flowersContainer);
    }
    
    
    setInterval(() => createHeart(heartsContainer), 1500); 
    setInterval(() => createFlower(flowersContainer), 2000); 
}

function createHeart(container) {
    const heart = document.createElement('div');
    
    
    
    let leftPosition;
    if (Math.random() > 0.6) { 
        leftPosition = Math.random() > 0.5 ? 
            Math.random() * 15 : 
            85 + (Math.random() * 15); 
    } else {
        leftPosition = Math.random() * 100;
    }
    
    
    const useEmoji = Math.random() > 0.5; 
    
    if (useEmoji) {
        heart.classList.add('heart-emoji');
        
        const heartEmojis = ['❤️', '💕', '💖', '💗'];
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    } else {
        heart.classList.add('heart');
    }
    
    
    const size = Math.random() * 25 + 10; 
    
    
    const animationDuration = Math.random() * 12 + 10; 
    const delay = Math.random() * 5;
    
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${leftPosition}%`;
    
    
    heart.style.opacity = (Math.random() * 0.3 + 0.4).toString(); 
    
    
    const animationType = Math.random() > 0.7 ? 'floatSides' : 'float'; 
    heart.style.animation = `${animationType} ${animationDuration}s linear ${delay}s infinite`;
    heart.style.color = getRandomPinkShade();
    
    
    if (Math.random() > 0.7) {
        heart.classList.add('pulse');
    }
    
    container.appendChild(heart);
    
    
    setTimeout(() => {
        if (container.contains(heart)) {
            container.removeChild(heart);
        }
    }, (animationDuration + delay) * 1000);
}

function createFlower(container) {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    
    
    let leftPosition;
    if (Math.random() > 0.5) { 
        leftPosition = Math.random() > 0.5 ? 
            Math.random() * 20 : 
            80 + (Math.random() * 20); 
    } else {
        leftPosition = Math.random() * 100;
    }
    
    
    const size = Math.random() * 20 + 15;
    const animationDuration = Math.random() * 12 + 12;
    const delay = Math.random() * 5;
    
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.left = `${leftPosition}%`;
    
    flower.style.opacity = (Math.random() * 0.3 + 0.3).toString(); 
    
    const animationType = Math.random() > 0.3 ? 'float' : 'floatSides';
    flower.style.animation = `${animationType} ${animationDuration}s linear ${delay}s infinite`;
    
    container.appendChild(flower);
    
    
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


function createFloatingBalloons() {
    const body = document.querySelector('body');
    const balloonColors = [
        '#ff70a6', '#ff9ebc', '#ffa6c9', '#ff69b4', '#ff748c',
        '#ff8da1', '#ffc0cb', '#ffb6c1', '#ff77cc', '#de6fa1',
        '#9370db', '#b19cd9', '#dda0dd', '#d8bfd8', '#e6e6fa'
    ];
    
    
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        
        
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


function handleLetterSection() {
    const scrollButton = document.getElementById('scroll-button');
    const letterSection = document.getElementById('letter-section');
    
    if (scrollButton && letterSection) {
        
        scrollButton.addEventListener('click', () => {
            letterSection.classList.add('visible');
            letterSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        
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


function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    
    updateCarousel();
    
    
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            if (index !== currentIndex) {
                
                currentIndex = index;
                updateCarousel();
            }
        });
    });
    
    
    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'farPrev', 'farNext');
            
            
            let position = (index - currentIndex + totalItems) % totalItems;
            
            
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
    
    
    let autoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
    
    
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


function handlePageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            
            
            loader.addEventListener('transitionend', () => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            });
        }, 2000); 
    }
}
