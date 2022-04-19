import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  GET_EXACT_ORDER_BY_NUMBER_SUCCESS,
} from "../actions/feedActions";
import { TWsAnswer } from "../../utils/types";
import { TWsActions } from "../actions/feedActions";

type TdefaultFeedOrdersState = {
  ordersData: TWsAnswer | null;
  wsConnected: boolean;
  wsError: boolean;
};

const defaultFeedOrdersState: TdefaultFeedOrdersState = {
  ordersData: null,
  wsConnected: false,
  wsError: false,
};

export const feedOrdersReducer = (
  state = defaultFeedOrdersState,
  action: TWsActions
): TdefaultFeedOrdersState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: true,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        ordersData: action.payload,
      };
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsError: true,
      };
    case GET_EXACT_ORDER_BY_NUMBER_SUCCESS:
      return {
        ...state,
        ordersData: action.payload,
      };
    default:
      return state;
  }
};
