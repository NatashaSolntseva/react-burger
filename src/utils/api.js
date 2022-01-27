import { inputDataUrl } from "./data";
import {
  GET_INGREDIENTS_API_REQUEST,
  GET_INGREDIENTS_API_FAILD,
  GET_INGREDIENTS_API_SUCCESS,
  SEND_ORDER_NUMBER_REQUEST,
  SEND_ORDER_NUMBER_FAILED,
  SEND_ORDER_NUMBER_SUCCESS,
} from "../services/actions/actions";

export const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
};

export function getIngredientsApiRequest() {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS_API_REQUEST });
    fetch(`${inputDataUrl}/ingredients`)
      .then((res) => getResponseData(res))
      .then((ingredients) => {
        dispatch({
          type: GET_INGREDIENTS_API_SUCCESS,
          payload: ingredients.data,
        });
      })
      .catch((error) => {
        console.log(`Данные с сервера не получены, ошибка: ${error}`);
        dispatch({
          type: GET_INGREDIENTS_API_FAILD,
        });
      });
  };
}

//фомирование заказа, отправка на сервер данных об ингр-ах бургера
export const getOrderNumberApi = (constructorIngredients) => {
  return async (dispatch) => {
    const orderIngredientList = constructorIngredients
      .filter((el) => el.type !== "bun")
      .map((el) => el._id)
      .concat(
        constructorIngredients.find((el) => (el.type === "bun" ? el : 0))._id,
        constructorIngredients.find((el) => (el.type === "bun" ? el : 0))._id
      );
    const postOrderOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: orderIngredientList,
      }),
    };

    try {
      dispatch({ type: SEND_ORDER_NUMBER_REQUEST });
      const res = await fetch(`${inputDataUrl}/orders`, postOrderOption);
      if (res.ok) {
        const serverResOrderId = await res.json();
        dispatch({
          type: SEND_ORDER_NUMBER_SUCCESS,
          payload: serverResOrderId,
        });
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (error) {
      dispatch({ type: SEND_ORDER_NUMBER_FAILED });
    }
  };
};
