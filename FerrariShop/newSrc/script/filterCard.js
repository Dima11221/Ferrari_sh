const typeNameNode = document.querySelector(".search_js");
const typeBodyNodes = document.querySelectorAll(".type_body_js");
const formFilter = document.querySelector(".filter_form_js");
const inputs = formFilter.querySelectorAll("input[type=text]");
const inputCheckBoxAndRadio = formFilter.querySelectorAll(
    "input[type=radio], input[type=checkbox]");

import engine from '../images/icons/dvigatel.svg';
import transmission from '../images/icons/transmission.svg';
import typeCar from '../images/icons/type.svg';
import {data} from './mocks';

let backet = [];

const initialFilters = {
  name: "",
  year: null,
  isNew: true,
  engine_max: null,
  engine_min: null,
  drive: "Все",
  typeBody: "",
  price_max: null,
  price_min: null,
};

let filters = { ...initialFilters };



function createCard(obj) {
  return `
    <div class="flex-row card-title">
        <div class="">
            <h3 class="title-model">
                ${obj.name}
            </h3>
            <p class="title-year">
            ${obj.year}
            </p>
        </div>
        ${obj.isNew ? '<span class="newCar">New</span>' : ""}
    </div>
    <img class="card-img" src='${obj.img}' alt="${obj.name}">
    <div class="card-info flex-row">
        <div class="flex-row">
            <img class="detail-img" src= ${engine} alt="Доп инфо фото">
            <p class="detail-info">${obj.engine} L</p>
        </div>
        <div class="flex-row">
            <img class="detail-img" src= ${transmission} alt="Доп инфо фото">
            <p class="detail-info">${obj.drive}</p>
        </div>
        <div class="flex-row">
            <img class="detail-img" src= ${typeCar} alt="Доп инфо фото">
            <p class="detail-info">${obj.typeBody}</p>
        </div>
    </div>
    <button class="btn-reset card-btn" id="${obj.id}">€ ${obj.price.toLocaleString()}</button>
    <button class = "btn-more">Подробнее</button>
    <p class = 'description'>${obj.description}</p>`;
}

// Отображение дополнительной информации про машину по клику на "Подробнее"

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-more')) {
    e.preventDefault();
    console.log(e.target);
    const description = e.target.closest('.wrapper-card').querySelector('.description');
    description.classList.toggle('description-visible');
  }
});

function printCards() {
  let newCard = data;

  newCard = newCard.filter((el) => {
    if (filters.price_max && filters.price_max < el.price) {
      return false;
    }
    if (filters.price_min && filters.price_min > el.price) {
      return false;
    }
    if (filters.engine_max && filters.engine_max < el.engine) {
      // console.log(filters.engine_max, el.engine, typeof filters.engine_max);
      return false;
    }
    if (filters.engine_min && filters.engine_min > el.engine) {
      return false;
    }
    if (filters.isNew !== null && filters.isNew !== el.isNew) {
      return false;
    }
    if (filters.drive !== "Все" && filters.drive !== el.drive) {
      return false;
    }
    if (filters.year !== null && filters.year !== el.year) {
      return false;
    }
    if (filters.typeBody && filters.typeBody !== el.typeBody) {
      return false;
    }

    if (
        filters.name &&
        !el.name.toLowerCase().trim().includes(filters.name.toLowerCase().trim())
    ) {
      return false;
    }
    // console.log(newCard)
    return true;
  });

  // console.log(newCard);

  const autoWrapperJs = document.querySelector(".auto-wrapper-js");
  autoWrapperJs.innerHTML = ""; // для очистки поля с машинами
  newCard.forEach((obj) => {
    const card = document.createElement("div");
    // card.classList = ["wrapper-card", "flex-collumn", "hide"];
    card.classList.add("wrapper-card", "flex-column");
    card.innerHTML = createCard(obj);
    autoWrapperJs.append(card);
  });
  addToBacket()
}

// Фильтр по кузову

const filterOfTypeBody = () => {
  typeBodyNodes.forEach((typeBodyNode) => {
    typeBodyNode.addEventListener("click", (event) => {
      console.log(event.currentTarget); // currentTarget - сам объект клика, на который повешено событие (в нашем случае кнопка)

      // console.log(data)
      if (event.currentTarget.value !== "Всё") {
        filters.typeBody = event.currentTarget.value;
        typeBodyNodes.forEach((node) => {
          node.classList.remove("active");
        });
        event.currentTarget.classList.add("active");
      } else {
        filters = { ...initialFilters };
        typeNameNode.value = "";
        typeBodyNodes.forEach((node) => {
          node.classList.remove("active");
        });
        inputs.forEach((inputNode) => {
          inputNode.value = "";
        });
        inputCheckBoxAndRadio.forEach((node) => {
          if (node.name === "isNew" && filters.isNew) {
            node.checked = true;
          } else if (node.name === "isNew") {
            node.checked = false;
          }
          if (node.name === "drive" && node.value === filters.drive) {
            node.checked = true;
          } else if (node.name === "drive") {
            node.checked = false;
          }
        });
      }
      printCards();
    });
  });
  // console.log(typeBodyNodes);
};

