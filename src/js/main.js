import { Accordion } from './modules/accordion.js';
import { Filters } from './modules/filters.js';
import { Slider } from './modules/slider.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ініціалізація компонентів
  new Accordion();
  new Filters();
  new Slider();

  // Ініціалізація форми логіну
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
    submitHandler: function(form) {
      const formData = {
        login: $("input[name='login']").val(),
        password: $("input[name='password']").val(),
        remember: $("input[name='remember']").is(":checked")
      };
      console.log("Дані, які будуть відправлені:", formData);

      // TODO: Замінити на реальну відправку форми
      window.location.assign("/");
    }
  });
}); 