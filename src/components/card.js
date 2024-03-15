
export function createCard(item, deleteCard, likeCard, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  const { link, name } = item;

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt.target);
  });

  cardImage.addEventListener("click", () => {
    handleImageClick(item); 
  });

  return cardElement;
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

