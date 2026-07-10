const menuButton = document.querySelector('#menu-btn');
const primaryNav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
});
