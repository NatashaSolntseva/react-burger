import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../services/reducers/root-reducer";
import { socketMiddleware } from "./middleware/socket-middleware";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
} from "./actions/feedActions";

const wsFeedActions = {
  wsStart: WS_CONNECTION_START,
  wsSuccess: WS_CONNECTION_SUCCESS,
  wsError: WS_CONNECTION_ERROR,
  wsMessage: WS_GET_MESSAGE,
  wsClose: WS_CONNECTION_CLOSED,
};

const enhancer = composeWithDevTools(applyMiddleware(thunk));
/*
const enhancer = composeWithDevTools(
  applyMiddleware(
    thunk,
    socketMiddleware(
      "wss://norma.nomoreparties.space/api/orders/all",
      wsFeedActions
    )
  )
);
*/
const storeState = createStore(rootReducer, enhancer);

export default storeState;
