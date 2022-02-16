import {
  SEND_ORDER_NUMBER_FAILED,
  SEND_ORDER_NUMBER_SUCCESS,
  SEND_ORDER_NUMBER_REQUEST,
} from "../services/actions/orderActions";

export const inputDataUrl = "https://norma.nomoreparties.space/api";

export const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
};

//export const getOrderNumber = (order)
//фомирование заказа, отправка на сервер данных об ингр-ах бургера
export const getOrderNumberApi = (orderIngredientList) => {
  return async (dispatch) => {
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
