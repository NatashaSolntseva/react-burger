import { combineReducers } from "redux";

import { modalReducer } from "./modalReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { constructorReducer } from "./constructorReducer";
import { userDataReducer } from "./userReducer";

export const rootReducer = combineReducers({
  modal: modalReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  burgerConstructor: constructorReducer,
  user: userDataReducer,
});
