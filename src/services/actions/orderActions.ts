import api, { BASE_URL } from "../../utils/api";
import type { AppDispatch, AppThunk, RootState } from "../../index";
import { TWsOrder } from "../../utils/types";
import { getCookie } from "../../utils/cookies";

//Получение и обновление номера заказа в модальном окне OrderDetails.
export const SEND_ORDER_NUMBER_REQUEST: "SEND_ORDER_NUMBER_REQUEST" =
  "SEND_ORDER_NUMBER_REQUEST";
export const SEND_ORDER_NUMBER_FAILED: "SEND_ORDER_NUMBER_FAILED" =
  "SEND_ORDER_NUMBER_FAILED";
export const SEND_ORDER_NUMBER_SUCCESS: "SEND_ORDER_NUMBER_SUCCESS" =
  "SEND_ORDER_NUMBER_SUCCESS";

//Получение заказа от API по номеру заказа для страницы с описанием заказа
export const GET_EXACT_ORDER_BY_NUMBER_REQUEST: "GET_EXACT_ORDER_BY_NUMBER_REQUEST" =
  "GET_EXACT_ORDER_BY_NUMBER_REQUEST";
export const GET_EXACT_ORDER_BY_NUMBER_SUCCESS: "GET_EXACT_ORDER_BY_NUMBER_SUCCESS" =
  "GET_EXACT_ORDER_BY_NUMBER_SUCCESS";
export const GET_EXACT_ORDER_BY_NUMBER_FAILD: "GET_EXACT_ORDER_BY_NUMBER_FAILD" =
  "GET_EXACT_ORDER_BY_NUMBER_FAILD";

export interface ISendOrderNumberRequest {
  readonly type: typeof SEND_ORDER_NUMBER_REQUEST;
}

export interface ISendOrderNumberSuccess {
  readonly type: typeof SEND_ORDER_NUMBER_SUCCESS;
  readonly orderID: number;
}

export interface ISendOrderNumberFaild {
  readonly type: typeof SEND_ORDER_NUMBER_FAILED;
}

export interface IGetOrderByNumberRequest {
  readonly type: typeof GET_EXACT_ORDER_BY_NUMBER_REQUEST;
}

export interface IGetOrderByNumberSuccess {
  readonly type: typeof GET_EXACT_ORDER_BY_NUMBER_SUCCESS;
  readonly payload: [];
}

export interface IGetOrderByNumberFaild {
  readonly type: typeof GET_EXACT_ORDER_BY_NUMBER_FAILD;
}

export type TOrderActions =
  | ISendOrderNumberRequest
  | ISendOrderNumberSuccess
  | ISendOrderNumberFaild
  | IGetOrderByNumberRequest
  | IGetOrderByNumberSuccess
  | IGetOrderByNumberFaild;

const sendOrderNumberRequest = (): ISendOrderNumberRequest => {
  return {
    type: SEND_ORDER_NUMBER_REQUEST,
  };
};

const sendOrderNumberSuccess = (orderID: number): ISendOrderNumberSuccess => {
  return {
    type: SEND_ORDER_NUMBER_SUCCESS,
    orderID,
  };
};

const sendOrderNumberFailed = (): ISendOrderNumberFaild => {
  return {
    type: SEND_ORDER_NUMBER_FAILED,
  };
};

export const getOrderNumberApi: AppThunk = (
  orderIngredientList: Array<string>
) => {
  return async (dispatch: AppDispatch) => {
    const postOrderOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify({
        ingredients: orderIngredientList,
      }),
    };

    try {
      dispatch(sendOrderNumberRequest());
      const res = await fetch(`${BASE_URL}/orders`, postOrderOption);
      if (res.ok) {
        const serverResOrderId = await res.json();
        //console.log("yea");
        dispatch(sendOrderNumberSuccess(serverResOrderId));
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (error) {
      dispatch(sendOrderNumberFailed());
    }
  };
};

export const findExactOrderByNumber =
  (number: number) => (state: RootState) => {
    const order = state.feed.ordersData?.orders.find(
      (order: TWsOrder) => order.number === number
    );
    return order
      ? order
      : {
          _id: "",
          status: "",
          name: "",
          createdAt: "",
          updatedAt: "",
          number: 0,
          ingredients: [""],
        };
  };

export const getOrderByNumber: AppThunk = (number: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_EXACT_ORDER_BY_NUMBER_REQUEST });
    api
      .getOrderByNumberApi(number)
      .then((res) => {
        dispatch({ type: GET_EXACT_ORDER_BY_NUMBER_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.log(`Ошибка при поиске заказа по номеру. ${error}`);
        dispatch({
          type: GET_EXACT_ORDER_BY_NUMBER_FAILD,
        });
      });
  };
};
