import {
  SEND_ORDER_NUMBER_REQUEST,
  SEND_ORDER_NUMBER_FAILED,
  SEND_ORDER_NUMBER_SUCCESS,
} from "../actions/orderActions";

import { TOrderActions } from "../actions/orderActions";

type TdefaultOrderState = {
  orderId: number | null;
  isOrderInfoLoading: boolean;
  isOrderInfoRequestFaild: boolean;
};

const defaultOrderState: TdefaultOrderState = {
  orderId: null,
  isOrderInfoLoading: false,
  isOrderInfoRequestFaild: false,
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
    default:
      return state;
  }
};
