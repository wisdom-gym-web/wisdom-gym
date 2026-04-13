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








// ============================================
// COMPLETE LIGHTBOX WITH NEXT/PREVIOUS BUTTONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - setting up lightbox');
    
    // Get all certificate images
    let allImages = document.querySelectorAll('.certificate-image img');
    
    // If not found, try other common selectors
    if (allImages.length === 0) {
        allImages = document.querySelectorAll('.coach-image img');
    }
    if (allImages.length === 0) {
        allImages = document.querySelectorAll('img[src*="cert"]');
    }
    
    console.log('Found ' + allImages.length + ' certificate images');
    
    if (allImages.length === 0) {
        console.log('No images found! Check your image class names.');
        return;
    }
    
    // CREATE LIGHTBOX ELEMENTS
    const lightbox = document.createElement('div');
    lightbox.id = 'myLightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 999999;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 80%;
        max-height: 85%;
        transform: rotate(90deg);
        border-radius: 10px;
        box-shadow: 0 5px 30px rgba(0,0,0,0.5);
        cursor: default;
    `;
    
    // CLOSE BUTTON (X)
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: rgba(0,0,0,0.7);
        border: 2px solid white;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        color: white;
        font-size: 25px;
        cursor: pointer;
        z-index: 1000000;
        font-family: Arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    closeButton.onmouseover = () => {
        closeButton.style.background = '#f39c12';
        closeButton.style.color = '#1a1a1a';
        closeButton.style.borderColor = '#f39c12';
    };
    closeButton.onmouseout = () => {
        closeButton.style.background = 'rgba(0,0,0,0.7)';
        closeButton.style.color = 'white';
        closeButton.style.borderColor = 'white';
    };
    
    // PREVIOUS BUTTON (<)
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '❮';
    prevButton.style.cssText = `
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.7);
        border: 2px solid white;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 1000000;
        font-family: Arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    prevButton.onmouseover = () => {
        prevButton.style.background = '#f39c12';
        prevButton.style.color = '#1a1a1a';
        prevButton.style.borderColor = '#f39c12';
    };
    prevButton.onmouseout = () => {
        prevButton.style.background = 'rgba(0,0,0,0.7)';
        prevButton.style.color = 'white';
        prevButton.style.borderColor = 'white';
    };
    
    // NEXT BUTTON (>)
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '❯';
    nextButton.style.cssText = `
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.7);
        border: 2px solid white;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 1000000;
        font-family: Arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    nextButton.onmouseover = () => {
        nextButton.style.background = '#f39c12';
        nextButton.style.color = '#1a1a1a';
        nextButton.style.borderColor = '#f39c12';
    };
    nextButton.onmouseout = () => {
        nextButton.style.background = 'rgba(0,0,0,0.7)';
        nextButton.style.color = 'white';
        nextButton.style.borderColor = 'white';
    };
    
    // COUNTER (e.g., "3 / 16")
    const counter = document.createElement('div');
    counter.style.cssText = `
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        background: rgba(0,0,0,0.7);
        padding: 8px 18px;
        border-radius: 30px;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        z-index: 1000000;
    `;
    
    lightbox.appendChild(closeButton);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(counter);
    document.body.appendChild(lightbox);
    
    let currentIndex = 0;
    let imageSources = [];
    
    // Store all image sources
    allImages.forEach(img => {
        imageSources.push(img.src);
    });
    
    // Function to update lightbox image
    function updateLightbox() {
        lightboxImg.src = imageSources[currentIndex];
        counter.textContent = (currentIndex + 1) + ' / ' + imageSources.length;
    }
    
    // Function to open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.style.display = 'flex';
    }
    
    // Next image function
    function nextImage() {
        currentIndex = (currentIndex + 1) % imageSources.length;
        updateLightbox();
    }
    
    // Previous image function
    function prevImage() {
        currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
        updateLightbox();
    }
    
    // Add click event to each image
    allImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Image clicked:', index);
            openLightbox(index);
        });
    });
    
    // Event listeners for buttons
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        lightbox.style.display = 'none';
    });
    
    prevButton.addEventListener('click', function(e) {
        e.stopPropagation();
        prevImage();
    });
    
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });
    
    // Close lightbox when clicking background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
    
    // Prevent closing when clicking the image
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display !== 'flex') return;
        
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
    
    console.log('Lightbox ready with next/previous buttons! Click any certificate image.');
});
