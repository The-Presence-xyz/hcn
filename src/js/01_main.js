document.addEventListener('DOMContentLoaded', () => {
  //Global const
  const notificationInfo = document.getElementById('notificationInfo');
  const notificationError = document.getElementById('notificationError');
  const notificationWarning = document.getElementById('notificationWarning');

  // Аккардеон
  function updateAccordionHeights() {
    accordionTitles.forEach((title) => {
      const options = title.nextElementSibling;
      if (options && options.classList.contains('active')) {
        options.style.maxHeight = options.scrollHeight + 'px'; // Оновлюємо висоту
      }
    });
  }

  const accordionTitles = document.querySelectorAll('[data-accordion]');
  accordionTitles.forEach((title) => {
    const options = title.nextElementSibling;

    // Встановлення активного стану за замовчуванням
    if (title.hasAttribute('data-open') && options) {
      title.classList.add('active');
      options.classList.add('active');
      options.style.maxHeight = options.scrollHeight + 'px'; // Встановлюємо максимальну висоту за замовчуванням
    } else {
      options.style.maxHeight = '0'; // Для початкового стану згортання
    }

    // Обробник кліку для відкриття/закриття
    title.addEventListener('click', () => {
      title.classList.toggle('active');
      if (options) {
        // Перевіряємо, чи елемент відкритий
        if (options.classList.contains('active')) {
          options.style.maxHeight = '0'; // Згортаємо
          options.classList.remove('active');
        } else {
          options.classList.add('active');
          options.style.maxHeight = options.scrollHeight + 'px'; // Розгортаємо
        }
      }
    });
  });

  // Обробник події resize
  window.addEventListener('resize', () => {
    updateAccordionHeights();

    if (window.innerWidth > 767) {
      // Виконуємо потрібну логіку
      $(filterForm).removeClass('showMobile filterView sortView');
      $('body').removeClass('noScroll'); // Видаляємо клас noScroll
    }
  });

  // Кнопки "Застосувати" та "Видалити"
  const applyBtn = document.querySelector('.apply-btn');
  const resetBtn = document.querySelector('.reset-btn');
  const filterForm = document.querySelector('#filter');

// Отримати значення з форми
  function getSelectedFilters() {
    const selectedFilters = {};

    // Проходимо по всіх фільтрах
    filterForm.querySelectorAll('.filter-item').forEach((filterItem) => {
      const key = filterItem.dataset.key; // Отримуємо data-key
      if (!key) return;

      const inputs = filterItem.querySelectorAll('input');

      // Логіка для обробки input елементів
      inputs.forEach((input) => {
        if (input.type === 'radio' && input.checked) {
          selectedFilters[key] = input.value; // Записуємо вибране значення
        } else if (input.type === 'checkbox' && input.checked) {
          selectedFilters[key] = selectedFilters[key] || [];
          selectedFilters[key].push(input.value); // Додаємо значення в масив
        } else if (input.classList.contains('min-value') || input.classList.contains('max-value')) {
          selectedFilters[key] = selectedFilters[key] || [];
          if (input.classList.contains('min-value')) {
            selectedFilters[key][0] = input.value; // Мінімальне значення
          } else if (input.classList.contains('max-value')) {
            selectedFilters[key][1] = input.value; // Максимальне значення
          }
        }
      });
    });

    return selectedFilters;
  }

// Обробник кнопки "Застосувати"
  if (applyBtn) {
    applyBtn.addEventListener('click', (event) => {
      event.preventDefault(); // Запобігаємо стандартній поведінці форми
      const filters = getSelectedFilters();
      console.log('Selected Filters:', filters);
      $(filterForm).removeClass('showMobile filterView sortView');
      $('body').removeClass('noScroll'); // Видаляємо клас noScroll
      // Тут можна надіслати фільтри на сервер або виконати іншу логіку
    });
  }

// Обробник кнопки "Видалити"
  if (resetBtn) {
    resetBtn.addEventListener('click', (event) => {
      event.preventDefault(); // Запобігаємо стандартній поведінці
      filterForm.reset(); // Скидаємо всі значення форми

      const errorClasses = document.querySelectorAll('.error')
      const inValid = document.querySelectorAll('.invalid');

      inValid.forEach((error) => {
        error.classList.remove('invalid')
      })

      errorClasses.forEach((error) => {
        error.classList.remove('error')
      })


      const rangeFilters = document.querySelectorAll('.filter-item.range-item');
      rangeFilters.forEach((filterElement) => {
        initFilter(filterElement);
      });
      console.log('Фільтри скинуті');
    });
  }

  //   mobile filter BEGIN
  $('.js-filter-btn').on('click', function () {
    $(filterForm).addClass('showMobile filterView');
    $('body').addClass('noScroll'); // Додаємо клас noScroll
  });
  $('.js-close-filter').on('click', function () {
    $(filterForm).removeClass('showMobile filterView');
    $('body').removeClass('noScroll'); // Видаляємо клас noScroll
  });
  $('.js-sort-btn').on('click', function () {
    $(filterForm).addClass('showMobile sortView');
    $('body').addClass('noScroll'); // Додаємо клас noScroll
  });
  $('.js-close-sort').on('click', function () {
    $(filterForm).removeClass('showMobile sortView');
    $('body').removeClass('noScroll'); // Видаляємо клас noScroll
  });
  //   mobile filter END

  $("#loginForm").validate({
    rules: {
      login: {
        required: true,
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      login: {
        required: "Будь ласка, введіть email",
      },
      password: {
        required: "Будь ласка, введіть пароль",
        minlength: "Пароль має містити мінімум 6 символів"
      }
    },
    errorElement: "p",
    errorClass: "error",
    submitHandler: function (form) {
      const formData = {
        login: $("input[name='login']").val(),
        password: $("input[name='password']").val(),
        remember: $("input[name='remember']").is(":checked")
      };
      console.log("Дані, які будуть відправлені:", formData);

      //:TODO delete after integration
      window.location.assign("/");
      //:TODO uncomment after integration
      // form.submit();
    }
  });


  // Ініціалізація Slick Slider
  $('.card-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.card-slider-nav',
  });

  $('.card-slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.card-slider',
    focusOnSelect: true,
    arrows: false,
  });

  $('.card-slider').on('click', '.slick-slide', function () {
    event.preventDefault(); // Зупиняємо стандартну поведінку посилання
    // Створюємо масив зображень і відео для галереї
    const galleryItems = [];
    $('.card-slider .slick-slide').each(function () {
      const $this = $(this);
      const img = $this.find('img');
      const link = $this.find('a');

      if (link.length) {
        // Якщо це відео
        galleryItems.push({
          src: link.attr('href'),
          type: 'iframe', // Тип контенту - відео
        });
      } else if (img.length) {
        // Якщо це зображення
        galleryItems.push({
          src: img.attr('src'),
          type: 'image', // Тип контенту - зображення
        });
      }
    });

    // Отримуємо індекс натиснутого слайда
    const clickedIndex = $(this).data('slick-index'); // Динамічний індекс слайда

    // Відкриваємо галерею з вказаним слайдом
    $.magnificPopup.open({
      items: galleryItems,
      gallery: {
        enabled: true, // Увімкнути режим галереї
      },
    }, clickedIndex); // Передаємо індекс натиснутого слайда
  });

// Ініціалізація для одиничного відео (YouTube або кастом)
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
          index: 'localhost:3000/', // Унікальна частина URL
          src: '%url%' // Використовуємо повністю динамічний URL
        }
      }
    },
    callbacks: {
      close: function () {
        const iframe = $('.mfp-content iframe'); // Очищуємо src для зупинки відео
        if (iframe.length) {
          iframe.attr('src', '');
        }
      }
    },
  });


  // Filter Range-item BEGIN
  const initFilter = (filterElement) => {
    const slider = filterElement.querySelector(".range-slider");
    const progress = slider.querySelector(".progress");
    const minPriceInput = slider.querySelector(".min-value");
    const maxPriceInput = slider.querySelector(".max-value");
    const minInput = slider.querySelector(".min-input");
    const maxInput = slider.querySelector(".max-input");

    const updateProgress = () => {
      const minValue = parseInt(minInput.value);
      const maxValue = parseInt(maxInput.value);

      // get the total range of the slider
      const range = maxInput.max - minInput.min;
      // get the selected value range of the progress
      const valueRange = maxValue - minValue;
      // calculate the width percentage
      const width = (valueRange / range) * 100;
      // calculate the min thumb offset
      const minOffset = ((minValue - minInput.min) / range) * 100;

      // update the progress width
      progress.style.width = width + "%";
      // update the progress left position
      progress.style.left = minOffset + "%";

      // update the number inputs
      minPriceInput.value = minValue;
      maxPriceInput.value = maxValue;
    };

    let typingTimer;  // таймер для затримки
    const typingDelay = 800;

    const updateRange = (event) => {
      const input = event.target;

      let min = parseInt(minPriceInput.value);
      let max = parseInt(maxPriceInput.value);

      if (isNaN(min)) {
        min = parseInt(minPriceInput.min) || 0;
        minPriceInput.value = min;
      }

      if (isNaN(max)) {
        max = parseInt(maxPriceInput.max) || 0;
        maxPriceInput.value = max;
      }

      // Якщо значення змінюється в полі "від"
      if (input === minPriceInput) {
        clearTimeout(typingTimer); // очистити попередній таймер
        typingTimer = setTimeout(() => {
          if (max < min) {
            max = min;
            maxPriceInput.value = max; // оновити значення "до"
          }
          minInput.value = min;
          maxInput.value = max;
          updateProgress();
        }, typingDelay);
      }

      // Якщо значення змінюється в полі "до"
      else if (input === maxPriceInput) {
        clearTimeout(typingTimer); // очистити попередній таймер
        typingTimer = setTimeout(() => {
          if (min > max) {
            min = max;
            minPriceInput.value = min; // оновити значення "від"
          }
          minInput.value = min;
          maxInput.value = max;
          updateProgress();
        }, typingDelay);
      }

      // if (input === minPriceInput && min > max) {
      //   max = min;
      //   maxPriceInput.value = max;
      // } else if (input === maxPriceInput && max < min) {
      //   min = max;
      //   minPriceInput.value = min;
      // }

      minInput.value = min;
      maxInput.value = max;

      updateProgress();
    };

    minPriceInput.addEventListener("input", updateRange);
    maxPriceInput.addEventListener("input", updateRange);

    minInput.addEventListener("input", () => {
      if (parseInt(minInput.value) >= parseInt(maxInput.value)) {
        maxInput.value = minInput.value;
      }
      updateProgress();
    });

    maxInput.addEventListener("input", () => {
      if (parseInt(maxInput.value) <= parseInt(minInput.value)) {
        minInput.value = maxInput.value;
      }
      updateProgress();
    });

    let isDragging = false;
    let startOffsetX;

    progress.addEventListener("mousedown", (e) => {
      e.preventDefault(); // prevent text selection

      isDragging = true;

      startOffsetX = e.clientX - progress.getBoundingClientRect().left;

      slider.classList.toggle("dragging", isDragging);
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        // get the size and position of the slider
        const sliderRect = slider.getBoundingClientRect();
        const progressWidth = parseFloat(progress.style.width || 0);

        // calculate the new left position for the progress element
        let newLeft =
          ((e.clientX - sliderRect.left - startOffsetX) / sliderRect.width) * 100;

        // ensure the progress is not exceeding the slider boundaries
        newLeft = Math.min(Math.max(newLeft, 0), 100 - progressWidth);

        // update the progress position
        progress.style.left = newLeft + "%";

        // calculate the new min thumb position
        const range = maxInput.max - minInput.min;
        const newMin = Math.round((newLeft / 100) * range) + parseInt(minInput.min);
        const newMax = newMin + parseInt(maxInput.value) - parseInt(minInput.value);

        // update the min input
        minInput.value = newMin;
        maxInput.value = newMax;

        // update the progress
        updateProgress();
      }
      slider.classList.toggle("dragging", isDragging);
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
      }
      slider.classList.toggle("dragging", isDragging);
    });

    updateProgress();
  };
  const rangeFilters = document.querySelectorAll('.filter-item.range-item');
  rangeFilters.forEach((filterElement) => {
    initFilter(filterElement);
  });

  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener("keypress", function (evt) {
      if (evt.which !== 8 && evt.which !== 0 && (evt.which < 48 || evt.which > 57)) {
        evt.preventDefault(); // Забороняємо введення некоректних символів
      }
    });
  });
  // Filter Range-item END

  // reviewed slider BEGIN
  $('.reviewed__slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: false,
          centerMode: true,
          // centerPadding: '40px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1
        }
      }
    ]
  });
  $('.reviewed__slider-prev').on('click', function () {
    $('.reviewed__slider').slick('slickPrev');
  });
  $('.reviewed__slider-next').on('click', function () {
    $('.reviewed__slider').slick('slickNext');
  });
  // reviewed slider END



  //search-bar BEGIN
  const mainContainer = document.querySelector('.main');
  const searchInput = document.querySelector('.js-search-input');
  const searchBar = document.querySelector('.js-search-bar');
  const buttonSubmit = document.querySelector('button[type="submit"]');
  const resetButton = document.querySelector('.button[type="reset"]');
  const form = document.querySelector('.search-bar__container');
  const selectedValuesContainer = document.querySelector('.selected-values');
  const searchResultContainer = document.querySelector('.js-selected-values-search-result');


  if (searchInput) {
    searchInput.addEventListener('click', function (event) {
      // Зупиняємо поширення події, щоб вона не викликала закриття при кліку на searchInput
      event.stopPropagation();
      searchBar.classList.add('active');
      mainContainer.classList.add('blur')
      $('body').addClass('noScroll'); // Додаємо клас noScroll
    });
  }

  if (searchBar) {
    document.addEventListener('click', function (event) {
      // Перевіряємо, чи клік був за межами searchInput і searchBar
      if (!searchBar.contains(event.target) && !event.target.classList.contains('tag__delete')) {
        searchBar.classList.remove('active');
        mainContainer.classList.remove('blur');
        $('body').removeClass('noScroll'); // Видаляємо клас noScroll
      }
    });

    document.addEventListener('click', function (event) {
      // Перевіряємо, чи клік був за межами searchInput і searchBar
      if (
        !searchBar.contains(event.target) &&
        !event.target.classList.contains('tag__delete')
      ) {
        searchBar.classList.remove('active');
        mainContainer.classList.remove('blur')
        $('body').removeClass('noScroll'); // Видаляємо клас noScroll
      }

      if (buttonSubmit.contains(event.target)) {
        event.preventDefault();
        const formData = new FormData(form);
        const sendData = {};

        // Збираємо значення з кожної групи фільтрів
        const filterItems = document.querySelectorAll('.search-bar__filter-item');
        filterItems.forEach((filterItem) => {
          const groupName = filterItem.getAttribute('data-item-name');
          const selectedValues = [];

          // Для кожного чекбокса у групі перевіряємо, чи він вибраний
          const checkboxes = filterItem.querySelectorAll('input[type="checkbox"]:checked');
          checkboxes.forEach((checkbox) => {
            const label = checkbox.nextElementSibling; // span.label
            selectedValues.push(label.textContent.trim()); // Додаємо текст з <span class="label">
          });

          if (selectedValues.length > 0) {
            sendData[groupName] = selectedValues; // Додаємо групу та її значення
          }
        });

        // Додаємо значення з основного пошукового інпуту
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
          sendData["search-input"] = searchQuery;
        }

        console.log('sendData: ', sendData); //sendData

        // Додати логіку для відправки даних

        searchBar.classList.remove('active');
        mainContainer.classList.remove('blur');
        $('body').removeClass('noScroll'); // Видаляємо клас noScroll
      }
    });
  }



  function createTag(tagText, checkboxId) {
    const tag = document.createElement('span');
    tag.classList.add('tag');
    tag.setAttribute('data-checkbox-id', checkboxId); // Прив'язка до id чекбокса
    tag.innerHTML = `${tagText} <span class="tag__delete --svg__i_cross"></span>`;

    // Додаємо обробник для видалення тега
    tag.querySelector('.tag__delete').addEventListener('click', function (event) {
      event.stopPropagation();

      // Видалити тег з обох контейнерів
      const allTags = document.querySelectorAll(`[data-checkbox-id="${checkboxId}"]`);
      allTags.forEach((tagElement) => {
        tagElement.remove();
      });

      // Скинути чекбокс
      const relatedCheckbox = document.getElementById(checkboxId);
      if (relatedCheckbox) {
        relatedCheckbox.checked = false;
      }
    });

    return tag;
  }

  // Обробка вибору чекбокса та видалення тегів
  document.addEventListener('change', function (event) {
    if (event.target.type === 'checkbox' && event.target.closest('.js-search-bar')) {
      if (event.target.type === 'checkbox') {
        const checkbox = event.target;
        const label = checkbox.nextElementSibling; // <span class="label">
        const tagText = label.textContent.trim();
        const checkboxId = checkbox.id; // Унікальний id чекбокса

        if (checkbox.checked) {
          // Додаємо тег у обидва контейнери
          const tag1 = createTag(tagText, checkboxId);
          const tag2 = createTag(tagText, checkboxId);

          selectedValuesContainer.prepend(tag1);
          if (searchResultContainer) {
            searchResultContainer.prepend(tag2);
          }
        } else {
          // Видаляємо теги з обох контейнерів
          const allTags = document.querySelectorAll(`[data-checkbox-id="${checkboxId}"]`);
          allTags.forEach((tagElement) => {
            tagElement.remove();
          });
        }
      }
    }
  });

  // Додаємо обробник події на кнопку скидання
  if (resetButton) {
    resetButton.addEventListener('click', function () {
      form.reset();

      // Видаляємо всі теги з обох контейнерів
      const allTags = document.querySelectorAll('.tag');
      allTags.forEach(tag => tag.remove());

      searchBar.classList.remove('active');
      mainContainer.classList.remove('blur');
      $('body').removeClass('noScroll'); // Видаляємо клас noScroll
    });
  }

