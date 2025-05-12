// Enhanced 3D Gallery with Advanced Features

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the gallery page
    if (document.querySelector('.gallery-page')) {
        initEnhancedGallery();
    }
});

function initEnhancedGallery() {
    // Get carousel container and items
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    
    // Initialize enhanced gallery
    if (carouselContainer && carousel && items.length > 0) {
        // Create a fullscreen gallery view option
        createFullscreenButton(carouselContainer);
        
        // Add enhanced 3D effects and controls
        enhanceCarouselItems(items);
        
        // Initialize the carousel with the enhanced features
        initializeEnhancedCarousel(carousel, items);
        
        // Create thumbnail navigation
        createThumbnailNav(carouselContainer, items);
        
        // Add modal viewer for fullscreen views
        createModalViewer();
    }
}

// Add enhanced 3D effects to carousel items
function enhanceCarouselItems(items) {
    items.forEach(item => {
        // Add enhanced 3D effects
        item.classList.add('enhanced-3d-item');
        
        // Add reflective surface
        const reflection = document.createElement('div');
        reflection.className = 'item-reflection';
        item.appendChild(reflection);
        
        // Add click to view fullscreen
        item.addEventListener('click', function() {
            // Get the image source
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.caption').innerText;
            
            // Show in fullscreen modal
            showImageInModal(imgSrc, caption);
        });
    });
}

// Initialize enhanced carousel with advanced 3D effects
function initializeEnhancedCarousel(carousel, items) {
    const totalItems = items.length;
    let currentIndex = 0;
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    // Set initial positions
    updateCarouselPositions();
    
    // Add drag functionality
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchmove', drag);
    carousel.addEventListener('mouseleave', dragEnd);
    
    // Drag functions
    function dragStart(e) {
        e.preventDefault();
        startPosition = getPositionX(e);
        isDragging = true;
        carousel.style.cursor = 'grabbing';
    }
    
    function drag(e) {
        if (isDragging) {
            const currentPosition = getPositionX(e);
            const diff = currentPosition - startPosition;
            
            // Add resistance to dragging
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToPrev();
                } else {
                    goToNext();
                }
                isDragging = false;
            }
        }
    }
    
    function dragEnd() {
        isDragging = false;
        carousel.style.cursor = 'grab';
    }
    
    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
    
    // Navigation buttons functionality
    if (prevButton) {
        prevButton.addEventListener('click', goToPrev);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', goToNext);
    }
    
    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarouselPositions();
        updateThumbnailSelection();
    }
    
    function goToNext() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarouselPositions();
        updateThumbnailSelection();
    }
    
    // Update carousel positions with enhanced 3D distribution
    function updateCarouselPositions() {
        items.forEach((item, index) => {
            // Remove all position classes first
            item.classList.remove('active', 'prev', 'next', 'farPrev', 'farNext', 'extraFarPrev', 'extraFarNext');
            
            // Calculate relative position
            let position = (index - currentIndex + totalItems) % totalItems;
            
            // Apply appropriate class based on position
            if (position === 0) {
                item.classList.add('active');
                item.style.zIndex = 10;
            } else if (position === 1) {
                item.classList.add('next');
                item.style.zIndex = 9;
            } else if (position === totalItems - 1) {
                item.classList.add('prev');
                item.style.zIndex = 9;
            } else if (position === 2) {
                item.classList.add('farNext');
                item.style.zIndex = 8;
            } else if (position === totalItems - 2) {
                item.classList.add('farPrev');
                item.style.zIndex = 8;
            } else if (position > 2 && position <= Math.floor(totalItems/2)) {
                item.classList.add('extraFarNext');
                item.style.zIndex = 7 - (position - 2);
            } else if (position < totalItems - 2 && position >= Math.floor(totalItems/2)) {
                item.classList.add('extraFarPrev');
                item.style.zIndex = 7 - (totalItems - position - 2);
            }
        });
    }
    
    // Update thumbnail selection
    function updateThumbnailSelection() {
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });
    
    // Auto-rotation for the carousel with improved timing
    let autoRotate = setInterval(goToNext, 5000);
    
    // Pause auto-rotation on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(goToNext, 5000);
    });
}

