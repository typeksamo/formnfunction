/* ============================================
   Form & Function — Shared JS Components
   ============================================ */

// ─── Language state ───────────────────────────
const LANG_KEY = 'ff_lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

function getLang() { return currentLang; }
function setLang(l) {
  currentLang = l;
  localStorage.setItem(LANG_KEY, l);
  window.dispatchEvent(new CustomEvent('langchange', { detail: l }));
}

// ─── Navigation ───────────────────────────────
function buildNav(activePage, darkHero) {
  const nav = document.createElement('nav');
  nav.className = 'nav' + (darkHero ? ' on-dark' : ' scrolled');
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="nav-logo" aria-label="Form & Function Home">
        <img class="nav-logo-light" src="logo1.png" alt="Form & Function">
        <img class="nav-logo-dark"  src="logo2.svg" alt="Form & Function">
      </a>
      <ul class="nav-links" id="nav-links">
        <li><a href="/" ${activePage === 'home' ? 'class="active"' : ''} data-en="Home" data-cs="Domů">Home</a></li>
        <li><a href="/about" ${activePage === 'about' ? 'class="active"' : ''} data-en="About" data-cs="O mně">About</a></li>
        <li class="nav-dropdown-wrap">
          <a href="#" class="nav-dropdown-toggle" data-en="Services" data-cs="Služby">Services ▾</a>
          <ul class="nav-dropdown">
            <li><a href="/nutrition" data-en="Nutrition" data-cs="Výživa">Nutrition</a></li>
            <li><a href="/training" data-en="Training" data-cs="Trénink">Training</a></li>
            <li><a href="/massage" data-en="Massage" data-cs="Masáže">Massage Therapy</a></li>
            <li><a href="/education" data-en="Education" data-cs="Vzdělávání">Education</a></li>
          </ul>
        </li>
        <li><a href="/contact" ${activePage === 'contact' ? 'class="active"' : ''} data-en="Contact" data-cs="Kontakt">Contact</a></li>
        <li class="nav-divider-item" aria-hidden="true"></li>
        <li><a href="https://calendly.com/formnfunction/free-consultation" class="nav-cta" data-en="Book Free Call" data-cs="Domluvit konzultaci">Book Free Call</a></li>
        <li>
          <div class="nav-lang">
            <button class="lang-btn" id="btn-en" onclick="setLang('en')">EN</button>
            <span class="lang-divider">|</span>
            <button class="lang-btn" id="btn-cz" onclick="setLang('cs')">CZ</button>
          </div>
        </li>
      </ul>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  // Add dropdown styles inline
  const style = document.createElement('style');
  style.textContent = `
    .nav-dropdown-wrap { position: relative; }
    .nav-dropdown-wrap::after {
      content: '';
      position: absolute;
      top: 100%;
      left: -16px;
      right: -16px;
      height: 16px;
    }
    .nav-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      left: -16px;
      background: var(--white);
      border-radius: 4px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      list-style: none;
      padding: 8px 0;
      min-width: 180px;
      z-index: 200;
    }
    .nav-dropdown li a {
      display: block !important;
      padding: 10px 20px !important;
      color: var(--brown) !important;
      font-size: 13px !important;
      transition: background 0.15s;
      text-transform: none !important;
      letter-spacing: 0.02em !important;
      opacity: 1 !important;
    }
    .nav-dropdown li a:hover { background: var(--cream); color: var(--green) !important; }
    .nav-dropdown-wrap:hover .nav-dropdown { display: block; }
    .nav-dropdown:hover { display: block; }
    @media (max-width: 768px) {
      .nav-dropdown { position: static; box-shadow: none; padding: 0 0 0 16px; background: transparent; display: none; }
      .nav-dropdown-wrap.open .nav-dropdown { display: block; }
      .nav-dropdown li a { padding: 10px 0 !important; color: var(--brown) !important; }
    }
  `;
  document.head.appendChild(style);

  document.head.appendChild(document.createElement('div'));
  document.body.insertAdjacentElement('afterbegin', nav);

  // Scroll behaviour
  if (darkHero) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
        nav.classList.remove('on-dark');
      } else {
        nav.classList.remove('scrolled');
        nav.classList.add('on-dark');
      }
    });
  }

  // Hamburger
  const hamburger = nav.querySelector('#nav-hamburger');
  const links = nav.querySelector('#nav-links');
  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Dropdown toggle on mobile
  const dropToggle = nav.querySelector('.nav-dropdown-toggle');
  if (dropToggle) {
    dropToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropToggle.closest('.nav-dropdown-wrap').classList.toggle('open');
      }
    });
  }

  // Language
  updateLangUI();
  window.addEventListener('langchange', updateLangUI);

  function updateLangUI() {
    const l = getLang();
    nav.querySelectorAll('#btn-en, #btn-cz').forEach(b => b.classList.remove('active'));
    const activeBtn = nav.querySelector('#btn-' + (l === 'cs' ? 'cz' : 'en'));
    if (activeBtn) activeBtn.classList.add('active');
    nav.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = l === 'cs' ? el.dataset.cs : el.dataset.en;
    });
  }
}

