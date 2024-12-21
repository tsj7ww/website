document.addEventListener('DOMContentLoaded', () => {
    // Fade in animation when page loads
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = 1;
    }, 100);

    // Add smooth transition when navigating away
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Start fade out
            document.body.style.opacity = 0;
            
            // Navigate after fade out animation
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
        
        // Optional: Add hover sound effect
        button.addEventListener('mouseenter', () => {
            // Uncomment below to add hover sound
            // const hoverSound = new Audio('path/to/hover-sound.mp3');
            // hoverSound.play();
        });
    });
});