export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  _checkResponce(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
  
  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    .then((this._checkResponce)) 
  }
  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      method: 'GET'
    })
    .then((this._checkResponce)) 
  }
  post(createCard) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: createCard.name,
        link: createCard.link
      })
    })
    .then((this._checkResponce)) 
  }
  
  delete(deleteCard) {
    return fetch(`${this._url}cards/${deleteCard}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((this._checkResponce)) 
  }
  patch(editProfile) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: editProfile.name,
        about: editProfile.job
      })
    })
    .then((this._checkResponce)) 
  }

  setLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((this._checkResponce)) 
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((this._checkResponce)) 
  }
  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then((this._checkResponce)) 
  }
}
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77/',
  headers: {
    authorization: '5c05787c-aae6-42ac-a3d9-88173b538217',
    'Content-Type': 'application/json'
  }
})
export default api