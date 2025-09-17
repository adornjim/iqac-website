(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function updateFooterYear() {
    var footerBottom = document.querySelector('.footer-bottom');
    if (!footerBottom) return;
    var text = footerBottom.textContent || '';
    var currentYear = new Date().getFullYear();
    // Replace a 4-digit year if present; otherwise append current year before the rest
    if (/\b\d{4}\b/.test(text)) {
      footerBottom.textContent = text.replace(/\b\d{4}\b/, String(currentYear));
    } else {
      footerBottom.textContent = '\u00A9 ' + currentYear + ' Christ (Deemed to be University). All rights reserved.';
    }
  }

  function setActiveNav() {
    var nav = document.querySelector('.navbar ul');
    if (!nav) return;

    var links = nav.querySelectorAll('a');
    var path = (location.pathname || '').toLowerCase();

    function fileName(p) {
      var parts = p.split('/');
      var last = parts[parts.length - 1] || '';
      return last || 'index.html';
    }

    var current = fileName(path);

    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      // Treat '#' as home on the homepage
      var isHome = href === '#' && (current === '' || current === 'index.html' || /\/$/.test(location.pathname));
      var matches = isHome || (href && href !== '#' && href.indexOf(current) !== -1);
      if (matches) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  function enableSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var hash = link.getAttribute('href');
        if (!hash || hash === '#') return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', hash);
      });
    });
  }

  function secureExternalLinks() {
    var anchors = document.querySelectorAll('a[href^="http"]');
    anchors.forEach(function (a) {
      try {
        var url = new URL(a.href);
        if (url.host !== location.host) {
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('target', '_blank');
        }
      } catch (e) {
        // ignore malformed URLs
      }
    });
  }

  function addBackToTop() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to top');
    btn.textContent = '▲';
    btn.style.position = 'fixed';
    btn.style.right = '18px';
    btn.style.bottom = '18px';
    btn.style.width = '40px';
    btn.style.height = '40px';
    btn.style.borderRadius = '20px';
    btn.style.border = '1px solid #14285a';
    btn.style.background = '#ffffff';
    btn.style.color = '#14285a';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
    btn.style.display = 'none';
    btn.style.zIndex = '9999';

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function () {
      var show = window.pageYOffset > 300;
      btn.style.display = show ? 'block' : 'none';
    });

    document.body.appendChild(btn);
  }

  function enhanceContactForm() {
    var form = document.querySelector('form.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('name') || {}).value || '';
      var email = (document.getElementById('email') || {}).value || '';
      var message = (document.getElementById('message') || {}).value || '';

      // Basic validation (in addition to HTML5 required attributes)
      var errors = [];
      if (name.trim().length < 2) errors.push('Please enter your full name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
      if (message.trim().length < 10) errors.push('Message should be at least 10 characters.');

      if (errors.length) {
        alert(errors.join('\n'));
        return;
      }

      // Formal acknowledgement (no backend configured)
      alert('Thank you for contacting IQAC. Your message has been recorded.');
      form.reset();
    });
  }

  onReady(function () {
    updateFooterYear();
    setActiveNav();
    enableSmoothScroll();
    secureExternalLinks();
    addBackToTop();
    enhanceContactForm();
  });
})();
