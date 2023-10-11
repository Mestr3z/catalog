let cardsSection = document.querySelector(".card");

let firstButton = document.querySelector(".cards__sort_order_button-first");
let secondButton = document.querySelector(".cards__sort_order_button-second");
let cardContainers = document.querySelectorAll(".card__container");

const minusButton = document.querySelector(".button__minus");
const plusButton = document.querySelector(".button__plus");
const numberElement = document.querySelector(".button__number");
const costElement = document.querySelector(".product__price_details-cost");


function mask(event) {
  event.keyCode && (keyCode = event.keyCode);
  let pos = this.selectionStart;
  if (pos < 3) event.preventDefault();
  let matrix = "+7 (___) ___-__-__",
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, ""),
    newValue = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
  i = newValue.indexOf("_");
  if (i != -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }

  let reg = matrix
    .substr(0, this.value.length)
    .replace(/_+/g, function (a) {
      return "\\d{1," + a.length + "}";
    })
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");
  if (
    !reg.test(this.value) ||
    this.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  )
    this.value = newValue;
  if (event.type == "blur" && this.value.length < 5) this.value = "";
}



document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card__container').forEach(setupCardEventListeners);
});

firstButton.addEventListener("click", () => {
  firstButton.style.backgroundColor = "#f9af19";
  secondButton.style.backgroundColor = "white";
});

secondButton.addEventListener("click", () => {
  secondButton.style.backgroundColor = "#f9af19";
  firstButton.style.backgroundColor = "white";
});

function setupCardEventListeners() {
  document.querySelectorAll('.card__container').forEach((card) => {
      let price = 7390;
      let numberOfPallets = 1;

      let minusButton = card.querySelector('.button__minus');
      let plusButton = card.querySelector('.button__plus');
      let costElement = card.querySelector('.product__price_details-cost');
      let numberElement = card.querySelector('.button__number');
      

      function updatePriceAndNumber() {
          costElement.textContent = price * numberOfPallets;
          numberElement.textContent = numberOfPallets;
      }

      minusButton.addEventListener('click', () => {
          if (numberOfPallets > 1) {
              numberOfPallets--;
              updatePriceAndNumber();
          }
      });

      plusButton.addEventListener('click', () => {
          numberOfPallets++;
          updatePriceAndNumber();
      });
  });
}

let isCardChanged = false;

firstButton.addEventListener("click", () => {
  if (!isCardChanged) {
  } else {
    cardsSection.classList.remove("cards__flex");
    cardsSection.classList.add("card");

    cardContainers.forEach((container) => {
      container.innerHTML = originalCardHTML;
      setupCardEventListeners();
      setupPopupEventListeners();
      setupPopupYellowEventListeners()
    });

    isCardChanged = false;
  }
});

secondButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isCardChanged) {
    cardsSection.classList.remove("card");
    cardsSection.classList.add("cards__flex");
    cardContainers.forEach((container) => {
      container.innerHTML = `
        <div class="product__price product">
        <img class="card__img" src="./images/block.png" alt="блок из газобетона">
        <div class="text__sort">
        <a class="text__card">Блоки из газобетона D-300 300*250*625</a>
        <p class="text__card_p">Газобетонные блоки плотностью D500 подходят для возведения наружных, несущих, а также внутренних стен. В зависимости от…</p>
        <a href="#" class="text__card_link">Подробнее <img class="text__card_img" src="./images/right-arrow.svg" alt="метры в кубе"></a>
                </div>
          <div class="product__price_details">
            <div class="ammount">
            <div class="product__price_header">
            <div class="product__price_block block">
              <div class="product__price_block-buttons">
                <p class="product__price_block-amount">Цена за:</p>
                <button class="product__price_button"><img class="product__price_button-img" src="./images/m3.svg" alt="метры в кубе"></button>
                <button class="product__price_button-number">
                  <p class="product__price_button-text">шт</p>
                </button>
              </div>
            </div>
          </div>
            <div class="product__price_details-amount">
            <p class="product__price_details-cost cost">7 390</p>
            <p class="product__price_details-ruble"></p>
            <div class="product__price_details-buttons">
              <button class="button__minus">-</button>
              <span class="button__number">1</span>
              <button class="button__plus">+</button>
            </div>
          </div>
            </div>
            <div class="product__price_line-buttons">
              <button class="button__gray">
                <p class="text__gray">В КОРЗИНУ</p>
              </button>
              <button class="button__black productBlackButton">
                <p class="text__black">В 1 КЛИК</p>
              </button>
            </div>
            <button class="button__yellow">
              <p class="text__yellow">ЗАКАЗАТЬ </p>
            </button>
          </div>
        </div>
      `;
    });
    setupCardEventListeners();
    setupPopupEventListeners();
    setupPopupYellowEventListeners();
    isCardChanged = true;
  } else {
    cardsSection.classList.remove("cards__flex");
    cardsSection.classList.add("card");

    cardContainers.forEach((container) => {
      
      container.innerHTML = originalCardHTML;
    });

    isCardChanged = false;
  }
});



