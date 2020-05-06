'use strict';
// day 2
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = logInForm.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('delivery');

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function autorized() {

  function logOut() {
    login = localStorage.removeItem('delivery');

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  console.log('Авторизован');

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function notAutorized() {
  console.log('Не авторизован');

  function logIn(event) {
    event.preventDefault();

    login = loginInput.value;

    if (!login) {
      alert('Введите логин!');
      return;
    };

    localStorage.setItem('delivery', login);

    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

function createCardRestaurnats() {
  const card = `
          <a class="card card-restaurant">
            <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image" />
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title">Пицца плюс</h3>
                <span class="card-tag tag">50 мин</span>
              </div>
              <div class="card-info">
                <div class="rating">
                  4.5
                </div>
                <div class="price">От 900 ₽</div>
                <div class="category">Пицца</div>
              </div>
            </div>
          </a>`;
  cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
      <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">Пицца Классика</h3>
        </div>
        <!-- /.card-heading -->
        <div class="card-info">
          <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
            грибы.
          </div>
        </div>
        <!-- /.card-info -->
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">510 ₽</strong>
        </div>
      </div>
  `);

  cardsMenu.append(card);
}

function openGoods(event) {
  if (!login) {
    toggleModalAuth();
    return;
  }

  const target = event.target;
  const restaurant = target.closest('.card-restaurant');

  if (!restaurant) return;

  cardsMenu.textContent = '';
  containerPromo.classList.add('hide');
  restaurants.classList.add('hide');
  menu.classList.remove('hide');


  createCardGood();
  createCardGood();
  createCardGood();
}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function () {
  containerPromo.classList.remove('hide')
  restaurants.classList.remove('hide')
  menu.classList.add('hide')
})

checkAuth()

createCardRestaurnats()
createCardRestaurnats()
createCardRestaurnats()