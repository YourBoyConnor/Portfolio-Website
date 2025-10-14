// Enhanced Navigation functionality
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const mobileOverlay = document.getElementById("mobile-overlay");
const navbar = document.getElementById("navbar");

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
});

// Close mobile menu when clicking overlay
mobileOverlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  hamburger.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = "auto";
  });
});

// Active navigation state management
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active nav link on page load
window.addEventListener('load', updateActiveNavLink);

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

// Enhanced typing animation for hero section
function typeWriter(element, text, speed = 80, isReplay = false) {
  let i = 0;
  
  // Add fade effect for replay
  if (isReplay) {
    element.style.opacity = '0.3';
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      element.style.transition = 'all 0.3s ease';
    }, 200);
  }
  
  element.innerHTML = '';
  
  // Add a slight delay before starting
  setTimeout(() => {
    function type() {
      if (i < text.length) {
        // Simply add characters without spans to avoid cursor issues
        element.innerHTML += text.charAt(i);
        i++;
        
        // Vary the speed slightly for more natural typing
        const randomDelay = speed + (Math.random() * 40 - 20);
        setTimeout(type, randomDelay);
      } else {
        // Add a subtle completion effect
        element.style.animation = 'typewriterComplete 0.5s ease-out';
      }
    }
    
    type();
  }, isReplay ? 300 : 500);
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const text = typingElement.textContent;
    typeWriter(typingElement, text, 80);
  }
});

