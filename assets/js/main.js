/**
 * Main JavaScript for IAM On Demand Jekyll Site
 */

(function() {
  'use strict';

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const menuToggle = document.querySelector('.menu-toggle');
  const headerNav = document.querySelector('.header-nav');

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function() {
      const isActive = headerNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!headerNav.contains(e.target) && !menuToggle.contains(e.target)) {
        headerNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && headerNav.classList.contains('active')) {
        headerNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  // ============================================
  // Theme Toggle (Dark Mode)
  // ============================================
  window.toggleTheme = function() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update aria-pressed
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', isDark);
    }
  };

  // Initialize theme toggle button state
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle.setAttribute('aria-pressed', isDark);
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });

  // ============================================
  // Top Banner Toggle (if present)
  // ============================================
  const topBanner = document.getElementById('siteTopBanner');
  const bannerToggle = document.getElementById('topBannerToggle');
  const bannerClose = document.querySelector('.banner-close');

  if (topBanner && bannerToggle) {
    // Check if banner was previously dismissed
    const bannerDismissed = localStorage.getItem('bannerDismissed');
    
    if (!bannerDismissed) {
      topBanner.classList.remove('top-banner--hidden');
      topBanner.setAttribute('aria-hidden', 'false');
    }

    bannerToggle.addEventListener('click', function() {
      topBanner.classList.remove('top-banner--hidden');
      topBanner.setAttribute('aria-hidden', 'false');
      bannerToggle.style.display = 'none';
    });

    if (bannerClose) {
      bannerClose.addEventListener('click', function() {
        topBanner.classList.add('top-banner--hidden');
        topBanner.setAttribute('aria-hidden', 'true');
        bannerToggle.style.display = 'block';
        localStorage.setItem('bannerDismissed', 'true');
      });
    }
  }

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animate class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // Form Validation Enhancement
  // ============================================
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Add error styling on invalid
      input.addEventListener('invalid', function() {
        this.classList.add('input-error');
      });
      
      // Remove error styling on input
      input.addEventListener('input', function() {
        if (this.validity.valid) {
          this.classList.remove('input-error');
        }
      });
    });
  });

  // ============================================
  // Reduce Motion Support
  // ============================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
  }

})();
