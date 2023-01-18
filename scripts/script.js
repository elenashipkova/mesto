const profileEditBtn = document.querySelector(".profile__button-edit");
const popupContainer = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_about");
let formElement = document.querySelector(".popup__container");

// Открывает модальное окно, заполняет его поля данными из профиля
function openPopup() {
  popupContainer.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Закрывает модальное окно
function closePopup() {
  popupContainer.classList.remove("popup_opened");
}

/* Обработчик формы
Вставляет введенные в input-ах значения в соответствующие поля профиля
Закрывает модальное окно
*/
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

profileEditBtn.addEventListener("click", openPopup);
formElement.addEventListener("submit", handleFormSubmit);
popupCloseBtn.addEventListener("click", closePopup);