import "./pages/index.css";
import { initialCards } from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import { createCard } from "./components/card";
const profileTitle = document.querySelector(".profile__title");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileDescription = document.querySelector(".profile__description");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const buttonsClosePopup = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const formElementAddCard = document.forms["new-place"];
const formElement = document.forms["edit-profile"];
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const popupAddNewCard = document.querySelector(".popup_type_new-card");



initialCards.forEach(function (cardData) {
  createCard(cardData);
});

buttonEditProfile.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonsClosePopup.forEach((buttonClosePopup) => {
  const popup = buttonClosePopup.closest(".popup");
  buttonClosePopup.addEventListener("click", () => closePopup(popup));
});

popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    }
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newDescription = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  closePopup(popupEditProfile);
}

formElement.addEventListener("submit", handleFormSubmit);

buttonAddNewCard.addEventListener("click", function () {
  formElementAddCard.reset();
  openPopup(popupAddNewCard);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const placeName = formElementAddCard.querySelector(".popup__input_type_card-name").value;
  const imageUrl = formElementAddCard.querySelector(".popup__input_type_url").value;

  const newCardData = {
    name: placeName,
    link: imageUrl,
  };

  createCard(newCardData);

  closePopup(popupAddNewCard);
}

formElementAddCard.addEventListener("submit", handleAddCardFormSubmit);
