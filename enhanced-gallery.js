

document.addEventListener('DOMContentLoaded', function() {
    
    if (document.querySelector('.gallery-page')) {
        initEnhancedGallery();
    }
});

function initEnhancedGallery() {
    
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    
    
    if (carouselContainer && carousel && items.length > 0) {
        
        createFullscreenButton(carouselContainer);
        
        
        enhanceCarouselItems(items);
        
        
        initializeEnhancedCarousel(carousel, items);
        
        
        createThumbnailNav(carouselContainer, items);
        
        
        createModalViewer();
    }
}


function enhanceCarouselItems(items) {
    items.forEach(item => {
        
        item.classList.add('enhanced-3d-item');
        
        
        const reflection = document.createElement('div');
        reflection.className = 'item-reflection';
        item.appendChild(reflection);
        
        
        item.addEventListener('click', function() {
            
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.caption').innerText;
            
            
            showImageInModal(imgSrc, caption);
        });
    });
}


function initializeEnhancedCarousel(carousel, items) {
    const totalItems = items.length;
    let currentIndex = 0;
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    
    updateCarouselPositions();
    
    
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
    
    
    function updateCarouselPositions() {
        items.forEach((item, index) => {
            
            item.classList.remove('active', 'prev', 'next', 'farPrev', 'farNext', 'extraFarPrev', 'extraFarNext');
            
            
            let position = (index - currentIndex + totalItems) % totalItems;
            
            
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
    
    
    function updateThumbnailSelection() {
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });
    
    
    let autoRotate = setInterval(goToNext, 5000);
    
    
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(goToNext, 5000);
    });
}


function createThumbnailNav(container, items) {
    
    const thumbnailNav = document.createElement('div');
    thumbnailNav.className = 'thumbnail-navigation';
    
    
    items.forEach((item, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'gallery-thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        const imgSrc = item.querySelector('img').src;
        thumbnail.style.backgroundImage = `url(${imgSrc})`;
        
        
        thumbnail.addEventListener('click', () => {
            
            const carousel = document.querySelector('.carousel');
            const items = document.querySelectorAll('.carousel-item');
            
            
            items.forEach((item, i) => {
                item.classList.remove('active', 'prev', 'next', 'farPrev', 'farNext', 'extraFarPrev', 'extraFarNext');
                
                
                const totalItems = items.length;
                let position = (i - index + totalItems) % totalItems;
                
                
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
            
            
            const thumbnails = document.querySelectorAll('.gallery-thumbnail');
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        });
        
        thumbnailNav.appendChild(thumbnail);
    });
    
    
    container.parentNode.insertBefore(thumbnailNav, container.nextSibling);
}


function createFullscreenButton(container) {
    const fullscreenButton = document.createElement('button');
    fullscreenButton.className = 'fullscreen-button';
    fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    
    fullscreenButton.addEventListener('click', () => {
        
        toggleGridView();
    });
    
    container.appendChild(fullscreenButton);
}


function createModalViewer() {
    
    if (document.querySelector('.gallery-modal')) return;
    
    
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
    
    
    modal.style.display = 'none';
    
    
    document.body.appendChild(modal);
    
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}


function showImageInModal(imgSrc, caption) {
    const modal = document.querySelector('.gallery-modal');
    if (!modal) return;
    
    const modalImg = modal.querySelector('img');
    const modalCaption = modal.querySelector('.modal-caption');
    const prevButton = modal.querySelector('.modal-prev');
    const nextButton = modal.querySelector('.modal-next');
    
    
    modalImg.src = imgSrc;
    modalCaption.textContent = caption;
    
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    
    const carouselItems = document.querySelectorAll('.carousel-item');
    const images = Array.from(carouselItems).map(item => {
        return {
            src: item.querySelector('img').src,
            caption: item.querySelector('.caption').textContent
        };
    });
    
    
    let currentIndex = images.findIndex(img => img.src === imgSrc);
    
    
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].caption;
    });
    
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].caption;
    });
    
    
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


function toggleGridView() {
    const carousel = document.querySelector('.carousel-container');
    const gallerySection = document.querySelector('.gallery-section');
    
    
    let gridView = document.querySelector('.gallery-grid-view');
    
    if (gridView) {
        
        gridView.style.display = 'none';
        carousel.style.display = '';
    } else {
        
        gridView = document.createElement('div');
        gridView.className = 'gallery-grid-view';
        
        
        const carouselItems = document.querySelectorAll('.carousel-item');
        
        
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
            
            
            gridItem.addEventListener('click', () => {
                showImageInModal(img.src, caption.textContent);
            });
            
            gridView.appendChild(gridItem);
        });
        
        
        carousel.style.display = 'none';
        gallerySection.appendChild(gridView);
    }
}
