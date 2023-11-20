const BASE_URL = 'http://localhost:3000';

// const BASE_URL = 'https://api.micky.nomoredomainsrocks.ru';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    };
};

export function registerUser(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => checkResponse(res));
};

export function authorizeUser(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => checkResponse(res))
        .then((data) => {
            if (data.token) {
                const token = data.token;
              console.log(token);
                localStorage.setItem('jwt', token);
              console.log(localStorage);
                return token;
            };
        })
};

export function getContent(token) {
    return fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => checkResponse(res))
        .then(data => data)
};