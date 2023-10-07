import {apiConfig} from "./utils";

class Api {
    constructor(config) {
        this._url           = config.url;
        this._headers       = config.headers;
        this._likesUrl = `${this._url}/cards/likes`;
        this._authorization = config.headers['authorization'];
    }

    /**Проверить на ошибки */
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Упс.... Что-то пошло не так! Ошибка: ${res.status}`);
    };

    /**Запросить данные с сервера */
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            },
        })
            .then(res => this._checkResponse(res))
    }

    /** Функция добавления новой карточки на сервер */
    addNewCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method : 'POST',
            headers: this._headers,
            body   : JSON.stringify({
                name: name,
                link: link,
            }),
        })
            .then(res => this._checkResponse(res))
    };

    /**Функция получения данных пользователя с сервера*/
    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            },
        })
            .then(res => this._checkResponse(res))
    }

    /** Функция передачи данных пользователя с сервера */
    setUserInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method : 'PATCH',
            headers: this._headers,
            body   : JSON.stringify({
                name : name,
                about: about,
            }),
        })
            .then(res => this._checkResponse(res))
    }

    /**Функция передачи на сервер нового аватара */
    setUserAvatar(src) {
        return fetch(`${this._url}/users/me/avatar`, {
            method : 'PATCH',
            headers: this._headers,
            body   : JSON.stringify({
                avatar: src,
            }),
        })
            .then(res => this._checkResponse(res))
    }

    /**Функция удаления карточки с сервера */
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method : 'DELETE',
            headers: {
                authorization: this._authorization,
            }
        })
            .then(res => this._checkResponse(res))
    }

    //** метод постановки/удаления лайка на карточке */
    changeLikeCardStatus(cardId, isNotLiked){
        return fetch(`${this._likesUrl}/${cardId}`, {
            method: isNotLiked ? "PUT" : "DELETE",
            headers: {
                authorization: this._authorization,
            }
        })
            .then(res => this._checkResponse(res))
    }

}

const api = new Api(apiConfig)

export {api};