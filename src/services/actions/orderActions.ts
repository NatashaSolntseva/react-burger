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
  readonly order: number;
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

const sendOrderNumberSuccess = (order: number): ISendOrderNumberSuccess => {
  return {
    type: SEND_ORDER_NUMBER_SUCCESS,
    order,
  };
};

const sendOrderNumberFailed = (): ISendOrderNumberFaild => {
  return {
    type: SEND_ORDER_NUMBER_FAILED,
  };
};

//TODO перенести сюда API
