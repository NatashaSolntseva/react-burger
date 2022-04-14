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

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClose
  | IWsConnectionGetMessage
  | IWsConnectionSendMessage
  | IClickOnOrder;