// Фильтр по названию

const filterOfName = () => {
  typeNameNode.addEventListener("input", (event) => {

    if (event.currentTarget.value.trim() !== "") {

      filters.name = event.currentTarget.value.trim();
    }
    printCards();
  });
};


const openFilter = () => {
  const formFilter = document.querySelector(".filter_form_js");
  document.querySelector(".open_filter_js").addEventListener("click", () => {
    if (formFilter.classList.contains("visible")) {
      formFilter.classList.remove("visible");
      formFilter.addEventListener('transitionend', (e) => {
        formFilter.style.display = "none";
      }, {once: true});
    } else {
      formFilter.style.display = "flex";
      requestAnimationFrame(() => {
        formFilter.classList.add("visible");
      })
    }
  });
}

// Окно формы фильтра

const formOfFilter = () => {
  formFilter.addEventListener("submit", (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      // console.log(input.value, input.name);

      filters[input.name] =
          input.value || !isNaN(input.value) ? +input.value : null; // + = перевод в число
    });
    // console.log(event.target);
    inputCheckBoxAndRadio.forEach((input) => {
      // console.log(input.value, input.name, input.checked);
      if (input.name === "isNew") {
        filters[input.name] = input.checked;
      } else if (input.checked) {
        filters[input.name] = input.value;
      }
      // filterValues[input.name] = input.value ?? 0; // ?? -если равно null или undefined = 0
    });

    printCards();
  });
};


// Корзина
const btnBacket = document.getElementById('backet');
const backetModal = document.getElementById('backet_Modal');
const backetList = document.querySelector('.backet_list');
// const btnPlus = document.getElementById('plus');
const btnMinus = document.getElementById('minus');


// Открыть корзину
const openBacket = () => {
  backetModal.classList.add("open")
  // console.log(backetList);
  backetContent();
}


const backetContent = () => {
  const backetList = document.querySelector(".backet_list .cart"); // пробел перед .card - обращение к дочернему элементу
  // const total = document.querySelector('.backet_list .total');
  backetList.innerHTML = "";
  const groupedItems = groupBacketItem()
  groupedItems.forEach((el) => {
    const backetItem = document.createElement("li");

    backetItem.id = el.id;
    backetItem.classList.add('basketItem');
    backetItem.innerHTML = `
      <div>
        <img class= 'smallPicture' src = '${el.img}'>
      </div>
      <div class= 'basket_Item_Info'> 
        <p>Модель: ${el.name};</p>
        <p>Цена: € ${el.price};</p>
        <p>Количество: ${el.count} шт.</p>
      </div>`

    backetList.append(backetItem);
    backetItem.append(changeCount('plus'));
    backetItem.append(changeCount('minus'));
  });
  const totalPrice = document.createElement('h3');
  totalPrice.classList.add('totalPrice')
  totalPrice.innerText = `Итого: € ${groupedItems.reduce((total, el) => total += el.count ? el.count * el.price : el.price, 0)}`;
  backetList.append(totalPrice);

  const clearCart = document.querySelector('.clearCart');
  clearCart.addEventListener('click', () => {
    backetList.innerHTML = "";
    backet = [];
    saveToStorage(backet);
    btnBacket.setAttribute('data-backet', 0)

  })

  attachModalEvents()
  // changeBacketItemsByBtn()
};
btnBacket.addEventListener("click", openBacket)



const changeCount = (plusOrMinus) => {
  const button = document.createElement("button");
  // button.id = plusOrMinus;
  button.classList.add(plusOrMinus)
  // console.log(plusOrMinus);
  button.innerText = plusOrMinus === 'plus' ? '+' : '-';
  let groupedItems = groupBacketItem();
  button.addEventListener('click', () => {
    groupedItems = groupedItems.map((el) => {
      if (el.id === Number(button.parentElement.id)) {
        // console.log({...el, count: el.count});

        return {
          ...el,
          count: plusOrMinus === 'plus' ? el.count + 1 : el.count - 1
        }

      } else {
        return el
      }
    })
    groupedItems = groupedItems.filter(el => el.count > 0);

    backet = groupedItems.flatMap(el => Array(el.count).fill({
      id: el.id,
      ...el,
    }))

    backetContent();
    saveToStorage(backet);
    changeBacketItemsByBtn();

    // const totalItems = backet.reduce((total, el) =>
    //     (total + (el.count || 1)/el.count), 0);
    // btnBacket.setAttribute('data-backet', totalItems);
  })
  return button;
};


// Изменение счетчика у корзины через кнопки "+" и "-"
const changeBacketItemsByBtn = () => {
  const totalItems = backet.reduce((total, el) =>
      (total + (el.count || 1)/el.count), 0); //логика костыльная такая, потому что без деления на кол-во элементов числа прибавлялись квадратными корнями
  // console.log(totalItems)
  btnBacket.setAttribute('data-backet', totalItems);
}

