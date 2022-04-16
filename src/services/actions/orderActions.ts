import { BASE_URL } from "../../utils/api";
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

export type TOrderActions =
  | ISendOrderNumberRequest
  | ISendOrderNumberSuccess
  | ISendOrderNumberFaild;

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
        console.log("yea");
        dispatch(sendOrderNumberSuccess(serverResOrderId));
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (error) {
      dispatch(sendOrderNumberFailed());
    }
  };
};

export const findOrderById = (id: string) => (state: RootState) => {
  const order = state.feed.ordersData?.orders.find(
    (order: TWsOrder) => order._id === id
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