//search-bar END

  //share link BEGIN
  const shareBtns = document.querySelectorAll('.js-share-btn');

  shareBtns.forEach(shareBtn => {
    const shareButton = shareBtn.querySelector('img');
    const shareList = shareBtn.querySelector('.share-menu__list');
    const shareItems = shareBtn.querySelectorAll('.share-menu__list-item');

    // Показати/сховати список при натисканні на кнопку
    shareButton.addEventListener('click', (e) => {
      e.preventDefault();

      // Закриваємо всі інші списки
      shareBtns.forEach(otherShareBtn => {
        if (otherShareBtn !== shareBtn) {
          otherShareBtn.querySelector('.share-menu__list').classList.remove('active');
        }
      });

      // Перемикаємо активний стан для поточного списку
      shareList.classList.toggle('active');
    });

    // Обробка кліків на варіанти в списку
    shareItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        // Отримуємо URL
        const cardElement = shareBtn.closest('.card');
        const cardUrl = cardElement ? `${window.location.origin}/${cardElement.getAttribute('href')}` : window.location.href;

        const label = item.querySelector('.label').textContent;

        switch (label) {
          case 'Скопіювати посилання':
            navigator.clipboard.writeText(cardUrl).then(() => {
              // Закриваємо список після копіювання
              shareList.classList.remove('active');

              // Показуємо повідомлення
              notificationInfo.classList.add('show');

              // Ховаємо повідомлення через 2 секунди
              setTimeout(() => {
                notificationInfo.classList.remove('show');
              }, 2000);
            }).catch((error) => {
              console.error('Помилка при копіюванні:', error);
            });
            shareList.classList.remove('active');
            break;

          case 'Viber':
            window.open(`viber://forward?text=${cardUrl}`, '_blank');
            break;

          case 'Telegram':
            window.open(`https://t.me/share/url?url=${cardUrl}`, '_blank');
            break;

          case 'Facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${cardUrl}`, '_blank');
            break;

          default:
            console.error('Дія для цього варіанту не налаштована.');
        }

        // Закриваємо список після вибору
        shareList.classList.remove('active');
      });
    });

    // Закриття списку, якщо клікнути поза ним
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.share-menu')) {
        shareList.classList.remove('active');
      }
    });
  });
  //share link END

  //show input password BEGIN
  const showPasswordBtn = document.querySelector('.js-show-password');
  const passwordInput = document.querySelector('input[name="password"]');

  if (showPasswordBtn) {
    showPasswordBtn.addEventListener('click', () => {
      // Перемикаємо клас
      if (showPasswordBtn.classList.contains('hidden')) {
        showPasswordBtn.classList.remove('hidden');
        showPasswordBtn.classList.add('show');
        passwordInput.type = 'text'; // Змінюємо тип на текст
      } else {
        showPasswordBtn.classList.remove('show');
        showPasswordBtn.classList.add('hidden');
        passwordInput.type = 'password'; // Змінюємо тип на пароль
      }
    });
  }
  //show input password END

  //range-field validation BEGIN
  const rangeFieldItems = document.querySelectorAll('.filter-item.range-field');

  let typingTimer;  // таймер для затримки
  const typingDelay = 800;

  rangeFieldItems.forEach(function(item) {
    const minValueInput = item.querySelector('.min-value');
    const maxValueInput = item.querySelector('.max-value');
    const filterItemDiv = item.closest('.filter-item');
    const errorText = item.querySelector('.errorText');
    const applyButton = document.querySelector('.apply-btn');


    minValueInput.addEventListener("input", () => {
      let min = parseInt(minValueInput.value);
      let max = parseInt(maxValueInput.value);

      clearTimeout(typingTimer)
      typingTimer = setTimeout(() => {
        if (min > max) {
          filterItemDiv.classList.add('error');
          applyButton.classList.add('invalid');
          // Вивести нотіфікацію
          notificationError.textContent = "Мінімальне значення не може бути більшим за максимальне!";
          notificationError.classList.add('show');
          errorText.textContent = "Мінімальне значення не може бути більшим за максимальне!";
          updateAccordionHeights();
          setTimeout(() => {
            notificationError.classList.remove('show');
          }, 5000);
        } else {
          filterItemDiv.classList.remove('error');
          applyButton.classList.remove('invalid');
        }
      }, typingDelay)
    });



    maxValueInput.addEventListener("input", () => {
      let min = parseInt(minValueInput.value);
      let max = parseInt(maxValueInput.value);

      clearTimeout(typingTimer)
      typingTimer = setTimeout(() => {
        if (max < min) {
          filterItemDiv.classList.add('error'); // додаємо клас "error" до фільтра
          applyButton.classList.add('invalid');
          // Вивести нотіфікацію
          notificationError.textContent = "Максимальне значення не може бути більшим за мінімальне!";
          errorText.textContent = "Максимальне значення не може бути більшим за мінімальне!";
          updateAccordionHeights();
          notificationError.classList.add('show');
          setTimeout(() => {
            notificationError.classList.remove('show');
          }, 5000);
        } else {
          filterItemDiv.classList.remove('error');
          applyButton.classList.remove('invalid');
        }
      }, typingDelay)
    });
  });

  //range-field validation END

