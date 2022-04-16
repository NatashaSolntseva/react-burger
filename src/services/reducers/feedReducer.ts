import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
} from "../actions/feedActions";
import { TWsAnswer } from "../../utils/types";
import { TWsActions } from "../actions/feedActions";

type TdefaultFeedOrdersState = {
  ordersData: TWsAnswer | null;
  orderNumber: number | null;
  wsConnected: boolean;
  wsError: boolean;
};

const defaultFeedOrdersState: TdefaultFeedOrdersState = {
  ordersData: null,
  orderNumber: null,
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
    default:
      return state;
  }
};