// Add CSS for typing completion animation
const typingStyle = document.createElement('style');
typingStyle.textContent = `
  @keyframes typewriterComplete {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(typingStyle);

// Particle system for hero background
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// First View Animation System
class FirstViewAnimations {
  constructor() {
    this.animatedSections = new Set();
    this.observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupNavbarReset();
    this.animateHeroOnLoad();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedSections.has(entry.target.id)) {
          this.animateSection(entry.target);
          this.animatedSections.add(entry.target.id);
        }
      });
    }, this.observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
  }

  animateSection(section) {
    const sectionId = section.id;
    
    // Animate section title
    const title = section.querySelector('.section-title.first-view');
    if (title) {
      setTimeout(() => {
        title.classList.add('animate');
      }, 100);
    }

    // Animate section-specific elements
    switch(sectionId) {
      case 'about':
        this.animateAboutSection(section);
        break;
      case 'projects':
        this.animateProjectsSection(section);
        break;
      case 'experience':
        this.animateExperienceSection(section);
        break;
      case 'contact':
        this.animateContactSection(section);
        break;
    }
  }

  animateAboutSection(section) {
    const skillItems = section.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, 200 + (index * 150));
    });
  }

  animateProjectsSection(section) {
    const projectCards = section.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, 200 + (index * 100));
    });
  }

  animateExperienceSection(section) {
    const timelineItems = section.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, 200 + (index * 200));
    });
  }

  animateContactSection(section) {
    const contactInfo = section.querySelector('.contact-info');
    const contactForm = section.querySelector('.contact-form');
    
    if (contactInfo) {
      setTimeout(() => {
        contactInfo.classList.add('animate');
      }, 200);
    }
    
    if (contactForm) {
      setTimeout(() => {
        contactForm.classList.add('animate');
      }, 400);
    }
  }

  setupNavbarReset() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        this.resetSection(targetId);
      });
    });
  }

  resetSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Remove from animated sections to allow re-animation
    this.animatedSections.delete(sectionId);

    // Reset section title
    const title = section.querySelector('.section-title.first-view');
    if (title) {
      title.classList.remove('animate');
      title.classList.add('reset');
      setTimeout(() => {
        title.classList.remove('reset');
        title.classList.add('animate');
      }, 200);
    }

    // Reset section-specific elements
    switch(sectionId) {
      case 'about':
        this.resetAboutSection(section);
        break;
      case 'projects':
        this.resetProjectsSection(section);
        break;
      case 'experience':
        this.resetExperienceSection(section);
        break;
      case 'contact':
        this.resetContactSection(section);
        break;
      case 'hero':
        this.resetHeroSection(section);
        break;
    }
  }

  resetAboutSection(section) {
    const skillItems = section.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.classList.remove('animate');
      item.classList.add('reset');
    });
    
    setTimeout(() => {
      skillItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove('reset');
          item.classList.add('animate');
        }, index * 150);
      });
    }, 200);
  }

  resetProjectsSection(section) {
    const projectCards = section.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.classList.remove('animate');
      card.classList.add('reset');
    });
    
    setTimeout(() => {
      projectCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove('reset');
          card.classList.add('animate');
        }, index * 100);
      });
    }, 200);
  }

  resetExperienceSection(section) {
    const timelineItems = section.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.classList.remove('animate');
      item.classList.add('reset');
    });
    
    setTimeout(() => {
      timelineItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove('reset');
          item.classList.add('animate');
        }, index * 200);
      });
    }, 200);
  }

  resetContactSection(section) {
    const contactInfo = section.querySelector('.contact-info');
    const contactForm = section.querySelector('.contact-form');
    
    [contactInfo, contactForm].forEach(element => {
      if (element) {
        element.classList.remove('animate');
        element.classList.add('reset');
      }
    });
    
    setTimeout(() => {
      if (contactInfo) {
        contactInfo.classList.remove('reset');
        contactInfo.classList.add('animate');
      }
      if (contactForm) {
        setTimeout(() => {
          contactForm.classList.remove('reset');
          contactForm.classList.add('animate');
        }, 200);
      }
    }, 200);
  }

  resetHeroSection(section) {
    const heroContent = section.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.remove('animate');
      heroContent.classList.add('reset');
      
      setTimeout(() => {
        heroContent.classList.remove('reset');
        heroContent.classList.add('animate');
      }, 200);
    }
  }

  animateHeroOnLoad() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add('animate');
      }, 500);
    }
  }
}

// Initialize first view animations
const firstViewAnimations = new FirstViewAnimations();

// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease-in-out';
      } else {
        card.style.display = 'none';
      }
    });
  });
});


// Parallax scrolling effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.particles-container');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Enhanced navbar scroll effects
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-10px) scale(1.05)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0) scale(1)';
  });
});

// Project cards 3D tilt effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Scroll progress indicator
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  
  if (!scrollProgress || !navbar) return;
  
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  // Update the top progress bar
  scrollProgress.style.width = scrollPercent + '%';
  
  // Update the navbar progress line
  navbar.style.setProperty('--scroll-progress', scrollPercent + '%');
  
  // Add/remove scrolled class based on scroll position
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateScrollProgress);

// Navbar logo click animation
const navLogo = document.querySelector('.nav-logo');
const logoContainer = document.querySelector('.logo-container');

function handleLogoClick(e) {
  e.preventDefault();
  const logo = navLogo.querySelector('.logo');
  if (logo) {
    logo.style.transform = 'scale(1.2)';
    setTimeout(() => {
      logo.style.transform = 'scale(1)';
    }, 300);
  }
  
  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Replay typing animation after scroll completes
  setTimeout(() => {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
      const text = typingElement.textContent;
      typeWriter(typingElement, text, 80, true); // true for replay effect
    }
  }, 800); // Wait for scroll to complete
}

// Add click listeners to both the link and container
if (navLogo) {
  navLogo.addEventListener('click', handleLogoClick);
}

if (logoContainer) {
  logoContainer.addEventListener('click', handleLogoClick);
}

// Navbar link hover sound effect (visual feedback)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-2px) scale(1.05)';
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateY(0) scale(1)';
  });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Navbar performance optimization
let ticking = false;
function updateNavbarOnScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveNavLink();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', updateNavbarOnScroll);

// Contact Form Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Success
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        // Error
        showNotification(result.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification('Network error. Please check your connection and try again.', 'error');
    } finally {
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '500',
    zIndex: '10000',
    maxWidth: '400px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-out'
  });
  
  // Set background color based on type
  if (type === 'success') {
    notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
  } else if (type === 'error') {
    notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
  } else {
    notification.style.background = 'linear-gradient(135deg, #A4D7BC, #75BA95)';
  }
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Console easter egg
console.log('%c👋 Hello there!', 'color: #A4D7BC; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #75BA95; font-size: 14px;');
console.log('%cFeel free to explore the code and reach out if you have any questions.', 'color: #ccc; font-size: 12px;');

