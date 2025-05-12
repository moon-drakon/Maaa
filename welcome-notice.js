
document.addEventListener('DOMContentLoaded', () => {
    
    if (!localStorage.getItem('hasVisitedBefore')) {
        
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

        
        document.getElementById('close-notice').addEventListener('click', () => {
            welcomeNotice.classList.add('fade-out');
            setTimeout(() => {
                welcomeNotice.remove();
            }, 500);
            
            
            localStorage.setItem('hasVisitedBefore', 'true');
        });

        
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
