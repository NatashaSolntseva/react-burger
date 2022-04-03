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

  //для 2 пункта задания TODO
  createNewUser(data: IUserSignInForm, acessToken: string) {
    return fetch(`${BASE_URL}auth/register`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${acessToken}` },
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  registerNewUserReuest(data: IUserSignInForm) {
    return fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  signInUserRequest(data: IUserSignInForm) {
    return fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  signOutUserRequest() {
    return fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    }).then(this._getResponseData);
  }

  updateToen() {
    return fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    }).then(this._getResponseData);
  }

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
