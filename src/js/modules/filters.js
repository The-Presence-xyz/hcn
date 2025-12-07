export class Filters {
  constructor() {
    this.filterForm = document.querySelector('#filter');
    this.applyBtn = document.querySelector('.apply-btn');
    this.resetBtn = document.querySelector('.reset-btn');
    this.init();
  }

  init() {
    if (this.applyBtn) {
      this.applyBtn.addEventListener('click', this.handleApply.bind(this));
    }

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', this.handleReset.bind(this));
    }

    this.setupMobileFilters();
  }

  getSelectedFilters() {
    const selectedFilters = {};
    const filterItems = this.filterForm.querySelectorAll('.filter-item');

    filterItems.forEach((filterItem) => {
      const key = filterItem.dataset.key;
      if (!key) return;

      const inputs = filterItem.querySelectorAll('input');
      selectedFilters[key] = this.processInputs(inputs);
    });

    return selectedFilters;
  }

  processInputs(inputs) {
    const result = [];
    
    inputs.forEach((input) => {
      if (!input.checked) return;

      if (input.type === 'radio') {
        return input.value;
      } else if (input.type === 'checkbox') {
        result.push(input.value);
      } else if (input.classList.contains('min-value') || input.classList.contains('max-value')) {
        const index = input.classList.contains('min-value') ? 0 : 1;
        result[index] = input.value;
      }
    });

    return result.length === 1 ? result[0] : result;
  }

  handleApply(event) {
    event.preventDefault();
    const filters = this.getSelectedFilters();
    console.log('Selected Filters:', filters);
    
    // Оптимізоване видалення класів
    const classesToRemove = ['showMobile', 'filterView', 'sortView'];
    $(this.filterForm).removeClass(classesToRemove.join(' '));
    $('body').removeClass('noScroll');
    
    // Тут можна додати логіку відправки на сервер
  }

  handleReset(event) {
    event.preventDefault();
    this.filterForm.reset();

    // Оптимізоване видалення класів помилок
    const errorElements = document.querySelectorAll('.error, .invalid');
    errorElements.forEach(element => {
      element.classList.remove('error', 'invalid');
    });

    // Ініціалізація range фільтрів
    const rangeFilters = document.querySelectorAll('.filter-item.range-item');
    rangeFilters.forEach(filterElement => {
      this.initFilter(filterElement);
    });
  }

  setupMobileFilters() {
    const mobileFilterHandlers = {
      '.js-filter-btn': () => this.toggleMobileFilter('filterView'),
      '.js-close-filter': () => this.toggleMobileFilter('filterView', false),
      '.js-sort-btn': () => this.toggleMobileFilter('sortView'),
      '.js-close-sort': () => this.toggleMobileFilter('sortView', false)
    };

    Object.entries(mobileFilterHandlers).forEach(([selector, handler]) => {
      $(selector).on('click', handler);
    });
  }

  toggleMobileFilter(view, show = true) {
    const classes = show ? ['showMobile', view] : [];
    $(this.filterForm).toggleClass(classes.join(' '));
    $('body').toggleClass('noScroll', show);
  }

  initFilter(filterElement) {
    // Логіка ініціалізації range фільтра
    // Можна винести в окремий клас RangeFilter
  }
} 