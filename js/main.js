/**
 * IRONFORGE FITNESS - Production-Ready UI Interactions, Navigation, Forms & Conversion System
 * Milestone 15 - Master Script
 */

// Centralized Gym Information & Conversion Configuration
const GYM_CONFIG = {
  name: 'IRONFORGE FITNESS',
  phoneDisplay: '+91 98765 43210',
  phoneTel: 'tel:+919876543210',
  phoneRaw: '919876543210',
  email: 'hello@ironforgefitness.demo',
  emailMailto: 'mailto:hello@ironforgefitness.demo',
  address: 'Ahmedabad, Gujarat, India',
  whatsappUrl: "https://wa.me/919876543210?text=Hi%20IRONFORGE%20FITNESS,%20I%27d%20like%20to%20learn%20more%20and%20claim%20my%20free%20trial.",
  getTrialConfirmationWhatsappUrl: (data) => {
    const raw = GYM_CONFIG.phoneRaw;
    const msg = `Hi ${GYM_CONFIG.name}, I just submitted a free trial request on your website and would like to confirm my session.`;
    return `https://wa.me/${raw}?text=${encodeURIComponent(msg)}`;
  },
  mapsUrl: 'https://maps.google.com/?q=Ahmedabad,+Gujarat,+India',
  isDemo: true
};
window.GYM_CONFIG = GYM_CONFIG;

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initActiveNavSpy();
  initFreeTrialForm();
  initDirectionsModal();
  initLegalModal();
  initMapControls();
  initGalleryLightbox();
  initFaqAccordion();
  initFloatingActions();
});

/**
 * 1. Sticky Navbar Dynamic Scroll State
 * Adds/removes frosted glass background styling when scrolling down
 */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const scrollThreshold = 40;
  let ticking = false;

  const updateHeader = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  // Run on load and listen with passive flag for high performance
  updateHeader();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 2. Accessible Mobile Menu Drawer
 * Handles hamburger toggle, aria states, body scroll lock, and ESC key listener
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (!toggleBtn || !drawer) return;

  const openMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('is-active');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('is-active');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close when clicking any nav link inside drawer
  const mobileLinks = drawer.querySelectorAll('a, button');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when clicking outside header / drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });

  // Close when resizing above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  }, { passive: true });
}

/**
 * 3. Smooth Navigation & Cross-Route Hash Scroll Offset Calculation
 */
function initSmoothScroll() {
  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  allNavLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || !targetId) {
        e.preventDefault();
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        scrollToSection(targetId);
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
        updateNavActiveState(targetId);
      }
    });
  });

  // Cross-route / initial hash navigation (e.g. from /membership or /location navigating to /#transformations)
  const handleInitialOrHashScroll = () => {
    if (window.location.hash) {
      const hash = window.location.hash;
      updateNavActiveState(hash);
      
      // Multi-phase execution to guarantee accurate scroll position even as images load
      [50, 150, 350, 600].forEach(delay => {
        setTimeout(() => {
          scrollToSection(hash);
        }, delay);
      });
    }
  };

  handleInitialOrHashScroll();
  window.addEventListener('hashchange', handleInitialOrHashScroll);
  window.addEventListener('load', handleInitialOrHashScroll);
}

function scrollToSection(targetSelector) {
  try {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) return;

    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 80;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 16);

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });
  } catch (err) {
    // Selector safeguard
  }
}

function updateNavActiveState(hash) {
  if (!hash) return;
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
  if (!navLinks.length) return;

  const cleanHash = hash.replace('#', '');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      href === hash || 
      href === `#${cleanHash}` || 
      href.endsWith(`/#${cleanHash}`) || 
      href === `/${cleanHash}`
    ) {
      link.classList.add('active');
    } else {
      // If we are activating a specific section like #transformations, remove active from Home
      if (cleanHash !== 'hero' && (href === '#hero' || href === '/#hero' || href === '/')) {
        link.classList.remove('active');
      } else if (href.includes('#')) {
        link.classList.remove('active');
      }
    }
  });
}

/**
 * 4. Scroll-Triggered Entrance Reveals for Section Elements & Cards
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    '.programs-reveal, .facility-reveal, .gallery-reveal, .trainers-reveal, .membership-reveal, .transformations-reveal, .testimonials-reveal, .faq-reveal, .contact-reveal, .location-reveal, .final-cta-reveal'
  );
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/**
 * 5. Dynamic Active Navigation Spy based on Scroll Position (Homepage Sections)
 */