//filter Buttons BEGIN

// Отримуємо всі необхідні елементи
  const filterButtons = document.querySelectorAll('.filter-button');
  const filterButtonsContainer = document.querySelector('.filter-buttons');
  const filterResults = document.querySelector('.filter-results');
  const closeBtn = document.querySelector('.close-btn');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const resultLists = document.querySelectorAll('.result-list');

// Визначення мобільного пристрою
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// Таймер для затримки закриття
  let closeTimer = null;
  let currentActiveButton = null;

// Функція для перемикання табів
  function switchTab(type) {
    // Прибираємо active з усіх табів
    filterTabs.forEach(tab => tab.classList.remove('active'));

    // Прибираємо show з усіх списків
    resultLists.forEach(list => list.classList.remove('show'));

    // Додаємо active до потрібного табу
    const activeTab = document.querySelector(`.filter-tab[data-type="${type}"]`);
    if (activeTab) {
      console.log('activeTab: ', activeTab.dataset.type);
      activeTab.classList.add('active');
      filterResults.classList.remove('open-sell', 'open-rent');
      filterResults.classList.add(`open-${activeTab.dataset.type}`);
    }

    // Додаємо show до потрібного списку
    const activeList = document.querySelector(`.result-list[data-type="${type}"]`);
    if (activeList) {
      activeList.classList.add('show');
    }
  }

