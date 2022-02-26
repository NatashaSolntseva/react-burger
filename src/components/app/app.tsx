import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// компоненты
import AppHeader from "../app-header/appHeader";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";

const App: FC = () => {
  return (
    <>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
