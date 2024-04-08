const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: "0ff0541d-587f-4471-8c2a-4256dc671d17",
    "Content-Type": "application/json",
  },
};

// проверка ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}


// получение данных о пользователе
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(checkResponse)
};

// получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(checkResponse)
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
  .then(checkResponse)
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
  .then(checkResponse)
}

export function removeCard(id) {
  // обновление состояния карточки на сервере
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}

export function addLikeCard(id, isLiked) {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: method,
    headers: config.headers,
  })
  .then(checkResponse)
}

export const updateAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
  .then(checkResponse)
};




fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Ошибка при загрузке карточек: ${res.status}`);
})
.then((cards) => {
  // Перебираем полученные карточки и рендерим каждую
  cards.forEach((cardData) => {
    console.log(cardData);
  });
})
.catch((error) => {
  console.error('Ошибка при загрузке карточек:', error);
});
