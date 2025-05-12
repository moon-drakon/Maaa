// Improved Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the gallery page
    if (document.querySelector('.gallery-page')) {
        improveGallery();
    }
});

function improveGallery() {
    // Get carousel container and items
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    
    if (!carouselContainer || !carousel || items.length === 0) {
        return;
    }
    
    // Add link to new CSS
    addStylesheet('improved-gallery.css');
    
    // Create view toggle buttons
    createViewToggles(carouselContainer, carousel, items);
    
    // Create grid view for all images
    createGridView(carouselContainer, items);
    
    // Add modal for full-screen viewing
    createModalViewer(items);
    
    // Improve the carousel navigation
    improveCarouselNavigation(carousel, items);
    
    // Initialize with grid view by default for better visibility
    toggleView('grid');
}

// Helper function to add a stylesheet
function addStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// Create toggle buttons for different views
function createViewToggles(container, carousel, items) {
    const controls = document.createElement('div');
    controls.className = 'gallery-view-controls';
    
    const carouselBtn = document.createElement('button');
    carouselBtn.className = 'view-toggle-btn';
    carouselBtn.innerHTML = '<i class="fas fa-film"></i> Carousel View';
    carouselBtn.addEventListener('click', () => toggleView('carousel'));
    
    const gridBtn = document.createElement('button');
    gridBtn.className = 'view-toggle-btn active';
    gridBtn.innerHTML = '<i class="fas fa-th"></i> Grid View';
    gridBtn.addEventListener('click', () => toggleView('grid'));
    
    controls.appendChild(carouselBtn);
    controls.appendChild(gridBtn);
    
    // Insert before the carousel container
    container.parentNode.insertBefore(controls, container);
}

// Create grid view for all images
function createGridView(container, items) {
    const gridView = document.createElement('div');
    gridView.className = 'gallery-grid-view';
    
    items.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.caption');
        
        const gridItem = document.createElement('div');
        gridItem.className = 'gallery-grid-item';
        gridItem.setAttribute('data-index', index);
        
        const gridImg = document.createElement('img');
        gridImg.src = img.src;
        gridImg.alt = img.alt;
        
        const gridCaption = document.createElement('div');
        gridCaption.className = 'caption';
        gridCaption.textContent = caption.textContent;
        
        gridItem.appendChild(gridImg);
        gridItem.appendChild(gridCaption);
        
        // Add click event to open in modal
        gridItem.addEventListener('click', function() {
            openModal(parseInt(this.getAttribute('data-index')));
        });
        
        gridView.appendChild(gridItem);
    });
    
    // Insert after the carousel container
    container.parentNode.insertBefore(gridView, container.nextSibling);
}

// Toggle between carousel and grid views
function toggleView(view) {
    const carouselContainer = document.querySelector('.carousel-container');
    const gridView = document.querySelector('.gallery-grid-view');
    const carouselBtn = document.querySelectorAll('.view-toggle-btn')[0];
    const gridBtn = document.querySelectorAll('.view-toggle-btn')[1];
    
    if (view === 'carousel') {
        carouselContainer.style.display = 'block';
        gridView.style.display = 'none';
        carouselBtn.classList.add('active');
        gridBtn.classList.remove('active');
    } else {
        carouselContainer.style.display = 'none';
        gridView.style.display = 'grid';
        carouselBtn.classList.remove('active');
        gridBtn.classList.add('active');
    }
}

// Create modal for fullscreen viewing
function createModalViewer(items) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalImg = document.createElement('img');
    modalImg.alt = 'Gallery Image';
    
    const modalCaption = document.createElement('div');
    modalCaption.className = 'modal-caption';
    
    const closeBtn = document.createElement('div');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.addEventListener('click', closeModal);
    
    const modalNav = document.createElement('div');
    modalNav.className = 'modal-nav';
    
    const prevBtn = document.createElement('div');
    prevBtn.className = 'modal-nav-btn prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('div');
    nextBtn.className = 'modal-nav-btn next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    modalNav.appendChild(prevBtn);
    modalNav.appendChild(nextBtn);
    
    modalContent.appendChild(modalImg);
    
    modal.appendChild(modalContent);
    modal.appendChild(modalCaption);
    modal.appendChild(closeBtn);
    modal.appendChild(modalNav);
    
    document.body.appendChild(modal);
    
    // Configure modal navigation
    modal.setAttribute('data-current-index', '0');
    
    prevBtn.addEventListener('click', function() {
        navigateModal('prev');
    });
    
    nextBtn.addEventListener('click', function() {
        navigateModal('next');
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            navigateModal('prev');
        } else if (e.key === 'ArrowRight') {
            navigateModal('next');
        }
    });
}

// Open the modal with a specific image
function openModal(index) {
    const items = document.querySelectorAll('.carousel-item');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = modal.querySelector('.modal-content img');
    const modalCaption = modal.querySelector('.modal-caption');
    
    modal.setAttribute('data-current-index', index);
    
    const img = items[index].querySelector('img');
    const caption = items[index].querySelector('.caption');
    
    modalImg.src = img.src;
    modalCaption.textContent = caption.textContent;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close the modal
function closeModal() {
    const modal = document.querySelector('.gallery-modal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

// Navigate through images in the modal
function navigateModal(direction) {
    const modal = document.querySelector('.gallery-modal');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = parseInt(modal.getAttribute('data-current-index'));
    
    if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    } else {
        currentIndex = (currentIndex + 1) % items.length;
    }
    
    openModal(currentIndex);
}

// Improve carousel navigation
function improveCarouselNavigation(carousel, items) {
    // Set up initial state
    items.forEach((item, index) => {
        if (index === 0) {
            item.classList.add('active');
        } else if (index === 1) {
            item.classList.add('next');
        } else if (index === items.length - 1) {
            item.classList.add('prev');
        } else {
            item.style.opacity = '0';
        }
        
        // Add click event to make the item active
        item.addEventListener('click', function() {
            const currentActive = carousel.querySelector('.active');
            const currentIndex = Array.from(items).indexOf(currentActive);
            const clickedIndex = Array.from(items).indexOf(this);
            
            if (currentIndex !== clickedIndex) {
                if (this.classList.contains('next')) {
                    moveCarousel('next');
                } else if (this.classList.contains('prev')) {
                    moveCarousel('prev');
                }
            } else {
                // If clicking the active item, open in modal
                openModal(clickedIndex);
            }
        });
    });
    
    // Add improved navigation for carousel
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    prevButton.addEventListener('click', function() {
        moveCarousel('prev');
    });
    
    nextButton.addEventListener('click', function() {
        moveCarousel('next');
    });
}

// Move the carousel to show next/prev image
function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const currentActive = document.querySelector('.carousel-item.active');
    const currentIndex = Array.from(items).indexOf(currentActive);
    
    let newIndex;
    
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % items.length;
    } else {
        newIndex = (currentIndex - 1 + items.length) % items.length;
    }
    
    // Reset all classes
    items.forEach(item => {
        item.classList.remove('active', 'prev', 'next');
        item.style.opacity = '0';
    });
    
    // Set new active
    items[newIndex].classList.add('active');
    
    // Set new prev
    const prevIndex = (newIndex - 1 + items.length) % items.length;
    items[prevIndex].classList.add('prev');
    items[prevIndex].style.opacity = '1';
    
    // Set new next
    const nextIndex = (newIndex + 1) % items.length;
    items[nextIndex].classList.add('next');
    items[nextIndex].style.opacity = '1';
}
