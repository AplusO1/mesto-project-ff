import "./pages/index.css";
import { initialCards } from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import { createCard, deleteCard, likeCard } from "./components/card";

const profileTitle = document.querySelector(".profile__title");
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
const addCardNameInput = formElementAddCard.querySelector(".popup__input_type_card-name");
const addCardUrlInput = formElementAddCard.querySelector(".popup__input_type_url");
const imgInPopup = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

function handleImageClick(dataCard) {
  imgInPopup.src = dataCard.link;
  imgInPopup.alt = dataCard.name;
  popupCaption.textContent = dataCard.name;
  openPopup(popupImage);
}

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item, deleteCard, likeCard, handleImageClick);
  placesList[method](cardElement);
}

initialCards.forEach(function (cardData) {
  renderCard(cardData);
});

buttonEditProfile.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target === popup) {
          closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
      }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newDescription = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  closePopup(popupEditProfile);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

buttonAddNewCard.addEventListener("click", function () {
  openPopup(popupAddNewCard);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = addCardNameInput.value;
  const imageUrl = addCardUrlInput.value;

  const newCardData = {
    name: placeName,
    link: imageUrl,
  };

  const cardElement = createCard(
    newCardData,
    deleteCard,
    likeCard,
    handleImageClick
  );
  placesList.prepend(cardElement);
  formElementAddCard.reset();
  closePopup(popupAddNewCard);
}

formElementAddCard.addEventListener("submit", handleAddCardFormSubmit);
