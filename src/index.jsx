import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";

import { rootReducer } from "./services/reducers/root-reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

//import { DndProvider } from "react-dnd";
//import { HTML5Backend } from "react-dnd-html5-backend";

import "./index.css";
import App from "./components/app/app";
import React from "react";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