// Функція відкриття
  function openFilterResults(buttonId) {
    // Скасовуємо таймер закриття, якщо він є
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    $('body').addClass('noScroll');
    $('html').addClass('noScroll');
    filterResults.classList.add('open');
    scrollTo(0, 0);

    // Перемикаємо таб
    switchTab(buttonId);
  }

// Функція закриття з затримкою
  function closeFilterResults() {
    closeTimer = setTimeout(() => {
      filterResults.classList.remove('open');
      $('body').removeClass('noScroll');
      $('html').removeClass('noScroll');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      currentActiveButton = null;
    }, 250); // 250ms затримка
  }

// Скасування закриття
  function cancelClose() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

// Обробники для кнопок фільтра
  filterButtons.forEach(button => {

    if (isMobile) {
      // На мобільних - клік
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterButtons.forEach(btn => btn.blur());

        const buttonId = button.id;
        button.classList.add('active');
        currentActiveButton = buttonId;
        openFilterResults(buttonId);
      });

    } else {
      // На десктопі - ховер на кнопку відкриває відповідний таб
      button.addEventListener('mouseenter', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const buttonId = button.id;
        button.classList.add('active');
        currentActiveButton = buttonId;
        openFilterResults(buttonId);
      });
    }
  });

// Для десктопа: відслідковуємо вихід миші з усього контейнера filter-buttons
  if (!isMobile) {
    filterButtonsContainer.addEventListener('mouseenter', () => {
      cancelClose();
    });

    filterButtonsContainer.addEventListener('mouseleave', () => {
      closeFilterResults();
    });
  }

  // Показ filter-buttons на мобільних при скролі
  if (isMobile) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 300) {
        filterButtonsContainer.classList.add('showOnMobile');
      } else {
        filterButtonsContainer.classList.remove('showOnMobile');
      }
    });
  }

// Обробник закриття по кнопці
  closeBtn.addEventListener('click', () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    $('body').removeClass('noScroll');
    $('html').removeClass('noScroll');
    filterResults.classList.remove('open');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    currentActiveButton = null;
  });

// Додатково: перемикання табів при кліку на них
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const type = tab.getAttribute('data-type');
      switchTab(type);
    });
  });

// Зупиняємо спливання подій всередині filter-results
  filterResults.addEventListener('click', (e) => {
    e.stopPropagation();
  });

// Закриття при кліку за межами (тільки для мобільних або якщо вже відкрито)
  document.addEventListener('click', (e) => {
    const clickedInsideButtons = e.target.closest('.filter-buttons');

    if (!clickedInsideButtons && filterResults.classList.contains('open')) {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      filterResults.classList.remove('open');
      $('body').removeClass('noScroll');
      $('html').removeClass('noScroll');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      currentActiveButton = null;
    }
  });
});
