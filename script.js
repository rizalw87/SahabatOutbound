/* ============================================
   SAHABAT OUTBOUND - Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---------- WhatsApp Config ----------
  const WA_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp
  const WA_MESSAGE = 'Halo Sahabat Outbound, saya tertarik dengan layanan outbound untuk perusahaan kami. Bisa jelaskan lebih lanjut?';

  // ---------- Page Loader ----------
  function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('loaded');
        setTimeout(function () {
          loader.remove();
        }, 400);
      }, 300);
    });
  }

  // ---------- Navbar Scroll ----------
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---------- Mobile Menu ----------
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');
    if (!toggle || !navLinks) return;

    function openMenu() {
      toggle.classList.add('active');
      navLinks.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ---------- Back to Top ----------
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    function toggleBtn() {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleBtn, { passive: true });
    toggleBtn();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- WhatsApp Float ----------
  function initWhatsApp() {
    const waBtn = document.querySelector('.float-wa');
    if (!waBtn) return;

    waBtn.addEventListener('click', function () {
      const url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_MESSAGE);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // ---------- WhatsApp CTA Buttons ----------
  function initCTAButtons() {
    document.querySelectorAll('[data-wa]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var msg = this.getAttribute('data-wa-message') || WA_MESSAGE;
        var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    });
  }

  // ---------- Scroll Reveal ----------
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---------- FAQ Accordion ----------
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        // Close all
        faqItems.forEach(function (fi) {
          fi.classList.remove('active');
          var fa = fi.querySelector('.faq-answer');
          if (fa) fa.style.maxHeight = null;
        });

        // Open clicked
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // ---------- Blog Modal ----------

  // ---------- Counter Animation ----------
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      observer.observe(el);
    });

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1500;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }
      requestAnimationFrame(step);
    }
  }

  // ---------- Smooth Anchor Links ----------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ---------- Gallery Lightbox ----------
  function initGalleryLightbox() {
    var items = document.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    // Create lightbox
    var lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    lightbox.style.cssText = 'position:fixed;inset:0;background:rgba(10,10,15,0.95);z-index:3000;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all 0.3s ease;cursor:pointer;padding:24px;';
    var lbImg = document.createElement('img');
    lbImg.style.cssText = 'max-width:90%;max-height:85vh;object-fit:contain;border-radius:12px;transition:transform 0.3s ease;';
    lightbox.appendChild(lbImg);
    document.body.appendChild(lightbox);

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        var img = this.querySelector('img');
        if (img) {
          lbImg.src = img.src;
          lbImg.alt = img.alt;
          lightbox.style.opacity = '1';
          lightbox.style.visibility = 'visible';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    lightbox.addEventListener('click', function () {
      lightbox.style.opacity = '0';
      lightbox.style.visibility = 'hidden';
      document.body.style.overflow = '';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.style.visibility === 'visible') {
        lightbox.style.opacity = '0';
        lightbox.style.visibility = 'hidden';
        document.body.style.overflow = '';
      }
    });
  }

  // ---------- Init All ----------
  function init() {
    initPageLoader();
    initNavbar();
    initMobileMenu();
    initBackToTop();
    initWhatsApp();
    initCTAButtons();
    initScrollReveal();
    initFAQ();
    initCounters();
    initSmoothScroll();
    initGalleryLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
