import {
  SEND_ORDER_NUMBER_REQUEST,
  SEND_ORDER_NUMBER_FAILED,
  SEND_ORDER_NUMBER_SUCCESS,
} from "../actions/actions";

const defaultOrderState = {
  orderId: null,
  isOrderInfoLoading: false,
  isOrderInfoRequestFaild: false,
};

export const orderReducer = (state = defaultOrderState, action) => {
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
        orderId: action.payload,
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
