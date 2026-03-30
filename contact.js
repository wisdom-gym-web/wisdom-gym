// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!firstName || !lastName || !email) {
                showStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showStatus('Sending message...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                showStatus('Thank you! Our team will get back to you within 24 hours.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return re.test(email);
    }
    
    function showStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }
    }
    
    // Animate contact cards on scroll
    const contactCards = document.querySelectorAll('.contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// Mobile navigation for contact page
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



// Share Functionality
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.getElementById('shareBtn');
    const shareFeedback = document.getElementById('shareFeedback');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const shareData = {
                title: 'GVMTEAM Gym',
                text: 'Join the strongest fitness community! Transform your body with expert coaches and premium facilities.',
                url: window.location.href
            };
            
            // Check if Web Share API is supported (mobile)
            if (navigator.share) {
                navigator.share(shareData)
                    .then(() => {
                        showShareFeedback('✓ Shared successfully! Thanks for spreading the word!', 'success');
                    })
                    .catch((error) => {
                        if (error.name !== 'AbortError') {
                            showShareFeedback('❌ Sharing cancelled or failed', 'error');
                        }
                    });
            } else {
                // Fallback for desktop - copy link to clipboard
                const dummy = document.createElement('textarea');
                dummy.value = window.location.href;
                document.body.appendChild(dummy);
                dummy.select();
                
                try {
                    document.execCommand('copy');
                    showShareFeedback('✓ Link copied to clipboard! Share it with friends 📋', 'success');
                } catch (err) {
                    showShareFeedback('❌ Unable to copy. Please manually copy the link', 'error');
                }
                
                document.body.removeChild(dummy);
            }
        });
    }
    
    function showShareFeedback(message, type) {
        if (shareFeedback) {
            shareFeedback.textContent = message;
            shareFeedback.className = `share-feedback ${type}`;
            
            setTimeout(() => {
                shareFeedback.textContent = '';
                shareFeedback.className = 'share-feedback';
            }, 3000);
        }
    }
    
    // Get Directions Button - Open Google Maps
    const getDirectionsBtn = document.getElementById('getDirectionsBtn');
    if (getDirectionsBtn) {
        getDirectionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Replace with your actual gym address
            const address = encodeURIComponent('123 Fitness Avenue, Downtown City, ST 12345');
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
            window.open(mapsUrl, '_blank');
        });
    }
});

// Update your existing contact cards animation to include the new ones
const contactCards = document.querySelectorAll('.contact-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

contactCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});