// Create thumbnail navigation
function createThumbnailNav(container, items) {
    // Create thumbnail container
    const thumbnailNav = document.createElement('div');
    thumbnailNav.className = 'thumbnail-navigation';
    
    // Add thumbnails for each item
    items.forEach((item, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'gallery-thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        const imgSrc = item.querySelector('img').src;
        thumbnail.style.backgroundImage = `url(${imgSrc})`;
        
        // Click thumbnail to navigate to that image
        thumbnail.addEventListener('click', () => {
            // Find the carousel
            const carousel = document.querySelector('.carousel');
            const items = document.querySelectorAll('.carousel-item');
            
            // Update classes for all items based on the new index
            items.forEach((item, i) => {
                item.classList.remove('active', 'prev', 'next', 'farPrev', 'farNext', 'extraFarPrev', 'extraFarNext');
                
                // Calculate relative position
                const totalItems = items.length;
                let position = (i - index + totalItems) % totalItems;
                
                // Apply appropriate class based on position
                if (position === 0) {
                    item.classList.add('active');
                    item.style.zIndex = 10;
                } else if (position === 1) {
                    item.classList.add('next');
                    item.style.zIndex = 9;
                } else if (position === totalItems - 1) {
                    item.classList.add('prev');
                    item.style.zIndex = 9;
                } else if (position === 2) {
                    item.classList.add('farNext');
                    item.style.zIndex = 8;
                } else if (position === totalItems - 2) {
                    item.classList.add('farPrev');
                    item.style.zIndex = 8;
                } else if (position > 2 && position <= Math.floor(totalItems/2)) {
                    item.classList.add('extraFarNext');
                    item.style.zIndex = 7 - (position - 2);
                } else if (position < totalItems - 2 && position >= Math.floor(totalItems/2)) {
                    item.classList.add('extraFarPrev');
                    item.style.zIndex = 7 - (totalItems - position - 2);
                }
            });
            
            // Update thumbnail selection
            const thumbnails = document.querySelectorAll('.gallery-thumbnail');
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        });
        
        thumbnailNav.appendChild(thumbnail);
    });
    
    // Add thumbnails after the carousel
    container.parentNode.insertBefore(thumbnailNav, container.nextSibling);
}

// Create fullscreen button
function createFullscreenButton(container) {
    const fullscreenButton = document.createElement('button');
    fullscreenButton.className = 'fullscreen-button';
    fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    
    fullscreenButton.addEventListener('click', () => {
        // Switch to grid view of all images
        toggleGridView();
    });
    
    container.appendChild(fullscreenButton);
}

// Create modal viewer
function createModalViewer() {
    // Check if modal already exists
    if (document.querySelector('.gallery-modal')) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal"><i class="fas fa-times"></i></button>
            <img src="" alt="Gallery Image">
            <div class="modal-caption"></div>
            <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    
    // Hide modal by default
    modal.style.display = 'none';
    
    // Add to document
    document.body.appendChild(modal);
    
    // Close modal on button click
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal on click outside of content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show image in modal
function showImageInModal(imgSrc, caption) {
    const modal = document.querySelector('.gallery-modal');
    if (!modal) return;
    
    const modalImg = modal.querySelector('img');
    const modalCaption = modal.querySelector('.modal-caption');
    const prevButton = modal.querySelector('.modal-prev');
    const nextButton = modal.querySelector('.modal-next');
    
    // Set image and caption
    modalImg.src = imgSrc;
    modalCaption.textContent = caption;
    
    // Show modal with animation
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Get all images in the carousel
    const carouselItems = document.querySelectorAll('.carousel-item');
    const images = Array.from(carouselItems).map(item => {
        return {
            src: item.querySelector('img').src,
            caption: item.querySelector('.caption').textContent
        };
    });
    
    // Find current image index
    let currentIndex = images.findIndex(img => img.src === imgSrc);
    
    // Previous button
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].caption;
    });
    
    // Next button
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].caption;
    });
    
    // Keyboard navigation
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            document.removeEventListener('keydown', handleKeyDown);
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            modalImg.src = images[currentIndex].src;
            modalCaption.textContent = images[currentIndex].caption;
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            modalImg.src = images[currentIndex].src;
            modalCaption.textContent = images[currentIndex].caption;
        }
    }
    
    document.addEventListener('keydown', handleKeyDown);
}

// Toggle between carousel and grid view
function toggleGridView() {
    const carousel = document.querySelector('.carousel-container');
    const gallerySection = document.querySelector('.gallery-section');
    
    // Check if grid view already exists
    let gridView = document.querySelector('.gallery-grid-view');
    
    if (gridView) {
        // Switch back to carousel view
        gridView.style.display = 'none';
        carousel.style.display = '';
    } else {
        // Create grid view
        gridView = document.createElement('div');
        gridView.className = 'gallery-grid-view';
        
        // Get all images from carousel
        const carouselItems = document.querySelectorAll('.carousel-item');
        
        // Add each image to grid
        carouselItems.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item enhanced-floating-photo';
            
            const img = document.createElement('img');
            img.src = item.querySelector('img').src;
            
            const caption = document.createElement('div');
            caption.className = 'grid-caption';
            caption.textContent = item.querySelector('.caption').textContent;
            
            gridItem.appendChild(img);
            gridItem.appendChild(caption);
            
            // Click to view fullscreen
            gridItem.addEventListener('click', () => {
                showImageInModal(img.src, caption.textContent);
            });
            
            gridView.appendChild(gridItem);
        });
        
        // Hide carousel and show grid
        carousel.style.display = 'none';
        gallerySection.appendChild(gridView);
    }
}
