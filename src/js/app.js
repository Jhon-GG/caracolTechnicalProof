document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.headerBurger');
    const navMenu = document.querySelector('.navMenu');
    
    burgerButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});