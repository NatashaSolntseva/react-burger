import { inputDataUrl } from "../../utils/data";
import type { AppDispatch, AppThunk } from "../../index";

//Получение и обновление номера заказа в модальном окне OrderDetails.
export const SEND_ORDER_NUMBER_REQUEST: "SEND_ORDER_NUMBER_REQUEST" =
  "SEND_ORDER_NUMBER_REQUEST";
export const SEND_ORDER_NUMBER_FAILED: "SEND_ORDER_NUMBER_FAILED" =
  "SEND_ORDER_NUMBER_FAILED";
export const SEND_ORDER_NUMBER_SUCCESS: "SEND_ORDER_NUMBER_SUCCESS" =
  "SEND_ORDER_NUMBER_SUCCESS";

export interface ISendOrderNumberRequest {
  readonly type: typeof SEND_ORDER_NUMBER_REQUEST;
}

export interface ISendOrderNumberSuccess {
  readonly type: typeof SEND_ORDER_NUMBER_SUCCESS;
  readonly orderID: number;
  readonly payload: number;
}

export interface ISendOrderNumberFaild {
  readonly type: typeof SEND_ORDER_NUMBER_FAILED;
}

export type TOrderActions =
  | ISendOrderNumberRequest
  | ISendOrderNumberSuccess
  | ISendOrderNumberFaild;

const sendOrderNumberRequest = (): ISendOrderNumberRequest => {
  return {
    type: SEND_ORDER_NUMBER_REQUEST,
  };
};

const sendOrderNumberSuccess = (
  orderID: number,
  payload: number
): ISendOrderNumberSuccess => {
  return {
    type: SEND_ORDER_NUMBER_SUCCESS,
    orderID,
    payload,
  };
};

const sendOrderNumberFailed = (): ISendOrderNumberFaild => {
  return {
    type: SEND_ORDER_NUMBER_FAILED,
  };
};

//TODO перенести сюда API
/*
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

*/
