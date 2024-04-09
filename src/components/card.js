import { addLikeCard, removeCard } from "./api";

export function createCard(item, likeCard, handleImageClick, handleDelete, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardElement.dataset.id = item._id;
  // проверка на корзину
  if (item.owner._id !== userId) {
    deleteButton.classList.add("card__delete-button-hidden");
  }

  const likeCount = item.likes.length || 0;
  const likeCountNode = cardElement.querySelector(".like-button__count");
  likeCountNode.textContent = likeCount;

  const hasLikes = item.likes.some((like) => like._id === userId);

  // Если есть хотя бы один лайк от текущего пользователя, применяем класс к кнопке лайка
  if (hasLikes) {
    likeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", () => {
    handleDelete(cardElement);
  });

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardElement);
  });

  cardImage.addEventListener("click", () => {
    handleImageClick(item);
  });

  return cardElement;
}


// Функция удаления карточки
export function deleteCard(cardElement) {
  removeCard(cardElement.dataset.id)
  .then(() => {
    cardElement.remove();
    console.log("Карточка успешно удалена");
  })
  .catch((err) => console.error(`Ошибка удаления карточки: ${err}`));
}

export function likeCard(likeButton, cardNode) {
  const isMyLikeOnCard = likeButton.classList.contains(
    "card__like-button_is-active"
  );
  const cardId = cardNode.dataset.id;

  const likeCountNode = cardNode.querySelector(".like-button__count");
  if (!isMyLikeOnCard) {
    addLikeCard(cardId, false)
      .then((result) => {
        likeButton.classList.add("card__like-button_is-active");
        const likeCount = result.likes.length || 0;
        likeCountNode.textContent = likeCount;
        console.log("На карточку успешно добавлен лайк");
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  } else if (isMyLikeOnCard) {
    addLikeCard(cardId, true)
      .then((result) => {
        likeButton.classList.remove("card__like-button_is-active");
        const likeCount = result.likes.length || 0;
        likeCountNode.textContent = likeCount;
        console.log("С карточки успешно удален лайк");
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }
}