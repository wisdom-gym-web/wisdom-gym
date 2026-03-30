// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-status success';
            successMsg.textContent = 'Thanks for subscribing! Check your inbox soon.';
            successMsg.style.marginTop = '15px';
            successMsg.style.padding = '10px';
            successMsg.style.borderRadius = '8px';
            successMsg.style.textAlign = 'center';
            
            newsletterForm.appendChild(successMsg);
            emailInput.value = '';
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        }
    });
}

// Start Now Button Alert
const startNowBtn = document.getElementById('startNowBtn');
if (startNowBtn) {
    startNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🎉 Welcome to GVMTEAM! Visit our gym or contact us to start your free trial today!');
    });
}

// Animate on Scroll - Simple Intersection Observer
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .coach-card, .testimonial-card, .value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
};

// Sticky Navbar on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '20px 0';
        }
    }
});

// Close mobile menu when clicking a link
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});



// Certificate Load More Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');
    const hiddenCerts = document.querySelectorAll('.hidden-cert');
    
    // Variables to track state
    let currentVisibleCount = 4; // First 4 certificates are visible
    const batchSize = 4; // Show 4 certificates at a time
    const totalCerts = hiddenCerts.length + 4; // Total 16 certificates
    
    // Function to update button visibility
    function updateButtons() {
        const visibleCerts = document.querySelectorAll('.certificate-card:not(.hidden-cert)').length;
        
        if (visibleCerts >= totalCerts) {
            // All certificates are visible
            loadMoreBtn.classList.add('hidden');
            showLessBtn.classList.remove('hidden');
        } else if (visibleCerts > 4) {
            // Some extra certificates are visible, not all
            loadMoreBtn.classList.remove('hidden');
            showLessBtn.classList.remove('hidden');
        } else {
            // Only first 4 are visible
            loadMoreBtn.classList.remove('hidden');
            showLessBtn.classList.add('hidden');
        }
    }
    
    // Function to show next batch of certificates
    function loadMore() {
        let visibleCount = document.querySelectorAll('.certificate-card:not(.hidden-cert)').length;
        let nextBatch = [];
        
        // Find the next hidden certificates to show
        for (let i = 0; i < hiddenCerts.length; i++) {
            if (hiddenCerts[i].classList.contains('hidden-cert')) {
                nextBatch.push(hiddenCerts[i]);
                if (nextBatch.length === batchSize) break;
            }
        }
        
        // Show the next batch
        nextBatch.forEach(cert => {
            cert.classList.remove('hidden-cert');
        });
        
        // Update buttons
        updateButtons();
    }
    
    // Function to retract/hide all extra certificates (keep only first 4)
    function showLess() {
        // Hide all certificates beyond the first 4
        const allCerts = document.querySelectorAll('.certificate-card');
        
        for (let i = 4; i < allCerts.length; i++) {
            if (!allCerts[i].classList.contains('hidden-cert')) {
                allCerts[i].classList.add('hidden-cert');
            }
        }
        
        // Reset button states
        loadMoreBtn.classList.remove('hidden');
        showLessBtn.classList.add('hidden');
        
        // Smooth scroll back to certificates section
        const certificatesSection = document.querySelector('.coaches');
        certificatesSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Add event listeners
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMore);
    }
    
    if (showLessBtn) {
        showLessBtn.addEventListener('click', showLess);
    }
    
    // Initialize button states
    updateButtons();
});