// ─── Footer ───────────────────────────────────
function buildFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-bottom" style="max-width:1280px;margin:0 auto;padding:0;border-top:none;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
      <div class="footer-social" style="display:flex;gap:12px">
        <a href="https://www.instagram.com/formnfunction_coaching/" target="_blank" aria-label="Instagram" style="width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);transition:all 0.2s" onmouseover="this.style.borderColor='#C2A68C';this.style.color='#C2A68C'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)';this.style.color='rgba(255,255,255,0.5)'">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61565112507236" target="_blank" aria-label="Facebook" style="width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);transition:all 0.2s" onmouseover="this.style.borderColor='#C2A68C';this.style.color='#C2A68C'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)';this.style.color='rgba(255,255,255,0.5)'">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
      </div>
      <p style="font-size:13px;color:rgba(255,255,255,0.5)">MSc. Kristýna Čočková</p>
      <p style="font-size:12px;color:rgba(255,255,255,0.4);display:flex;gap:16px;flex-wrap:wrap">
        <a href="tel:+420606074569" style="color:rgba(255,255,255,0.4);transition:color 0.2s" onmouseover="this.style.color='#C2A68C'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">🇨🇿 +420 606 074 569</a>
        <a href="tel:+353851301311" style="color:rgba(255,255,255,0.4);transition:color 0.2s" onmouseover="this.style.color='#C2A68C'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">🇮🇪 +353 85 130 1311</a>
      </p>
      <p style="font-size:12px;color:rgba(255,255,255,0.3)">
        <a href="/gdpr" style="color:rgba(255,255,255,0.35);transition:color 0.2s" onmouseover="this.style.color='#C2A68C'" onmouseout="this.style.color='rgba(255,255,255,0.35)'">Privacy Policy</a>
        &nbsp;·&nbsp;
        <a href="/terms" style="color:rgba(255,255,255,0.35);transition:color 0.2s" onmouseover="this.style.color='#C2A68C'" onmouseout="this.style.color='rgba(255,255,255,0.35)'">Terms & Conditions</a>
      </p>
    </div>
  `;
  document.body.appendChild(footer);
}

// ─── Accordion ────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.classList.contains('open');
      // Close all in same container
      const parent = trigger.closest('.accordion-group') || document;
      parent.querySelectorAll('.accordion-trigger').forEach(t => {
        t.classList.remove('open');
        const c = t.nextElementSibling;
        if (c) c.classList.remove('open');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        trigger.classList.add('open');
        const content = trigger.nextElementSibling;
        if (content) content.classList.add('open');
      }
    });
  });
}

// ─── Scroll reveal ────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => obs.observe(el));
}

// ─── Apply language to page ───────────────────
function applyLang() {
  const l = getLang();
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = l === 'cs' ? (el.dataset.cs || el.dataset.en) : el.dataset.en;
    } else {
      el.innerHTML = l === 'cs' ? (el.dataset.cs || el.dataset.en) : el.dataset.en;
    }
  });
}

window.addEventListener('langchange', applyLang);

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initReveal();
  setTimeout(applyLang, 50);
});
