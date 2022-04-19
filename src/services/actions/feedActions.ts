import { AppDispatch, AppThunk } from "../..";
import api from "../../utils/api";
import { TWsAnswer } from "../../utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";

export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export const WS_AUTH_CONNECTION_SUCCESS: "WS_AUTH_CONNECTION_SUCCESS" =
  "WS_AUTH_CONNECTION_SUCCESS";
export const WS_AUTH_CONNECTION_ERROR: "WS_AUTH_CONNECTION_ERROR" =
  "WS_AUTH_CONNECTION_ERROR";
export const WS_AUTH_CONNECTION_GET_MESSAGE: " WS_AUTH_CONNECTION_GET_MESSAGE" =
  " WS_AUTH_CONNECTION_GET_MESSAGE";
export const WS_AUTH_CONNECTION_START: " WS_AUTH_CONNECTION_START" =
  " WS_AUTH_CONNECTION_START";

export const CLICK_ON_ORDER: "CLICK_ON_ORDER" = "CLICK_ON_ORDER";

//Получение заказа от API по номеру заказа для страницы с описанием заказа
export const GET_EXACT_ORDER_BY_NUMBER_REQUEST: "GET_EXACT_ORDER_BY_NUMBER_REQUEST" =
  "GET_EXACT_ORDER_BY_NUMBER_REQUEST";
export const GET_EXACT_ORDER_BY_NUMBER_SUCCESS: "GET_EXACT_ORDER_BY_NUMBER_SUCCESS" =
  "GET_EXACT_ORDER_BY_NUMBER_SUCCESS";
export const GET_EXACT_ORDER_BY_NUMBER_FAILD: "GET_EXACT_ORDER_BY_NUMBER_FAILD" =
  "GET_EXACT_ORDER_BY_NUMBER_FAILD";

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload: Event;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: Event;
}

export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload: Event;
}

export interface IWsConnectionGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TWsAnswer;
}

export interface IWsConnectionSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: { [key in any]: any };
}

export interface IClickOnOrder {
  readonly type: typeof CLICK_ON_ORDER;
  payload: number;
}

export interface IWsAuthConnectionStart {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}

export interface IWsAuthConnectionSuccess {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
  payload: Event;
}

export interface IWsAuthConnectionError {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
  payload: Event;
}

export interface IGetOrderByNumberRequest {
  readonly type: typeof GET_EXACT_ORDER_BY_NUMBER_REQUEST;
}

export interface IGetOrderByNumberSuccess {
  readonly type: typeof GET_EXACT_ORDER_BY_NUMBER_SUCCESS;
  readonly payload: TWsAnswer;
}

export interface IGetOrderByNumberFaild {
  readonly type: typeof GET_EXACT_ORDER_BY_NUMBER_FAILD;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClose
  | IWsConnectionGetMessage
  | IWsConnectionSendMessage
  | IClickOnOrder
  | IWsAuthConnectionStart
  | IWsAuthConnectionSuccess
  | IWsAuthConnectionError
  | IGetOrderByNumberRequest
  | IGetOrderByNumberSuccess
  | IGetOrderByNumberFaild;

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
