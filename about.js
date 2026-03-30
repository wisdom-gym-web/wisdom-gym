// About page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Animate value cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    const facilityItems = document.querySelectorAll('.facility-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    facilityItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // Add hover effect for facility items
    facilityItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('img').style.transform = 'scale(1)';
        });
    });
});

// Mobile navigation for about page
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});