// Группировка элементов в корзине
const groupBacketItem =() => {
  const groupBacket = {};
  backet.forEach(item => {
    if (groupBacket[item.id]) {
      groupBacket[item.id].count += 1;
    } else {
      groupBacket[item.id] = {...item, count: 1};
    }
  });
  // console.log(Object.values(groupBacket))
  return Object.values(groupBacket);
}


// Добавление событий на модальное окно
const attachModalEvents = () => {
  backetModal.querySelector('.close').addEventListener('click', closeBacket);
  document.addEventListener('keydown', handleEscape);
  backetModal.addEventListener('click', handleOutside);

};

// Событие на Escape
const handleEscape = (event) => {
  if (event.key === "Escape") {
    closeBacket()
  }
};


// Событие на клик за модальное окно
const handleOutside = (event) => {

  const isClickOutside = !!event.target.closest('.modal-content');
  // console.log(isClickOutside)
  if (!isClickOutside) {
    closeBacket()
  }
};

// Обход бага с закрытием модального окна при нажатии на кнопки "+" или "-"
backetList.addEventListener('click', (event) => {
  event.stopPropagation()
});

// Закрыть корзину
const closeBacket = () => {
  backetModal.classList.remove("open");
  detachModalEvents()
};

// Очистка событий модального окна
const detachModalEvents = () => {
  backetModal.querySelector('.close').removeEventListener('click', openBacket);
  document.removeEventListener('keydown', handleEscape);
  backetModal.removeEventListener('click', handleOutside)
}



//Добавление карточки в корзину

const cardBtns = document.getElementsByClassName("card-btn");


const addToBacket = () => {
  // console.log(cardBtns.length)
  if (cardBtns.length){
    for (let btn of cardBtns) {
      btn.addEventListener("click", (event) => {
        const elBacket = data.find((el) => el.id === +event.target.id)
        // console.log(typeof event.target.id);
        // console.log(elBacket)


        if (elBacket) {
          backet.push(elBacket);
          saveToStorage(backet);
          // console.log(btnBacket.getAttribute('data-backet'))
          const dataBacket = btnBacket.getAttribute('data-backet');
          btnBacket.setAttribute('data-backet', Number(dataBacket) + 1)
        }
      });
    }
  }
}


//Сохранение в localStorage

const saveToStorage = (item) => {
  const items = JSON.parse(localStorage.getItem('items')) || [];

  localStorage.setItem('items', JSON.stringify(item));
}

const loadTodos = () => {
  const items = JSON.parse(localStorage.getItem('items'));
  if (items) {
    // console.log(items)
    backet = items;
    btnBacket.setAttribute('data-backet', backet.length);
  }
}
document.addEventListener('DOMContentLoaded', loadTodos)



// Раздел обратной связи
const openCallback = () => {
  const callbackForm = document.querySelector('.callback_form_js');
  const btnsCallback = document.querySelectorAll('.btn_callback_js');
  btnsCallback.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (callbackForm.classList.contains("callback_visible")) {
        callbackForm.classList.remove("callback_visible");
        callbackForm.addEventListener('transitionend', (e) => {
          callbackForm.style.display = "none";
        }, {once: true});
      } else {
        callbackForm.style.display = "grid";
        requestAnimationFrame(() => {
          callbackForm.classList.add("callback_visible");
        })
      }
    })
  })
}

// Перенос к разделу обратной связи

document.getElementById('scroll_to_button').addEventListener('click', () => {
  document.getElementById('target').scrollIntoView({behavior: 'smooth'});
})

//Проверка на заполнение формы обратной связи

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.form_validate_js') ;

  forms.forEach((form) => {
    const nameInput = form.querySelector('.name_filled_js');
    const phoneInput = form.querySelector('.phone_filled_js');
    const emailInput = form.querySelector('.email_filled_js');
    const checkbox = form.querySelector('input[name="agree"]');
    const submitButton = form.querySelector('.submit_btn_js');

    // submitButton.disabled = true;

    const validateForm = () => {
      const isNameFilled = nameInput.value.trim() !== '';
      const isPhoneFilled = phoneInput.value.trim() !== '';
      const isEmailFilled = emailInput.value.trim() !== '';
      const isCheckboxFilled = checkbox.checked;

      submitButton.disabled = !(isNameFilled && isPhoneFilled && isEmailFilled && isCheckboxFilled);
    };

    nameInput.addEventListener('input', validateForm);
    phoneInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    checkbox.addEventListener('change', validateForm);

    validateForm();

  });

});

const initApp = () => {
  //Печать карточек + фильтры
  printCards();
  filterOfTypeBody();
  filterOfName();
  openFilter();
  formOfFilter();
  openCallback();

  //Открытие модального окна
  openBacket()
  closeBacket()
  //
  //   addToBacket()
};
initApp();
  
  