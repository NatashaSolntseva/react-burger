import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// компоненты
import AppHeader from "../app-header/appHeader";
import HomePage from "../../pages/home/home";

const App: FC = () => {
  return (
    <>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
