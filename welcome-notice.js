// welcome-notice.js - Shows a welcome notification for first-time visitors
document.addEventListener('DOMContentLoaded', () => {
    // Check if this is user's first visit
    if (!localStorage.getItem('hasVisitedBefore')) {
        // Create welcome notification
        const welcomeNotice = document.createElement('div');
        welcomeNotice.className = 'welcome-notice';
        welcomeNotice.innerHTML = `
            <div class="notice-content">
                <h3>Welcome to Mom's Special Page! 💖</h3>
                <p>This tribute has background music to enhance your experience.</p>
                <p>You can control the music using the player in the bottom-left corner.</p>
                <button id="close-notice" class="notice-button">Got it!</button>
            </div>
        `;
        document.body.appendChild(welcomeNotice);

        // Add event listener to close button
        document.getElementById('close-notice').addEventListener('click', () => {
            welcomeNotice.classList.add('fade-out');
            setTimeout(() => {
                welcomeNotice.remove();
            }, 500);
            
            // Mark that user has visited before
            localStorage.setItem('hasVisitedBefore', 'true');
        });

        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (document.body.contains(welcomeNotice)) {
                welcomeNotice.classList.add('fade-out');
                setTimeout(() => {
                    if (document.body.contains(welcomeNotice)) {
                        welcomeNotice.remove();
                    }
                }, 500);
                localStorage.setItem('hasVisitedBefore', 'true');
            }
        }, 8000);
    }
});
