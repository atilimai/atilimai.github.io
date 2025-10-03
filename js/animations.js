// Animation Controllers for Atılım AI Community Website

// Performance monitoring
let frameCount = 0;
let lastTime = performance.now();
let fps = 60;

function monitorPerformance() {
  const currentTime = performance.now();
  frameCount++;
  
  if (currentTime >= lastTime + 1000) {
    fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
    frameCount = 0;
    lastTime = currentTime;
    
    // If FPS drops below 30, reduce particle count
    if (fps < 30) {
      const particlesContainer = document.getElementById('particles');
      if (particlesContainer && particlesContainer.children.length > 10) {
        // Remove half the particles
        const particles = Array.from(particlesContainer.children);
        particles.slice(0, Math.floor(particles.length / 2)).forEach(p => p.remove());
      }
    }
  }
  
  requestAnimationFrame(monitorPerformance);
}

// Start performance monitoring
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  requestAnimationFrame(monitorPerformance);
}

// Particle System
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  
  // Determine particle count based on device
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 20 : 40;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Randomize position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-10px`;
    
    // Randomize size (2-6px)
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Randomize animation duration (10-20s)
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Randomize animation delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', createParticles);

// Debounced resize handler for better performance
let resizeTimer;
let rafId;

function debounce(func, wait) {
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(resizeTimer);
      func(...args);
    };
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(later, wait);
  };
}

// Optimized resize handler using requestAnimationFrame
const handleResize = debounce(() => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  
  rafId = requestAnimationFrame(() => {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      particlesContainer.innerHTML = '';
      createParticles();
    }
  });
}, 250);

window.addEventListener('resize', handleResize, { passive: true });
