import { getCookie } from "./cookies";

export const inputDataUrl = "https://norma.nomoreparties.space/api";

const BASE_URL = "https://norma.nomoreparties.space/api";

type TBaseUrl = { url: string };

interface IUserSignInForm {
  email: string;
  password: string;
  name?: string;
}

class Api {
  _url: string;
  _headers: { [name: string]: string };
  constructor({ url }: TBaseUrl) {
    this._url = url;
    this._headers = { "Content-type": "application/json" };
  }

  _getResponseData(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  }

  getIngredients() {
    return fetch(`${BASE_URL}/ingredients`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  //TODO getOrderNumber

  registerNewUserRequest(
    email: string,
    password: string,
    name: string,
    accessToken: string
  ) {
    return fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then(this._getResponseData);
  }

  signInUserRequest(email: string, password: string, accessToken: string) {
    return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._getResponseData);
  }

  signOutUserRequest(refreshToken: string) {
    return fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${refreshToken}` },
      body: JSON.stringify({ token: refreshToken }),
    }).then(this._getResponseData);
  }

  updateToken() {
    return fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    }).then(this._getResponseData);
  }

  /*
GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.
*/

  getUserRequest() {
    return fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }).then(this._getResponseData);
  }

  patchUserRequest(data: { name: string; email: string }) {
    return fetch(`${BASE_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  resetUserPassword(data: { password: string; token: string }) {
    return fetch(`${BASE_URL}/password-reset/reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  remindPassword(email: string) {
    return fetch(`${BASE_URL}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email }),
    }).then(this._getResponseData);
  }
}

export default new Api({ url: BASE_URL });

/*
После успешной авторизации приходят два токена.
Первый (accessToken) используется для внутренних запросов к серверу — получения или обновления данных о пользователе.
Если токен просрочился и данные о пользователе нельзя получить или обновить, то используйте маршрут /auth/token и отправляйте на него второй токен — refreshToken для получения нового accessToken.
После этого повторите запрос на получение или обновление данных о пользователе.



POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.


*/
