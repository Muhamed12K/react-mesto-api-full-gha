import {apiConfig} from "./utils";
//
class Api {
    constructor() {
        // this._baseUrl       = 'https://micky.nomoredomainsrocks.ru';
        this._baseUrl       = 'http://localhost:3001'
        this._headers       = apiConfig.headers;
        this._likesUrl      = `${this._url}/cards/likes`;
        this._authorization = apiConfig.headers['authorization'];
    }

    _request(url, options) {
      return fetch(url, options)
        .then(this._checkResponse);
    };

    /**Проверить на ошибки */
    _checkResponse(response) {
      if (response.ok) {
        return response.json();
      } else {
        Promise.reject(`Ошибка: ${response.status}/${response.statusText}`);
      };
    };

    /**Функция получения данных пользователя с сервера*/
    getUserInfoApi() {
      return this._request(`${this._baseUrl}/users/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-type': 'application/json'
          }
      }
      );
    };

    /** Функция передачи данных пользователя с сервера */
    setUserInfo(name, about) {
      return this._request(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, about })
      });
    }

    /**Функция передачи на сервер нового аватара */
    setUserAvatar(avatar) {
      return this._request(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ avatar })
      });
    }

    /**Запросить данные с сервера */
    getInitialCards() {
      return this._request(`${this._baseUrl}/cards`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        },
      });
    }

    /** Функция добавления новой карточки на сервер */
    addNewCard({name, link}) {
      return this._request(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, link })
      });
    };

    /**Функция удаления карточки с сервера */
    deleteCard(id) {
      return this._request(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        },
      });
    }

    //** метод постановки/удаления лайка на карточке */
    changeLikeCardStatus(cardId, isNotLiked){
      if (!isNotLiked) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-type': 'application/json'
          },
        });
      } else {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-type': 'application/json'
          },
        });
      }
    }

}

const api = new Api(apiConfig)

export {api};