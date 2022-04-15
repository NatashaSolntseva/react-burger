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
  wsAllOrdersData: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

//const enhancer = composeWithDevTools(applyMiddleware(thunk));

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunk,
    socketMiddleware("wss://norma.nomoreparties.space/orders", wsFeedActions)
  )
);

const storeState = createStore(rootReducer, enhancer);

export default storeState;
