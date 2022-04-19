import { act } from "react-dom/test-utils";
import {
  SEND_ORDER_NUMBER_REQUEST,
  SEND_ORDER_NUMBER_FAILED,
  SEND_ORDER_NUMBER_SUCCESS,
  GET_EXACT_ORDER_BY_NUMBER_REQUEST,
  GET_EXACT_ORDER_BY_NUMBER_SUCCESS,
  GET_EXACT_ORDER_BY_NUMBER_FAILD,
} from "../actions/orderActions";

import { TOrderActions } from "../actions/orderActions";

type TdefaultOrderState = {
  orderId: number | null;
  isOrderInfoLoading: boolean;
  isOrderInfoRequestFaild: boolean;
  order: [];
};

const defaultOrderState: TdefaultOrderState = {
  orderId: null,
  isOrderInfoLoading: false,
  isOrderInfoRequestFaild: false,
  order: [],
};

export const orderReducer = (
  state = defaultOrderState,
  action: TOrderActions
) => {
  switch (action.type) {
    case SEND_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        isOrderInfoLoading: true,
      };
    }
    case SEND_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderId: action.orderID,
        isOrderInfoLoading: false,
        isOrderInfoRequestFaild: false,
      };
    }
    case SEND_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderId: null,
        isOrderInfoFaild: true,
      };
    }
    case GET_EXACT_ORDER_BY_NUMBER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
      };
    }
    default:
      return state;
  }
};
