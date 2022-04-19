import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../services/reducers/root-reducer";

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const storeState = createStore(rootReducer, enhancer);

export default storeState;
