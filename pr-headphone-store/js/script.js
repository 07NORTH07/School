/* ===================================
   3legant — script.js
   Burger menu + Arrivals slider
=================================== */

(function () {
  'use strict';

  /* ============================
     ANNOUNCEMENT BAR
  ============================ */
  const announceBar = document.querySelector('.announcement-bar');
  const announceClose = document.querySelector('.announcement-close');

  if (announceClose) {
    announceClose.addEventListener('click', () => {
      announceBar.classList.add('hidden');
    });
  }

  /* ============================
     BURGER MENU
  ============================ */
  const burgerBtn   = document.getElementById('burgerBtn');
  const mobileNav   = document.getElementById('mobileNav');
  const navOverlay  = document.getElementById('navOverlay');

  function openNav() {
    burgerBtn.classList.add('is-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    navOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    burgerBtn.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    navOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeNav();
    }
  });

  /* ============================
     DROPDOWN ITEMS IN NAV
  ============================ */
  const dropBtns = document.querySelectorAll('.mobile-nav__link--dropdown');

  dropBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const dropdown = document.getElementById(targetId);
      if (!dropdown) return;

      const isOpen = dropdown.classList.contains('is-open');

      document.querySelectorAll('.mobile-nav__dropdown.is-open').forEach((el) => {
        el.classList.remove('is-open');
      });
      document.querySelectorAll('.mobile-nav__link--dropdown.is-open').forEach((el) => {
        el.classList.remove('is-open');
      });

      if (!isOpen) {
        dropdown.classList.add('is-open');
        btn.classList.add('is-open');
      }
    });
  });

  /* ============================
     NEW ARRIVALS SLIDER
  ============================ */
  const viewport    = document.getElementById('sliderViewport');
  const track       = document.getElementById('sliderTrack');
  const prevBtn     = document.getElementById('sliderPrev');
  const nextBtn     = document.getElementById('sliderNext');
  const dotsWrap    = document.getElementById('sliderDots');

  if (!track) return;

  const cards       = Array.from(track.querySelectorAll('.product-card'));
  const VISIBLE     = 2;
  const total       = cards.length;
  const maxIndex    = total - VISIBLE;
  let currentIndex  = 0;
  let startX        = 0;
  let isDragging    = false;
  let dragDelta     = 0;

  const dotCount = maxIndex + 1;
  const dots = [];

  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('button');
    dot.classList.add('arrivals__dot');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    dots.push(dot);
  }

  function getCardWidth() {
    if (!cards[0]) return 0;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 14;
    return cards[0].getBoundingClientRect().width + gap;
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const offset = currentIndex * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;

    dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIndex));

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  goTo(0);

  viewport.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    dragDelta = 0;
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    dragDelta = e.touches[0].clientX - startX;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    const threshold = 40;
    if (dragDelta < -threshold) {
      goTo(currentIndex + 1);
    } else if (dragDelta > threshold) {
      goTo(currentIndex - 1);
    }
  });

  viewport.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    dragDelta = 0;
    track.style.transition = 'none';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dragDelta = e.clientX - startX;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const threshold = 40;
    if (dragDelta < -threshold) {
      goTo(currentIndex + 1);
    } else if (dragDelta > threshold) {
      goTo(currentIndex - 1);
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(currentIndex), 150);
  });

  /* ============================
     COUNTDOWN TIMER
  ============================ */
  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');

  if (cdSecs) {
    // Target: 2 days, 12 hours, 45 min, 5 sec from now
    const target = new Date();
    target.setDate(target.getDate() + 2);
    target.setHours(target.getHours() + 12);
    target.setMinutes(target.getMinutes() + 45);
    target.setSeconds(target.getSeconds() + 5);

    function pad(n) { return String(n).padStart(2, '0'); }

    function updateCountdown() {
      const diff = target - Date.now();
      if (diff <= 0) {
        cdDays.textContent = cdHours.textContent = cdMins.textContent = cdSecs.textContent = '00';
        return;
      }
      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000) / 60000);
      const secs  = Math.floor((diff % 60000) / 1000);
      cdDays.textContent  = pad(days);
      cdHours.textContent = pad(hours);
      cdMins.textContent  = pad(mins);
      cdSecs.textContent  = pad(secs);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

})();
