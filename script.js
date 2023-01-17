const profileEditBtn = document.querySelector(".profile__button-edit");
const popupContainer = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_about");

function openPopup() {
  popupContainer.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popupContainer.classList.remove("popup_opened");
}

profileEditBtn.addEventListener("click", openPopup);

let formElement = document.querySelector(".popup__container");

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);

popupCloseBtn.addEventListener("click", closePopup);