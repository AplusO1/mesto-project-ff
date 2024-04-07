const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: "0ff0541d-587f-4471-8c2a-4256dc671d17",
    "Content-Type": "application/json",
  },
};


// получение данных о пользователе
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  })
};

// получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  })
};

export function updateUserProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then((userData) => {
    console.log('Данные пользователя успешно обновлены:', userData);
    return userData;
  })
}

export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  })
  .then((newCard) => {
    console.log('Новая карточка успешно добавлена:', newCard);
    return newCard;
  })
}

export function deleteCard(cardElement) {
  const cardId = cardElement.dataset.id;

  // Удаление карточки из DOM
  cardElement.remove();

  // Затем обновление состояния карточки на сервере
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  })
  .then((data) => {
    console.log('Карточка успешно удалена:', data);
    return data;
  })
}

export function addLikeCard(id, isLiked) {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: method,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

export const updateAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
};




// fetch(`${config.baseUrl}/cards`, {
//   headers: config.headers
// })
// .then(res => {
//   if (res.ok) {
//     return res.json();
//   }
//   throw new Error(`Ошибка при загрузке карточек: ${res.status}`);
// })
// .then((cards) => {
//   // Перебираем полученные карточки и рендерим каждую
//   cards.forEach((cardData) => {
//     console.log(cardData);
//   });
// })
// .catch((error) => {
//   console.error('Ошибка при загрузке карточек:', error);
// });
