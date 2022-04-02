import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import storeState from "./services/store";
import { Provider } from "react-redux";

import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TOrderActions } from "./services/actions/orderActions";
import { TIngredientsActions } from "./services/actions/ingredientsActions";
import { TConstructorActions } from "./services/actions/constructorActions";
import { TModalActions } from "./services/actions/modalActions";

import "./index.css";
import App from "./components/app/app";

type TApplicationActions =
  | TOrderActions
  | TConstructorActions
  | TIngredientsActions
  | TModalActions;

export type RootState = ReturnType<typeof storeState.getState>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = typeof storeState.dispatch;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeState}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
