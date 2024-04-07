import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal";
import { createCard, likeCard } from "./components/card";
import { getUserData, getInitialCards, updateUserProfile, addNewCard, deleteCard, updateAvatar } from "./components/api";
import { validationSettings, enableValidation, clearValidation } from "./components/validation";

const profileTitle = document.querySelector(".profile__title");
const profileAvatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type-avatar");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileDescription = document.querySelector(".profile__description");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const formElementAddCard = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const placesList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const addCardNameInput = formElementAddCard.querySelector(
  ".popup__input_type_card-name"
);
const addCardUrlInput = formElementAddCard.querySelector(
  ".popup__input_type_url"
);
const imgInPopup = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const avatarFormElement = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarFormElement.querySelector(".popup__input_type_url");


function handleImageClick(dataCard) {
  imgInPopup.src = dataCard.link;
  imgInPopup.alt = dataCard.name;
  popupCaption.textContent = dataCard.name;
  openPopup(popupImage);
}

export function renderCard(item, method = "append") {
  const cardElement = createCard(item, deleteCard, likeCard, handleImageClick, userId);
  placesList[method](cardElement);
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение..."
  } else {
    button.textContent = "Сохранить"
  }
}

buttonEditProfile.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationSettings);
  openPopup(popupEditProfile);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter); // Начало процесса сохранения
  const newName = nameInput.value;
  const newAbout = jobInput.value;

  // Обновление данных пользователя на сервере
  updateUserProfile(newName, newAbout)
    .then(() => {
      profileTitle.textContent = newName;
      profileDescription.textContent = newAbout;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter); // Завершение процесса сохранения
    });
}

// Добавление слушателя на отправку формы редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

profileForm.addEventListener("input", (evt) => {
  console.log(evt.target.validity.valid);
});

buttonAddNewCard.addEventListener("click", function () {
  openPopup(popupAddNewCard);
  clearValidation(popupAddNewCard, validationSettings);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter); // Начало процесса сохранения
  const newName = addCardNameInput.value;
  const newLink = addCardUrlInput.value;

  // Добавление новой карточки на сервер
  addNewCard(newName, newLink)
    .then((newCard) => {
      renderCard(newCard, "prepend");
      formElementAddCard.reset();
      closePopup(popupAddNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter); // Завершение процесса сохранения
    });
}

formElementAddCard.addEventListener("submit", handleAddCardFormSubmit);

enableValidation(validationSettings);

// изменение аватара

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter); // Начало процесса сохранения
  updateAvatar({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.style = `background-image: url(${data.avatar})`;
      userAvatar = data.avatar;
      closePopup(avatarPopup);
      console.log('Аватар успешно изменен')
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter); // Завершение процесса сохранения
    });
}

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

profileAvatar.addEventListener("click", () => {
  clearValidation(avatarPopup, validationSettings);
  openPopup(avatarPopup)
})

profileForm.addEventListener("submit", handleAvatarFormSubmit);


let userId = "";
let userAvatar = "";

Promise.all([getInitialCards(), getUserData()])
.then(([initialCards, userData]) => {
  userAvatar = userData.avatar;
  userId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  initialCards.forEach(function (cardData) {
    renderCard(cardData);
  });
})
.catch((err) => {
  console.log(err);
});