const originalCardHTML = cardContainers[0].innerHTML;

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");

  menuButton.addEventListener("click", function () {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container");

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
                <button class="popup__close-btn" id="closeButton"> </button>
                <h2 class="popup__title">Заказать звонок</h2>
                <p class="popup__text">Оставьте свой номер, мы перезвоним в ближайшее время.</p>
                <p class="popup__input_title">Как к Вам обращаться</p>
                <input class="popup__input" type="text" id="nameInput" placeholder="Введите Ваше имя">
                <p class="popup__input_title">Ваш номер телефона *</p>
                <input class="popup__input" type="tel" id="tel" placeholder="+7 (___) ___-__-__" required>
                <p class="popup__text_rules">Отправляя данные, Вы соглашаетесь с</p>
                <a href="#" class="popup__link">Правилами обработки персональных данных</a>
                <button class="popup__button" id="submitButton" disabled>ОТПРАВИТЬ</button>
            `;
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);

    const submitButton = document.getElementById('submitButton')

    let nameInput = document.getElementById("nameInput");

    nameInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
    });

    let phoneInput = document.getElementById("tel");

 
    phoneInput.addEventListener("input", mask, false);
    phoneInput.addEventListener("focus", mask, false);
    phoneInput.addEventListener("blur", mask, false);
    phoneInput.addEventListener("keydown", mask, false);
    phoneInput.addEventListener("mouseup", (event) => {
      event.preventDefault();
      if (phoneInput.value.length < 4) {
        phoneInput.setSelectionRange(4, 4);
      } else {
        phoneInput.setSelectionRange(
          phoneInput.value.length,
          phoneInput.value.length
        );
      }
    });
    function closePopup() {
      const popupContainer = document.querySelector(".popup-container");
      if (popupContainer) {
        document.body.removeChild(popupContainer);
        document.body.style.overflow = "auto";
      }
    }

    submitButton.addEventListener("click", function (event) {
      let isValid = validateInputs();
      if (isValid) {
        closePopup();
      } else {
        event.preventDefault();
      }
    });

    function validateInputs() {
      const nameInput = document.getElementById("nameInput");
      const phoneInput = document.getElementById("tel");
      
      let nameIsValid = nameInput.value.trim() !== "";
      let phoneIsValid = phoneInput.value.replace(/\D/g, '').length === 11;
    
      return nameIsValid && phoneIsValid;
    }

    function updateSubmitButtonState() {
      if (validateInputs()) {
          submitButton.removeAttribute('disabled');
      } else {
          submitButton.setAttribute('disabled', 'disabled');
      }
  }

  nameInput.addEventListener('input', updateSubmitButtonState);
phoneInput.addEventListener('input', updateSubmitButtonState);

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", closePopup);


   
    window.addEventListener("click", function (event) {
      if (event.target === popupContainer) {
        closePopup();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closePopup();
      }
    });
    document.body.style.overflow = "hidden";
    updateSubmitButtonState()
  });
});

let sliderInitialized = false;


function initSlider() {
  if (!sliderInitialized) {
    const rangeSlider = document.getElementById("range-slider");
    if (rangeSlider) {
      noUiSlider.create(rangeSlider, {
        start: [600, 8570],
        connect: true,
        step: 1,
        range: {
          min: [600],
          max: [8570],
        },
      });
      const input0 = document.getElementById("input-0");
      const input1 = document.getElementById("input-1");
      const inputs = [input0, input1];
      
      rangeSlider.noUiSlider.on("update", function (values, handle) {
        inputs[handle].value = Math.round(values[handle]);
      });
      
      const setRangeSlider = (i, value) => {
        let arr = [null, null];
        arr[i] = value;
        rangeSlider.noUiSlider.set(arr);
      };
      
      inputs.forEach((el, index) => {
        el.addEventListener("change", (e) => {
          setRangeSlider(index, e.currentTarget.value);
        });
      });

      sliderInitialized = true;
    }
  }
}

document.getElementById("toggle-button").addEventListener("click", function () {
  const button = document.getElementById("toggle-button");
  const container = document.getElementById("price_container");

  if (container.classList.contains("hidden")) {
      container.classList.remove("hidden");
      button.querySelector(".adjust__price_img").style.transform = "rotate(0deg)";
      if (!sliderInitialized) {
          initSlider();
          sliderInitialized = true;
      }
  } else {
      container.classList.add("hidden");
      button.querySelector(".adjust__price_img").style.transform = "rotate(180deg)";
  }
});

function toggleDensityBlock() {
  let button = document.getElementById("density-toggle-button");
  let block = document.getElementById("density_block");

  if (block.style.display === "none" || block.style.display === "") {
    button.classList.add("button-hover-disabled");
    block.style.display = "flex";
    button.querySelector(".density__img").style.transform = "rotate(180deg)";
  } else {
    block.style.display = "none";
    button.querySelector(".density__img").style.transform = "rotate(0deg)";
    button.classList.remove("button-hover-disabled");
  }
}

function toggleSizeBlock() {
  let button = document.getElementById("size-toggle-button");
  let block = document.getElementById("size_block");

  if (block.style.display === "none" || block.style.display === "") {
    block.style.display = "flex";
    button.querySelector(".density__img").style.transform = "rotate(180deg)";
  } else {
    block.style.display = "none";
    button.querySelector(".density__img").style.transform = "rotate(0deg)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("price_container");
    container.style.display = "block"; 
    initSlider(); 
});

const menu = document.querySelector('.left-menu');
const originalParent = menu.parentNode;
const originalNextSibling = menu.nextSibling; 

function toggleBurger(button) {
  const menu = document.querySelector('.left-menu');
  const screenWidth = window.innerWidth;

  if (screenWidth > 768) {
    return;
  }

  if (menu.style.display === 'block') {
      menu.style.display = 'none';
      return;
  }

  const container = document.querySelector('.cards__sort-btns');
  container.parentNode.insertBefore(menu, container.nextSibling);
  
  menu.style.display = 'block';
}


window.addEventListener('resize', function() {
  const menu = document.querySelector('.left-menu');
  const screenWidth = window.innerWidth;

  if (screenWidth > 768) {
      menu.style.display = '';
      originalParent.insertBefore(menu, originalNextSibling);
  } else if (!menu.nextElementSibling || menu.nextElementSibling.className !== 'cards__sort-btns_menu') {
      menu.style.display = 'none';
  }
});




document.addEventListener("DOMContentLoaded", function () {
  const gazobeton = document.querySelector('.gazobeton');
  const row = document.querySelector('.row');
  const menuBtn = document.querySelector('.cards__sort-btns_menu');
  const filterBtn = document.querySelector('.filter');

  function toggleDisplay(targetBlock) {
    const isBlockVisible = getComputedStyle(targetBlock).display !== 'none';
    targetBlock.style.display = isBlockVisible ? 'none' : 'block';
  }

  menuBtn.addEventListener('click', function () {
    toggleDisplay(gazobeton);
  });

  filterBtn.addEventListener('click', function () {
    toggleDisplay(row);
  });

  function adaptMenuPosition() {
    if (window.innerWidth < 768) {
      menuBtn.after(gazobeton);
      filterBtn.after(row);
    } else {
      document.querySelector('.left-menu').append(gazobeton);
      document.querySelector('.left-menu').append(row);
    }
  }

  function handleResize() {
    adaptMenuPosition();
  }

  window.addEventListener('resize', handleResize);

  adaptMenuPosition();
});

function adaptMenuPosition() {
  if (window.innerWidth < 768) {
      menuBtn.after(gazobeton);
      filterBtn.after(row);
  } else {
      document.querySelector('.left-menu').prepend(gazobeton);
      document.querySelector('.left-menu').append(row);
  }
}

// Вызовите функцию при загрузке страницы
window.onload = adaptMenuPosition;

// Добавьте следующий обработчик событий:

window.addEventListener('resize', () => {
  adaptMenuPosition();
});





function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');

  const burger = document.querySelector('.header__burger');
  burger.classList.toggle('cross');
}

document.addEventListener('click', function(event) {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.header__burger');

  if (!menu.contains(event.target) && !burger.contains(event.target) && menu.classList.contains('active')) {
      menu.classList.remove('active');
      burger.classList.remove('cross');
  }
});

document.addEventListener('keydown', function(event) {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.header__burger');

  if (event.key === 'Escape' && menu.classList.contains('active')) {
      menu.classList.remove('active');
      burger.classList.remove('cross');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  let headers = document.querySelectorAll('.column__header');

  headers.forEach(function(header) {
      header.addEventListener('click', function() {
          if (this.nextElementSibling.style.display === 'none' || !this.nextElementSibling.style.display) {
              this.nextElementSibling.style.display = 'block';
              header.querySelector(".footer__down").style.transform = "rotate(180deg)";
          } else {
              this.nextElementSibling.style.display = 'none';
              header.querySelector(".footer__down").style.transform = "rotate(0deg)";
          }
      });
  });
});





function setupPopupEventListeners() {
  document.querySelectorAll('.productBlackButton').forEach((button, index) => {
    button.addEventListener('click', () => {
      openPopup(index);
    });
  });
}




document.addEventListener('DOMContentLoaded', () => {
  setupPopupEventListeners();
});



function openPopup() {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const popup = document.createElement("div");
  popup.classList.add("popup");
  
  popup.innerHTML = `
      <button class="popup__close-btn closeButton"></button>
      <h2 class="popup__title">Заказ в 1 клик</h2>
      <p class="popup__text">Оставьте свой номер, мы перезвоним в ближайшее время.</p>
      <p class="popup__input_title">Как к Вам обращаться</p>
      <input class="popup__input nameInput" type="text" id="nameBlackInput" placeholder="Введите Ваше имя">
      <p class="popup__input_title">Ваш номер телефона *</p>
      <input class="popup__input phoneInput" type="tel" id="phoneBlackInput" placeholder="+7 (___) ___--___" required>
      <p class="popup__text_rules">Отправляя данные, Вы соглашаетесь с</p>
      <a href="#" class="popup__link">Правилами обработки персональных данных</a>
      <button class="popup__button submitButton" id="submitBlackButton" disabled>ОТПРАВИТЬ</button>
  `;

  
  
  popupContainer.appendChild(popup);
  document.body.appendChild(popupContainer);

  const nameInput = document.getElementById("nameBlackInput");
  const phoneInput = document.getElementById("phoneBlackInput");
  const submitButton = document.getElementById("submitBlackButton");
  const closeButton = popup.querySelector(".closeButton");

  
  nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
  });
 
 
  phoneInput.addEventListener("input", mask, false);
  phoneInput.addEventListener("focus", mask, false);
  phoneInput.addEventListener("blur", mask, false);
  phoneInput.addEventListener("keydown", mask, false);
  phoneInput.addEventListener("mouseup", (event) => {
    event.preventDefault();
    if (phoneInput.value.length < 4) {
      phoneInput.setSelectionRange(4, 4);
    } else {
      phoneInput.setSelectionRange(
        phoneInput.value.length,
        phoneInput.value.length
      );
    }
  });
  function closePopup() {
    const popupContainer = document.querySelector(".popup-container");
    if (popupContainer) {
      document.body.removeChild(popupContainer);
      document.body.style.overflow = "auto";
    }
  }

  submitButton.addEventListener("click", function (event) {
    let isValid = validateInputs();
    if (isValid) {
      closePopup();
    } else {
      event.preventDefault();
    }
  });



  function validateInputs() {
    const nameInput = document.getElementById("nameBlackInput");
    const phoneInput = document.getElementById("phoneBlackInput");
    
    let nameIsValid = nameInput.value.trim() !== "";
    let phoneIsValid = phoneInput.value.replace(/\D/g, '').length === 11;
  
    return nameIsValid && phoneIsValid;
  }

  function updateSubmitButtonState() {
    if (validateInputs()) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }
}

nameInput.addEventListener('input', updateSubmitButtonState);
phoneInput.addEventListener('input', updateSubmitButtonState);


  function validateInputs() {
      return nameInput.value.trim() !== "" && phoneInput.value.replace(/\D/g, '').length === 11;
  }

  function updateSubmitButtonState() {
      submitButton.disabled = !validateInputs();
  }

  nameInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
      updateSubmitButtonState();
  });

  phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9+()]/g, "");
      updateSubmitButtonState();
  });

  submitButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (validateInputs()) {
          console.log("Data is valid, sending...");
          // Добавьте ваш код для отправки данных здесь, если все валидно.
          closePopup();
      }
  });

 
  closeButton.addEventListener("click", closePopup);

  popupContainer.addEventListener("click", function (event) {
      if (event.target === popupContainer) {
          closePopup();
      }
  });

  document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
          closePopup();
      }
      
  });
}

function setupPopupYellowEventListeners(){
  document.querySelectorAll('.productYellowButton').forEach((button, index) =>{
    button.addEventListener('click', () => {
      openYellowPopup(index)
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  setupPopupYellowEventListeners();
});


function openYellowPopup(index) {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const popup = document.createElement("div");
  popup.classList.add("popup");
  
  popup.innerHTML = `
      <button class="popup__close-btn closeButton"></button>
      <h2 class="popup__title">Заказать</h2>
      <p class="popup__text">Оставьте свой номер, мы перезвоним в ближайшее время.</p>
      <p class="popup__input_title">Как к Вам обращаться</p>
      <input class="popup__input nameInput" type="text" id="nameOrderInput" placeholder="Введите Ваше имя">
      <p class="popup__input_title">Ваш номер телефона *</p>
      <input class="popup__input phoneInput" type="tel" id="phoneOrderInput" placeholder="+7 (___) ___--___" required>
      <p class="popup__text_rules">Отправляя данные, Вы соглашаетесь с</p>
      <a href="#" class="popup__link">Правилами обработки персональных данных</a>
      <button class="popup__button submitButton" id="submitOrderButton" disabled>ОТПРАВИТЬ</button>
  `;

  popupContainer.appendChild(popup);
  document.body.appendChild(popupContainer);

  const nameInput = document.getElementById("nameOrderInput");
  const phoneInput = document.getElementById("phoneOrderInput");
  const submitButton = document.getElementById("submitOrderButton");
  const closeButton = popup.querySelector(".closeButton");

  
  nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
  });

 
  phoneInput.addEventListener("input", mask, false);
  phoneInput.addEventListener("focus", mask, false);
  phoneInput.addEventListener("blur", mask, false);
  phoneInput.addEventListener("keydown", mask, false);
  phoneInput.addEventListener("mouseup", (event) => {
    event.preventDefault();
    if (phoneInput.value.length < 4) {
      phoneInput.setSelectionRange(4, 4);
    } else {
      phoneInput.setSelectionRange(
        phoneInput.value.length,
        phoneInput.value.length
      );
    }
  });
  function closePopup() {
    const popupContainer = document.querySelector(".popup-container");
    if (popupContainer) {
      document.body.removeChild(popupContainer);
      document.body.style.overflow = "auto";
    }
  }

  submitButton.addEventListener("click", function (event) {
    let isValid = validateInputs();
    if (isValid) {
      closePopup();
    } else {
      event.preventDefault();
    }
  });

  function validateInputs() {
    const nameInput = document.getElementById("nameBlackInput");
    const phoneInput = document.getElementById("phoneBlackInput");
    
    let nameIsValid = nameInput.value.trim() !== "";
    let phoneIsValid = phoneInput.value.replace(/\D/g, '').length === 11;
  
    return nameIsValid && phoneIsValid;
  }

  function updateSubmitButtonState() {
    if (validateInputs()) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }
}

nameInput.addEventListener('input', updateSubmitButtonState);
phoneInput.addEventListener('input', updateSubmitButtonState);


  function validateInputs() {
      return nameInput.value.trim() !== "" && phoneInput.value.replace(/\D/g, '').length === 11;
  }

  function updateSubmitButtonState() {
      submitButton.disabled = !validateInputs();
  }

  nameInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
      updateSubmitButtonState();
  });

  phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9+()]/g, "");
      updateSubmitButtonState();
  });

  submitButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (validateInputs()) {
          console.log("Data is valid, sending...");
          // Добавьте ваш код для отправки данных здесь, если все валидно.
          closePopup();
      }
  });

  function closePopup() {
      document.body.removeChild(popupContainer);
  }

  closeButton.addEventListener("click", closePopup);

  popupContainer.addEventListener("click", function (event) {
      if (event.target === popupContainer) {
          closePopup();
      }
  });

  document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
          closePopup();
      }
  });
  
}