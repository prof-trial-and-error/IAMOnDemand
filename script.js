document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.header-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Optional: Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                // Simple visual feedback can be added via CSS or here
                // For now, functionality is key
            }
        });
    }
});