function initActiveNavSpy() {
  // Synchronize on homepage scroll for in-page anchors: #hero, #programs, #trainers, #transformations, #contact
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
        const id = entry.target.getAttribute('id');
        if (id) {
          updateNavActiveState(`#${id}`);
        }
      }
    });
  }, {
    root: null,
    threshold: [0.35, 0.6]
  });

  sections.forEach(section => observer.observe(section));
}

/**
 * 6. Free Trial Lead Generation Form Validation & Persistent Submission
 */
function initFreeTrialForm() {
  const form = document.getElementById('free-trial-form') || document.getElementById('trial-lead-form');
  if (!form) return;

  const formCard = form.closest('.home-trial-form-card') || form.parentElement;
  const submitBtn = form.querySelector('button[type="submit"]') || document.getElementById('btn-submit-trial');

  // Form Fields
  const nameInput = document.getElementById('trial-name') || document.getElementById('input-fullname') || form.querySelector('input[name="name"]');
  const phoneInput = document.getElementById('trial-phone') || document.getElementById('input-phone') || form.querySelector('input[name="phone"]');
  const emailInput = document.getElementById('trial-email') || document.getElementById('input-email') || form.querySelector('input[name="email"]');
  const goalSelect = document.getElementById('trial-goal') || document.getElementById('select-goal') || form.querySelector('select[name="goal"]');
  const timeSelect = document.getElementById('trial-time') || document.getElementById('select-time') || form.querySelector('select[name="preferredTime"]');
  const expSelect = document.getElementById('trial-exp') || document.getElementById('select-experience') || form.querySelector('select[name="experience"]');
  const whatsappCheckbox = document.getElementById('trial-whatsapp') || document.getElementById('input-whatsapp-optin') || form.querySelector('input[name="whatsappOptIn"]');

  const errorName = document.getElementById('error-trial-name');
  const errorPhone = document.getElementById('error-trial-phone');
  const errorEmail = document.getElementById('error-trial-email');

  let isSubmitting = false;

  const clearErrors = () => {
    if (errorName) errorName.textContent = '';
    if (errorPhone) errorPhone.textContent = '';
    if (errorEmail) errorEmail.textContent = '';
    if (nameInput) nameInput.style.borderColor = '#D1D5DB';
    if (phoneInput) phoneInput.style.borderColor = '#D1D5DB';
    if (emailInput) emailInput.style.borderColor = '#D1D5DB';
  };

  [nameInput, phoneInput, emailInput].forEach(input => {
    if (input) {
      input.addEventListener('input', clearErrors);
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    clearErrors();

    const nameVal = (nameInput ? nameInput.value : '').trim();
    const phoneVal = (phoneInput ? phoneInput.value : '').trim();
    const emailVal = (emailInput ? emailInput.value : '').trim();
    const goalVal = goalSelect ? goalSelect.value : 'Build Strength';
    const timeVal = timeSelect ? timeSelect.value : 'Evening';
    const expVal = expSelect ? expSelect.value : 'Intermediate';
    const whatsappVal = whatsappCheckbox ? whatsappCheckbox.checked : true;

    let hasError = false;

    if (!nameVal || nameVal.length < 2) {
      if (errorName) errorName.textContent = 'Please enter your full name (at least 2 characters).';
      if (nameInput) {
        nameInput.style.borderColor = '#E02814';
        nameInput.focus();
      }
      hasError = true;
    }

    const digitsOnly = phoneVal.replace(/\D/g, '');
    let clean10 = '';
    if (digitsOnly.length === 10) {
      clean10 = digitsOnly;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
      clean10 = digitsOnly.slice(1);
    } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
      clean10 = digitsOnly.slice(2);
    }

    if (!clean10 || !/^[6-9]\d{9}$/.test(clean10)) {
      if (errorPhone) errorPhone.textContent = 'Please enter a valid 10-digit mobile number.';
      if (phoneInput) {
        phoneInput.style.borderColor = '#E02814';
        if (!hasError) phoneInput.focus();
      }
      hasError = true;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      if (errorEmail) errorEmail.textContent = 'Please enter a valid email address.';
      if (emailInput) {
        emailInput.style.borderColor = '#E02814';
        if (!hasError) emailInput.focus();
      }
      hasError = true;
    }

    if (hasError) return;

    isSubmitting = true;
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'CLAIM MY 7-DAY PASS →';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>GENERATING PASS...</span>`;
    }

    try {
      const payload = {
        name: nameVal,
        phone: clean10,
        email: emailVal,
        goal: goalVal,
        preferredTime: timeVal,
        experience: expVal,
        whatsappOptIn: whatsappVal
      };

      const response = await fetch('/api/free-trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Render luxury White UI confirmation state
        const firstName = nameVal.split(' ')[0] || nameVal;
        const whatsappMsg = `Hi IRONFORGE Fitness, I just claimed my 7-day free trial (Lead ID: #${data.leadId}) for ${goalVal}. Please confirm my session.`;
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`;

        if (formCard) {
          formCard.innerHTML = `
            <div style="text-align: center; padding: 1.5rem 0.5rem;">
              <div style="width: 56px; height: 56px; background-color: #ECFDF5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; border: 2px solid #A7F3D0;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px;">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; color: #059669; text-transform: uppercase; display: block; margin-bottom: 0.25rem;">
                7-DAY VIP ACCESS UNLOCKED
              </span>
              
              <h3 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.45rem; font-weight: 800; color: #0F172A; margin: 0 0 0.5rem 0; text-transform: uppercase;">
                WELCOME, ${firstName.toUpperCase()}!
              </h3>
              
              <p style="font-size: 0.9rem; line-height: 1.55; color: #4B5563; max-width: 380px; margin: 0 auto 1.25rem auto;">
                Your 7-day all-access pass is active! A full confirmation email with gym location and pass details has been sent to <strong>${emailVal}</strong>.
              </p>

              <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1rem; margin-bottom: 1.25rem; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.82rem;">
                  <span style="color: #64748B; font-weight: 600;">PASS ID:</span>
                  <span style="color: #0F172A; font-weight: 800;">#IF-TRIAL-${String(data.leadId).padStart(4, '0')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.82rem;">
                  <span style="color: #64748B; font-weight: 600;">DURATION:</span>
                  <span style="color: #059669; font-weight: 700;">7 Days (Valid From Today)</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.82rem;">
                  <span style="color: #64748B; font-weight: 600;">LOCATION:</span>
                  <span style="color: #0F172A; font-weight: 700;">S.G. Highway, Bodakdev</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem;">
                  <span style="color: #64748B; font-weight: 600;">TIME SLOT:</span>
                  <span style="color: #0F172A; font-weight: 700;">${timeVal}</span>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 0.85rem 1.25rem; background-color: #25D366; color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
                  <span>RECEIVE PASS ON WHATSAPP &rarr;</span>
                </a>

                <button type="button" onclick="location.reload();" style="background: transparent; border: none; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem; font-weight: 700; color: #64748B; cursor: pointer; padding: 0.5rem;">
                  Book Another Free Trial
                </button>
              </div>
            </div>
          `;
          formCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        alert(data.message || 'Could not submit your pass request. Please check the fields and try again.');
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
    } finally {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  });
}

/**
 * 7. Demo Directions Notice Modal
 * Handles safe demo directions notice without sending users to a random address
 */
function initDirectionsModal() {
  const directionsBtns = document.querySelectorAll('.btn-trigger-directions, #btn-get-directions');
  const modal = document.getElementById('directions-modal');
  const closeBtn = document.getElementById('btn-close-directions-modal');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  directionsBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/**
 * 8. Legal Notice Modal for Footer Privacy & Terms Links
 */
function initLegalModal() {
  const legalLinks = document.querySelectorAll('.footer-legal-link');
  const modal = document.getElementById('legal-notice-modal');
  const closeBtn = document.getElementById('btn-close-legal-modal');
  const titleEl = document.getElementById('legal-modal-title');
  const descEl = document.getElementById('legal-modal-desc');

  if (!modal) return;

  const openLegal = (title, msg) => {
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = msg;
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeLegal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  legalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const isPrivacy = link.textContent.includes('Privacy');
      if (isPrivacy) {
        openLegal(
          'PRIVACY POLICY (DEMO)',
          'This is a demonstration website for IRONFORGE FITNESS. No personal data submitted through this demo is stored in an external production database or sold to third parties.'
        );
      } else {
        openLegal(
          'TERMS OF SERVICE (DEMO)',
          'All plans, pricing (₹1,499–₹4,999), schedules, and facility details presented are part of the IRONFORGE demo showcase and subject to final client policies before commercial launch.'
        );
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLegal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLegal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeLegal();
    }
  });
}

/**
 * 9. Interactive Map UI Mockup Controls
 * Handles subtle visual interaction for map control buttons
 */
function initMapControls() {
  const pin = document.getElementById('map-interactive-pin');
  const recenterBtn = document.getElementById('btn-map-recenter');
  const zoomInBtn = document.getElementById('btn-map-zoom-in');
  const zoomOutBtn = document.getElementById('btn-map-zoom-out');
  const canvas = document.getElementById('map-canvas-container');

  if (!pin) return;

  let currentScale = 1.0;

  if (recenterBtn && canvas) {
    recenterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentScale = 1.0;
      canvas.style.transform = 'scale(1.0)';
      pin.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (zoomInBtn && canvas) {
    zoomInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentScale = Math.min(currentScale + 0.15, 1.45);
      canvas.style.transform = `scale(${currentScale})`;
      canvas.style.transition = 'transform 0.3s ease';
    });
  }

  if (zoomOutBtn && canvas) {
    zoomOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentScale = Math.max(currentScale - 0.15, 0.85);
      canvas.style.transform = `scale(${currentScale})`;
      canvas.style.transition = 'transform 0.3s ease';
    });
  }
}

/**
 * 10. Vanilla JS Fullscreen Image Lightbox Viewer for Gym Gallery
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!galleryItems.length || !lightbox || !lightboxImg) return;

  const galleryData = Array.from(galleryItems).map((item, idx) => ({
    src: item.getAttribute('data-src') || item.querySelector('img')?.src,
    title: item.getAttribute('data-title') || 'FACILITY EXPERIENCE',
    alt: item.querySelector('img')?.alt || 'Ironforge Facility',
    index: idx
  }));

  let currentIndex = 0;

  const updateLightboxContent = (index) => {
    const item = galleryData[index];
    if (!item) return;

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxCounter) lightboxCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(galleryData.length).padStart(2, '0')}`;
      lightboxImg.style.opacity = '1';
    }, 120);
  };

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightboxContent(currentIndex);
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent(currentIndex);
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightboxContent(currentIndex);
  };

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  // Close when clicking modal backdrop outside stage
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  });
}

