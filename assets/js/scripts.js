// ========================================
// PORTOFOLIO 3D - SCRIPTS.JS
// ========================================

// Utility Functions
const utils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Get mouse position relative to element
  getMousePos: (e, element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
};

// Tilt Effect Handler
class TiltEffect {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  handleMouseMove(e) {
    const mousePos = utils.getMousePos(e, this.element);
    const rect = this.element.getBoundingClientRect();
    
    const x = (mousePos.x / rect.width - 0.5) * 2;
    const y = (mousePos.y / rect.height - 0.5) * 2;
    
    const rotateX = y * 10;
    const rotateY = x * 10;
    
    this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  handleMouseLeave() {
    this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
}

// Theme Toggle Handler
class ThemeManager {
  constructor() {
    this.themeBtn = document.getElementById('themeBtn');
    this.init();
  }

  init() {
    this.themeBtn?.addEventListener('click', this.toggleTheme.bind(this));
  }

  toggleTheme() {
    const root = document.documentElement;
    const isNeon = root.style.getPropertyValue('--pri') === '#22d3ee';
    
    if (isNeon) {
      root.style.setProperty('--pri', '#7dd3fc');
      root.style.setProperty('--acc', '#a78bfa');
      this.themeBtn.textContent = 'Mode Neon';
    } else {
      root.style.setProperty('--pri', '#22d3ee');
      root.style.setProperty('--acc', '#f472b6');
      this.themeBtn.textContent = 'Mode Lembut';
    }
  }
}

// Navigation Handler
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

// Project Grid Handler
class ProjectGrid {
  constructor() {
    this.grid = document.getElementById('projectGrid');
    this.init();
  }

  init() {
    this.setupGridToggle();
  }

  setupGridToggle() {
    const gridBtn = document.getElementById('gridBtn');
    const masonryBtn = document.getElementById('masonryBtn');

    gridBtn?.addEventListener('click', () => this.setGridView());
    masonryBtn?.addEventListener('click', () => this.setMasonryView());
  }

  setGridView() {
    this.grid.style.columnCount = '';
    this.grid.className = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3';
  }

  setMasonryView() {
    this.grid.className = 'gap-6';
    this.grid.style.columnCount = 1;
    
    if (window.innerWidth >= 640) this.grid.style.columnCount = 2;
    if (window.innerWidth >= 1024) this.grid.style.columnCount = 3;
    
    [...this.grid.children].forEach(card => {
      card.style.breakInside = 'avoid';
      card.style.marginBottom = '1.5rem';
    });
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.note = document.getElementById('formNote');
    this.init();
  }

  init() {
    this.form?.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.note.textContent = 'Terima kasih! Pesan Anda terekam di halaman ini sebagai demo.';
    this.note.style.color = '#7dd3fc';
    
    setTimeout(() => {
      this.note.style.color = 'var(--mut)';
    }, 3000);
    
    this.form.reset();
  }
}

// Initialize All Components
document.addEventListener('DOMContentLoaded', () => {
  // Initialize tilt effects
  document.querySelectorAll('.tilt').forEach(card => new TiltEffect(card));
  
  // Initialize theme manager
  new ThemeManager();
  
  // Initialize navigation
  new Navigation();
  
  // Initialize project grid
  new ProjectGrid();
  
  // Initialize contact form
  new ContactForm();
  
  // Set current year
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Export for potential module usage
window.PortfolioApp = {
  TiltEffect,
  ThemeManager,
  Navigation,
  ProjectGrid,
  ContactForm
};
