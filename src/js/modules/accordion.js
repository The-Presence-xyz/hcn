export class Accordion {
  constructor(selector = '[data-accordion]') {
    this.accordionTitles = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.accordionTitles.forEach((title) => {
      const options = title.nextElementSibling;
      this.setupInitialState(title, options);
      this.setupClickHandler(title, options);
    });

    // Оптимізований resize handler з debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.updateAccordionHeights(), 250);
    });
  }

  setupInitialState(title, options) {
    if (!options) return;

    if (title.hasAttribute('data-open')) {
      title.classList.add('active');
      options.classList.add('active');
      options.style.maxHeight = `${options.scrollHeight}px`;
    } else {
      options.style.maxHeight = '0';
    }
  }

  setupClickHandler(title, options) {
    if (!options) return;

    title.addEventListener('click', () => {
      title.classList.toggle('active');
      const isActive = options.classList.contains('active');
      
      options.classList.toggle('active');
      options.style.maxHeight = isActive ? '0' : `${options.scrollHeight}px`;
    });
  }

  updateAccordionHeights() {
    this.accordionTitles.forEach((title) => {
      const options = title.nextElementSibling;
      if (options?.classList.contains('active')) {
        options.style.maxHeight = `${options.scrollHeight}px`;
      }
    });
  }
} 