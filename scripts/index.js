// Элементы попапа и формы редактирования профиля
const profileEditBtn = document.querySelector(".profile__button-edit");
const profileEditPopup = document.querySelector(".profile-edit-popup");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_about");
const profileForm = document.querySelector(".popup__form");
const profileSubmitBtn = profileForm.querySelector(validationConfig.submitButtonSelector);
// Элементы попапа и формы добавления новой карточки
const photoAddPopup = document.querySelector(".photo-add-popup");
const photoAddBtn = document.querySelector(".profile__button-photo-add");
const photoAddForm = document.querySelector(".photo-add-form");
const inputPhotoAddList = Array.from(photoAddForm.querySelectorAll('.popup__input'));
const cardSubmitBtn = photoAddForm.querySelector(validationConfig.submitButtonSelector);
const cardNameInput = document.querySelector(".popup__input_type_title");
const cardLinkInput = document.querySelector(".popup__input_type_link");
// Элементы попапа просмотра изображения
const photoViewPopup = document.querySelector(".photo-view");
const imageCaption = document.querySelector(".photo-view__caption");
const photoViewImg = document.querySelector(".photo-view__image");
const closeButtons = document.querySelectorAll(".popup__close-button");
//Все попапы
const popupForms = document.querySelectorAll('.popup');
// Элементы template карточки
const cardList = document.querySelector(".photo-elements-list");
const cardTemplate = document.querySelector(".photo-elements__template").content.querySelector(".photo-card");

/* Возвращает шаблон карточки
Удаляет карточку по клику на кнопку удаления
Ставит и отменяет "лайк" на фото
Открывает модальное окно с увеличенным фото
*/
function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".photo-card__image");
  const cardTitle = card.querySelector(".photo-card__title");
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
 
  cardImage.addEventListener("click", () => {
    imageCaption.textContent = item.name;
    photoViewImg.src = item.link;
    photoViewImg.alt = item.name;
    openPopup(photoViewPopup);
  });

  card.querySelector(".photo-card__delete-icon").addEventListener("click", () => {
    card.remove();
  });
  
  const like = card.querySelector(".photo-card__like-btn");
  like.addEventListener("click", (e) => {
    e.preventDefault();
    like.classList.toggle("photo-card__like-btn_active");
  });

  return card;
};

// Создает html-элементы из массива initialCards
function renderCards(items) {
  const cards = items.map(createCard);
  cardList.append(...cards);
};
renderCards(initialCards);

// Открытие попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
};

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
};

// Закрытие попапов при нажатии на Esc
function closePopupEscape (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Открывает модальное окно редактирования профиля, заполняет его поля данными из профиля
function openProfileEditForm() {
  openPopup(profileEditPopup);
  resetInputValidation(profileForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetSubmitBtnState(profileForm, profileSubmitBtn);
};

/* Обработчик формы редактирования профиля
Вставляет введенные в input-ах значения в соответствующие поля профиля
Закрывает модальное окно редактирования профайла
*/
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
};

// Обработчик формы создания новой карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const title = cardNameInput.value;
  const link = cardLinkInput.value;
  
  const card = createCard({name: title, link: link});
  cardList.prepend(card);
  closePopup(photoAddPopup);
  evt.target.reset();
};

// Обработчики событий
profileEditBtn.addEventListener("click", openProfileEditForm);

profileForm.addEventListener("submit", handleProfileFormSubmit);

photoAddBtn.addEventListener("click", () => {
  openPopup(photoAddPopup);
  resetInputValidation(photoAddForm)
  toggleButtonState(inputPhotoAddList, cardSubmitBtn);
});
photoAddForm.addEventListener("submit", handleCardFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

popupForms.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});
