// Элементы попапа и формы редактирования профиля
const profileEditBtn = document.querySelector(".profile__button-edit");
const profileEditPopup = document.querySelector(".profile-edit-popup");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_about");
const profileForm = document.querySelector(".popup__form");
// Элементы попапа и формы добавления новой карточки
const photoAddPopup = document.querySelector(".photo-add-popup");
const photoAddBtn = document.querySelector(".profile__button-photo-add");
const photoAddForm = document.querySelector(".photo-add-form");
const cardNameInput = document.querySelector(".popup__input_type_title");
const cardLinkInput = document.querySelector(".popup__input_type_link");
// Элементы попапа просмотра изображения
const photoViewPopup = document.querySelector(".photo-view");
const imageCaption = document.querySelector(".photo-view__caption");
const photoViewImg = document.querySelector(".photo-view__image");
const closeButtons = document.querySelectorAll(".popup__close-button");
// Элементы template карточки
const cardList = document.querySelector(".photo-elements-list");
const cardTemplate = document.querySelector(".photo-elements__template").content.querySelector(".photo-card");

const initialCards = [
  {
    name: 'Waterfall',
    link: 'https://images.unsplash.com/photo-1674729215824-9659ed4294d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
  },
  {
    name: 'Древний мост',
    link: 'https://images.unsplash.com/photo-1669266007069-9eaf210e59a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
  },
  {
    name: 'Lagoon',
    link: 'https://images.unsplash.com/photo-1665932674673-e229e34923c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
  },
  {
    name: 'Santorini',
    link: 'https://images.unsplash.com/photo-1672661164594-9c1287c79904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
  },
  {
    name: 'Сафари',
    link: 'https://images.unsplash.com/photo-1673846502518-7227bf65105b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3250&q=80'
  },
  {
    name: 'Сакура',
    link: 'https://images.unsplash.com/photo-1611053571700-93bc64a26af9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1585&q=80'
  }
];  

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
    imageCaption.textContent = cardTitle.textContent;
    photoViewImg.src = cardImage.src;
    photoViewImg.alt = cardTitle.textContent;
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
};

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
};

// Открывает модальное окно редактирования профиля, заполняет его поля данными из профиля
function openProfileEditForm() {
  openPopup(profileEditPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

// Без этой функции попап с формой новой карточки открывается один раз автоматически при загрузке страницы
// после его закрытия, по клику на "плюсик" уже больше не открывается
function openCardPopupReset (evt) {
  openPopup(photoAddPopup);
  evt.target.reset();
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
photoAddBtn.addEventListener("click", openCardPopupReset);
photoAddForm.addEventListener("submit", handleCardFormSubmit);
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});