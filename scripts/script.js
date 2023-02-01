const profileEditBtn = document.querySelector(".profile__button-edit");
const popupContainer = document.querySelector(".profile-edit-popup");
const popupPhotoAdd = document.querySelector(".photo-add-popup");
const popupPhotoView = document.querySelector(".photo-view");
const editProfileCloseBtn = document.querySelector(".edit-profile-btn");
const photoAddPopupCloseBtn = document.querySelector(".photo-add-cls");
const photoAddBtn = document.querySelector(".profile__button-photo-add");
const photoViewCloseBtn = document.querySelector(".photo-view__cls-btn");
let photoImage = document.querySelector(".photo-card__image");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_about");
let formElement = document.querySelector(".popup__form");

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

const cardList = document.querySelector(".photo-elements-list");
const cardTemplate = document.querySelector(".photo-elements__template").content.querySelector(".photo-card");
const cardCreateBtn = document.querySelector(".photo-create-btn");
const cardNameInput = document.querySelector(".popup__input_type_title");
const cardLinkInput = document.querySelector(".popup__input_type_link");
const imageCaption = document.querySelector(".photo-view__caption");
const photoViewImg = document.querySelector(".photo-view__image");

/* Возвращает шаблон карточки
Удаляет карточку по клику на кнопку удаления
Ставит и отменяет "лайк" на фото
Открывает модальное окно с увеличенным фото
*/
function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".photo-card__title").textContent = item.name;
  card.querySelector(".photo-card__image").src = item.link;
  
  const cardImage = card.querySelector(".photo-card__image");
  const cardTitle = card.querySelector(".photo-card__title");
 
  cardImage.addEventListener("click", () => {
    imageCaption.textContent = cardTitle.textContent;
    photoViewImg.src = cardImage.src;
    openPhotoViewPopup();
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
}

// Создает html-элементы из массива initialCards
function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  });
  cardList.append(...cards);
  console.log(cards);
}
renderCards(initialCards);

// Добавляет новую карточку на страницу через форму модального окна
cardCreateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = cardNameInput.value;
  const link = cardLinkInput.value;
  
  const card = createCard({name: title, link: link});
  cardList.prepend(card);
  closeAddPhotoPopup();
});

// Открывает модальное окно редактирования профиля, заполняет его поля данными из профиля
function openPopup() {
  popupContainer.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Закрывает модальное окно редактирования профиля
function closeEditProfilePopup() {
  popupContainer.classList.remove("popup_opened");
}

// Открывает модальное окно добавления новой карточки
function openPhotoAddPopup() {
  popupPhotoAdd.classList.add("popup_opened");
}

// Закрывает модальное окно добавления фото
function closeAddPhotoPopup() {
  popupPhotoAdd.classList.remove("popup_opened");
}

// Открывает модальное окно просмотра фото
function openPhotoViewPopup() {
  popupPhotoView.classList.add("popup_opened");
}

// Закрывает модальное окно просмотра фото
function closePhotoViewPopup() {
  popupPhotoView.classList.remove("popup_opened");
}

/* Обработчик формы редактирования профиля
Вставляет введенные в input-ах значения в соответствующие поля профиля
Закрывает модальное окно редактирования профайла
*/
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditProfilePopup();
}

profileEditBtn.addEventListener("click", openPopup);
formElement.addEventListener("submit", handleFormSubmit);
photoAddBtn.addEventListener("click", openPhotoAddPopup);
editProfileCloseBtn.addEventListener("click", closeEditProfilePopup);
photoAddPopupCloseBtn.addEventListener("click", closeAddPhotoPopup);
photoViewCloseBtn.addEventListener("click", closePhotoViewPopup);