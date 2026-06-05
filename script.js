// Mobile Interface Navigation Toggle Engine
const mobileMenu = document.querySelector('#mobile-menu');
const navMenuLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenuLinks.classList.toggle('active');
});

// Structural clean up when clicking links natively
document.querySelectorAll('.nav-links a').forEach(linkElement => {
    linkElement.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenuLinks.classList.remove('active');
    });
});

// Dynamic Scroll Mapping for Highlight Triggers
const trackedSections = document.querySelectorAll('section');
const navigationAnchorItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentActiveSectionId = '';
    
    trackedSections.forEach(sectionBlock => {
        const sectionOffsetTop = sectionBlock.offsetTop;
        const sectionInnerHeight = sectionBlock.clientHeight;
        
        if (pageYOffset >= (sectionOffsetTop - sectionInnerHeight / 3)) {
            currentActiveSectionId = sectionBlock.getAttribute('id');
        }
    });

    navigationAnchorItems.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href').includes(currentActiveSectionId)) {
            anchor.classList.add('active');
        }
    });
});s