// script.js
function toggleCard(card) {
  // Prevent multiple rapid toggles
  if (card.classList.contains('animating')) {
      return;
  }
  
  // Add animating class to prevent multiple toggles
  card.classList.add('animating');
  
  // Find the content element
  const content = card.querySelector('.project-content');
  
  // Toggle expanded state
  const isExpanding = !card.classList.contains('expanded');
  card.classList.toggle('expanded');
  
  if (isExpanding) {
      // Show content first to measure it
      content.style.visibility = 'visible';
      content.style.height = 'auto';
      
      // Get the natural height
      const naturalHeight = content.offsetHeight;
      
      // Reset to start animation
      content.style.height = '0';
      
      // Force browser reflow
      content.offsetHeight;
      
      // Start animation
      content.style.height = naturalHeight + 'px';
      content.style.opacity = '1';
      
      // After animation completes
      setTimeout(() => {
          content.style.height = 'auto';
          card.classList.remove('animating');
      }, 400);
  } else {
      // Collapse animation
      // First set explicit height for animation
      content.style.height = content.offsetHeight + 'px';
      
      // Force browser reflow
      content.offsetHeight;
      
      // Start collapse animation
      content.style.height = '0';
      content.style.opacity = '0';
      
      // After animation completes
      setTimeout(() => {
          content.style.visibility = 'hidden';
          card.classList.remove('animating');
      }, 400);
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  });
});

// Add scroll-based animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.content-card, .project-card');
  
  elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // Check if element is in viewport
      if (position.top < window.innerHeight * 0.9) {
          element.classList.add('fade-in');
      }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in class for initial animations
  handleScrollAnimations();
  
  // Add scroll listener for scroll-based animations
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Add active state to navigation links based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (window.pageYOffset >= sectionTop - 60) {
              current = section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
              link.classList.add('active');
          }
      });
  });
});

// Mobile menu handling
const mobileMenuToggle = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (mobileMenuToggle && navbarCollapse) {
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
      const isClickInside = navbarCollapse.contains(e.target) || mobileMenuToggle.contains(e.target);
      
      if (!isClickInside && navbarCollapse.classList.contains('show')) {
          mobileMenuToggle.click();
      }
  });
  
  // Close mobile menu when clicking nav links
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
          if (navbarCollapse.classList.contains('show')) {
              mobileMenuToggle.click();
          }
      });
  });
}