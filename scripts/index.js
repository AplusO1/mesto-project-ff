const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
let currentCardIndex = 0;

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  placesList.append(cardElement);
}

addButton.addEventListener("click", function () {
  if (currentCardIndex < initialCards.length) {
    createCard(initialCards[currentCardIndex]);
    currentCardIndex++;
  }
});
//  если нужно добавлять все карточки сразу, этот код раскомментировать. Сверху код удалить
// addButton.addEventListener("click", function () {
//   initialCards.forEach(function (cardData) {
//     createCard(cardData);
//   });
// });

placesList.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__delete-button")) {
    const card = event.target.closest(".places__item");
    card.remove();
  }
});

