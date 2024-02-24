const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(item) {
  const cardElement = getCard(item, { deleteCard });
  placesList.append(cardElement);
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function(cardData) { 
  createCard(cardData); 
}); 

function getCard(item, { deleteCard, likeCard, handleImageClick }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const { link, name } = item;

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}




// если нужно добавлять карточки по 1
// let currentCardIndex = 0;
// addButton.addEventListener("click", function () {
//   if (currentCardIndex < initialCards.length) {
//     createCard(initialCards[currentCardIndex]);
//     currentCardIndex++;
//   }
// });
//  если нужно добавлять все карточки сразу, этот код раскомментировать. Сверху код удалить
// addButton.addEventListener("click", function () {
//   initialCards.forEach(function (cardData) {
//     createCard(cardData);
//   });
// });

