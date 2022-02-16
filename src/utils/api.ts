export const inputDataUrl = "https://norma.nomoreparties.space/api";

export const getResponseData = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
};