/**
 * 11. Accessible FAQ Accordion (Single Item Open Behavior)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 12. Smart Floating Contact & Conversion Actions
 * Handles scroll visibility and smooth free trial trigger
 */
function initFloatingActions() {
  const floatingContainer = document.getElementById('floating-actions-container');
  const btnTrial = document.getElementById('btn-floating-trial');
  const contactSection = document.getElementById('contact');

  if (!floatingContainer) return;

  // Free Trial Button -> Smooth Scroll to #contact
  if (btnTrial) {
    btnTrial.addEventListener('click', (e) => {
      e.preventDefault();
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.offsetHeight : 80;
      if (contactSection) {
        const targetPos = contactSection.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 16);
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  }

  // Smart Visibility on Scroll (using requestAnimationFrame)
  let scrollTicking = false;

  const updateFloatingVisibility = () => {
    const scrollY = window.scrollY;
    
    // Hide near top (< 400px)
    if (scrollY < 400) {
      floatingContainer.classList.remove('is-visible');
      scrollTicking = false;
      return;
    }

    // Check if #contact section is strongly in view
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect();
      const inContactView = (rect.top <= window.innerHeight * 0.65) && (rect.bottom >= window.innerHeight * 0.25);
      
      if (inContactView) {
        floatingContainer.classList.remove('is-visible');
      } else {
        floatingContainer.classList.add('is-visible');
      }
    } else {
      floatingContainer.classList.add('is-visible');
    }

    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateFloatingVisibility);
      scrollTicking = true;
    }
  }, { passive: true });

  updateFloatingVisibility();
}
