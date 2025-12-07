export class Slider {
  constructor() {
    this.mainSlider = '.card-slider';
    this.navSlider = '.card-slider-nav';
    this.init();
  }

  init() {
    this.initMainSlider();
    this.initNavSlider();
    this.setupGallery();
    this.setupVideoPopup();
  }

  initMainSlider() {
    $(this.mainSlider).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: this.navSlider,
    });
  }

  initNavSlider() {
    $(this.navSlider).slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: this.mainSlider,
      focusOnSelect: true,
      arrows: false,
    });
  }

  setupGallery() {
    $(this.mainSlider).on('click', '.slick-slide', (event) => {
      event.preventDefault();
      
      const galleryItems = this.collectGalleryItems();
      const clickedIndex = $(event.currentTarget).data('slick-index');

      this.openGallery(galleryItems, clickedIndex);
    });
  }

  collectGalleryItems() {
    const items = [];
    
    $(`${this.mainSlider} .slick-slide`).each((_, slide) => {
      const $slide = $(slide);
      const img = $slide.find('img');
      const link = $slide.find('a');

      if (link.length) {
        items.push({
          src: link.attr('href'),
          type: 'iframe',
        });
      } else if (img.length) {
        items.push({
          src: img.attr('src'),
          type: 'image',
        });
      }
    });

    return items;
  }

  openGallery(items, index) {
    $.magnificPopup.open({
      items,
      gallery: {
        enabled: true,
      },
    }, index);
  }

  setupVideoPopup() {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });

    $('.open-custom-video-modal').magnificPopup({
      type: 'iframe',
      iframe: {
        patterns: {
          custom: {
            index: 'localhost:3000/',
            src: '%url%'
          }
        }
      },
      callbacks: {
        close: () => {
          const iframe = $('.mfp-content iframe');
          if (iframe.length) {
            iframe.attr('src', '');
          }
        }
      },
    });
  }
} 