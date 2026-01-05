// Enhanced smooth scrolling utility
export const smoothScrollTo = (targetId, offset = 80) => {
  const targetElement = document.querySelector(targetId);
  
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - offset;
  const duration = 1000; // 1 second
  let start = null;

  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// Easing function for smooth animation
const easeInOutCubic = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
};

// Enhanced click handler for smooth scrolling
export const handleSmoothScrollClick = (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;
  
  e.preventDefault();
  const targetId = target.getAttribute('href');
  smoothScrollTo(targetId);
};

// Initialize smooth scrolling
export const initSmoothScrolling = () => {
  document.addEventListener('click', handleSmoothScrollClick);
  
  return () => {
    document.removeEventListener('click', handleSmoothScrollClick);
  };
}; 