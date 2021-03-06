import { getCookie } from "./cookies";

export const BASE_URL = "https://norma.nomoreparties.space/api";

type TBaseUrl = { url: string };

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

  getOrderNumber(orderIngredientList: string[]) {
    return fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify({ ingredients: orderIngredientList }),
    });
  }

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

  /* GET запрос о данных пользователя */

  getUserRequest() {
    return fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }).then(this._getResponseData);
  }

  /* PATCH запрос с обновленными данными пользователя*/

  patchUserRequest(
    name: string,
    email: string,
    password: string,
    accessToken: string
  ) {
    return fetch(`${BASE_URL}/auth/user`, {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then(this._getResponseData);
  }

  remindPassword(email: string, accessToken: string) {
    return fetch(`${BASE_URL}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email }),
    }).then(this._getResponseData);
  }

  resetUserPassword(password: string, accessToken: string) {
    return fetch(`${BASE_URL}/password-reset/reset`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ password: password, token: accessToken }),
    }).then(this._getResponseData);
  }

  getOrderByNumberApi(number: number) {
    return fetch(`${BASE_URL}/orders/${number}`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    }).then(this._getResponseData);
  }
}

export default new Api({ url: BASE_URL });
