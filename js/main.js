/* ============================================
   United AA Brothers Private Limited
   Main JavaScript File - Modern Edition
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initHeroSlider();
  initScrollAnimations();
  initCounterAnimation();
  initMobileMenu();
  initSmoothScroll();
  initFormValidation();
  initDropdownMenu();
});

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ============================================
   Hero Carousel Slider - Simplified
   ============================================ */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 7000; // 7 seconds per slide
  
  function resetTypingAnimation(slide) {
    const title = slide.querySelector('.hero-title');
    if (title) {
      // Force animation restart
      title.style.animation = 'none';
      title.offsetHeight; // Trigger reflow
      title.style.animation = null;
    }
  }
  
  function goToSlide(index) {
    // Remove active from all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active to current
    slides[index].classList.add('active');
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    
    // Reset typing animation for new slide
    resetTypingAnimation(slides[index]);
    
    currentSlide = index;
  }
  
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }
  
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }
  
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }
  
  // Initialize
  goToSlide(0);
  startAutoSlide();
  
  // Pause on hover
  const heroCarousel = document.querySelector('.hero-carousel');
  if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', stopAutoSlide);
    heroCarousel.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });
}

/* ============================================
   Dropdown Menu (Mobile)
   ============================================ */
function initDropdownMenu() {
  const dropdownItems = document.querySelectorAll('.nav-item');
  
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const menu = item.querySelector('.dropdown-menu');
    
    if (menu && link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('dropdown-active');
        }
      });
    }
  });
}

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!mobileMenuBtn || !navMenu) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const icon = this.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Don't close if it's a dropdown toggle
      if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
        return;
      }
      
      navMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================
   GSAP Scroll Animations
   ============================================ */
function initScrollAnimations() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Fade up animations
  gsap.utils.toArray('.fade-up').forEach(element => {
    gsap.fromTo(element, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  // Fade in animations
  gsap.utils.toArray('.fade-in').forEach(element => {
    gsap.fromTo(element,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  // Scale in animations
  gsap.utils.toArray('.scale-in').forEach(element => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.9
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  // Stagger animations for grids
  const staggerElements = [
    '.division-card',
    '.expertise-card',
    '.mission-vision-card',
    '.why-choose-item',
    '.value-item',
    '.contact-card',
    '.service-category'
  ];
  
  staggerElements.forEach(selector => {
    const elements = gsap.utils.toArray(selector);
    if (elements.length > 0) {
      gsap.fromTo(elements,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elements[0],
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
  
  // Hero content animations for slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  heroSlides.forEach(slide => {
    const content = slide.querySelector('.hero-slide-inner');
    if (content) {
      const elements = content.querySelectorAll('*');
      gsap.fromTo(elements,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.3
        }
      );
    }
  });
  
  // Stats animation
  const statItems = document.querySelectorAll('.stat-item');
  if (statItems.length > 0) {
    gsap.fromTo(statItems,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hero-stats',
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}

/* ============================================
   Counter Animation
   ============================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter, .impact-number');
  
  if (counters.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/* ============================================
   Form Validation
   ============================================ */
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        // Remove existing error messages
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
          existingError.remove();
        }
        field.classList.remove('error');
        
        // Validate field
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          const errorMessage = document.createElement('span');
          errorMessage.className = 'error-message';
          errorMessage.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
          errorMessage.textContent = 'This field is required';
          field.parentElement.appendChild(errorMessage);
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value)) {
            isValid = false;
            field.classList.add('error');
            
            const errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            errorMessage.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
            errorMessage.textContent = 'Please enter a valid email address';
            field.parentElement.appendChild(errorMessage);
          }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
          const phonePattern = /^[\d\s\-\+\(\)]{10,}$/;
          if (!phonePattern.test(field.value)) {
            isValid = false;
            field.classList.add('error');
            
            const errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            errorMessage.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
            errorMessage.textContent = 'Please enter a valid phone number';
            field.parentElement.appendChild(errorMessage);
          }
        }
      });
      
      if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = 'background-color: #10b981; color: white; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; text-align: center;';
        successMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
        
        // Remove existing success message
        const existingSuccess = form.querySelector('.success-message');
        if (existingSuccess) {
          existingSuccess.remove();
        }
        
        form.appendChild(successMessage);
        form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  });
}

/* ============================================
   Utility Functions
   ============================================ */

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Add loaded class to body when page is fully loaded
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});
