// Main JavaScript for Atılım AI Community Website

// Theme Management
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const logo = document.getElementById('logo');
const html = document.documentElement;

// Initialize theme from localStorage or default to dark
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme, false);
}

// Set theme and update logo
function setTheme(theme, animate = true) {
  html.setAttribute('data-theme', theme);
  
  // Update theme icon and aria-label
  themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  
  // Update logo with fade animation
  if (animate) {
    logo.classList.add('theme-switching');
  }
  
  // Update logo source
  const logoSrc = theme === 'light' 
    ? logo.getAttribute('data-light-src') 
    : logo.getAttribute('data-dark-src');
  
  logo.src = logoSrc;
  
  // Remove animation class after animation completes
  if (animate) {
    setTimeout(() => {
      logo.classList.remove('theme-switching');
    }, 300);
  }
  
  // Save to localStorage
  localStorage.setItem('theme', theme);
}

// Toggle theme
function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);

// Keyboard support for theme toggle
themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleTheme();
  }
});

// Initialize on page load
initTheme();

// Language Management
const langButtons = document.querySelectorAll('.lang-btn');
const langIndicator = document.querySelector('.lang-indicator');

// Initialize language from localStorage or default to Turkish
function initLanguage() {
  const savedLang = localStorage.getItem('language') || 'tr';
  setLanguage(savedLang);
}

// Set language
function setLanguage(lang) {
  // Update all elements with data-tr and data-en attributes
  const elements = document.querySelectorAll('[data-tr][data-en]');
  elements.forEach(element => {
    const text = lang === 'tr' ? element.getAttribute('data-tr') : element.getAttribute('data-en');
    element.textContent = text;
  });
  
  // Update active button and ARIA states
  langButtons.forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
  
  // Move indicator
  if (lang === 'en') {
    langIndicator.classList.add('en');
  } else {
    langIndicator.classList.remove('en');
  }
  
  // Update HTML lang attribute
  html.setAttribute('lang', lang);
  
  // Save to localStorage
  localStorage.setItem('language', lang);
}

// Language button event listeners
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    setLanguage(lang);
  });
  
  // Keyboard support for language buttons
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    }
  });
});

// Initialize language on page load
initLanguage();

// About Section Toggle
const aboutToggle = document.querySelector('.about-toggle');
const aboutContent = document.querySelector('.about-content');
const chevron = document.querySelector('.chevron');

function toggleAbout() {
  const isExpanded = aboutToggle.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    // Collapse
    aboutToggle.setAttribute('aria-expanded', 'false');
    aboutContent.setAttribute('hidden', '');
    // Chevron rotates back via CSS (aria-expanded selector)
  } else {
    // Expand
    aboutToggle.setAttribute('aria-expanded', 'true');
    aboutContent.removeAttribute('hidden');
    // Chevron rotates 180deg via CSS (aria-expanded selector)
  }
}

aboutToggle.addEventListener('click', toggleAbout);

// Keyboard accessibility for about toggle
aboutToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleAbout();
  }
});
