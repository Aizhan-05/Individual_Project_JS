// 1 - Код - для бургер-меню:

const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  burger.classList.toggle("active"); // Добавляем/удаляем класс "active" у бургера
});

document.querySelectorAll(".header__link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      nav.classList.remove("active");
      burger.classList.remove("active"); // Убираем класс "active" с бургера
    }
  });
});

// 2 - Код для слайдера в блоке hero:
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slider__image");
  const labels = document.querySelectorAll(".slider__label");
  let currentIndex = 0;

  // Функция для смены слайда
  function changeSlide() {
    images.forEach((img, index) => {
      img.style.display = index === currentIndex ? "block" : "none";
      labels[index].classList.toggle("active", index === currentIndex);
    });

    currentIndex = (currentIndex + 1) % images.length;
  }

  // Автоматическое переключение слайдов
  setInterval(() => {
    changeSlide();
  }, 3000);

  // Инициализация первого слайда
  changeSlide();
});

// 3 - Код для вкладок в блоке portfolio:
// Получаем все кнопки вкладок
const tabs = document.querySelectorAll(".portfolio-tab");
const categories = document.querySelectorAll(".portfolio-category");

// Обработчик клика по вкладке
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    // Убираем класс active у всех вкладок
    tabs.forEach((t) => t.classList.remove("active"));

    // Добавляем класс active для текущей вкладки
    e.target.classList.add("active");

    // Убираем класс active у всех категорий контента
    categories.forEach((category) => category.classList.remove("active"));

    // Показываем соответствующую категорию
    const categoryId = e.target.getAttribute("data-category");
    const categoryToShow = document.getElementById(categoryId);
    if (categoryToShow) {
      categoryToShow.classList.add("active");
    }
  });
});

// Получаем все кнопки "Подробнее"
const viewMoreButtons = document.querySelectorAll(".view-more");

// Получаем все модальные окна
const modals = document.querySelectorAll(".modal");

// Получаем кнопки закрытия
const closeButtons = document.querySelectorAll(".close");

// Открытие модального окна при нажатии на "Подробнее"
viewMoreButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const modalId = e.target.getAttribute("data-modal"); // Получаем ID модального окна
    const modal = document.getElementById(modalId); // Ищем модальное окно по ID
    if (modal) {
      modal.classList.add("active"); // Открываем модальное окно
    }
  });
});

// Закрытие модального окна при нажатии на крестик
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modals.forEach((modal) => {
      modal.classList.remove("active"); // Закрываем все модальные окна
    });
  });
});

// Закрытие модального окна при клике вне модального контента
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    modals.forEach((modal) => {
      modal.classList.remove("active"); // Закрываем все модальные окна
    });
  }
});

// Получаем все миниатюры
const thumbnails = document.querySelectorAll(".thumbnail");

// Смена основного изображения при клике на миниатюру
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    // Находим родительский модальный контейнер
    const modal = e.target.closest(".modal");
    const mainImage = modal.querySelector(".modal-image"); // Получаем основное изображение в этом модальном окне

    // Меняем основное изображение
    mainImage.src = e.target.src;
    mainImage.alt = e.target.alt;

    // Убираем класс active с предыдущей миниатюры
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));

    // Добавляем класс active на текущую миниатюру
    e.target.classList.add("active");
  });
});

// 4 - Код  для работы слайдера в блоке Testimonials:

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".testimonial-slide");
  const totalSlides = slides.length;
  const container = document.querySelector(".testimonials-container");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  let currentSlide = 0;

  // Функция для перехода к следующему слайду
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  // Функция для перехода к предыдущему слайду
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Обновить слайдер (переместить контейнер)
  function updateSlider() {
    const offset = -currentSlide * 100; // Сдвиг на ширину одного слайда
    container.style.transform = `translateX(${offset}%)`;
  }

  // Обработчики событий для кнопок
  leftBtn.addEventListener("click", prevSlide);
  rightBtn.addEventListener("click", nextSlide);

  // Автоматическое переключение слайдов каждые 5 секунд
  setInterval(nextSlide, 5000);
});

// 5 - Формы в блоке Contact:

const supportForm = document.querySelector(".contact-form");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const messageInput = document.querySelector("textarea[name='message']");

function validateInput(input, message) {
  const parent = input.closest(".contact-form__block");
  const errorMessage = parent.querySelector(".error-message");

  if (input.value.trim() === "") {
    input.classList.add("error");
    errorMessage.textContent = `${message} отсутствует. Заполните поле.`;
    return false;
  } else {
    input.classList.remove("error");
    errorMessage.textContent = "";
    return true;
  }
}

supportForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameIsValid = validateInput(nameInput, "Имя");
  const emailIsValid = validateInput(emailInput, "Эл. почта");
  const messageIsValid = validateInput(messageInput, "Сообщение");

  if (nameIsValid && emailIsValid && messageIsValid) {
    alert("Сообщение успешно отправлено!");
    supportForm.reset();
  }
});
