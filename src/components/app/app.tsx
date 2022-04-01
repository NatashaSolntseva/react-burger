import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// компоненты
import AppHeader from "../app-header/appHeader";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPswPage from "../../pages/fogot-password/forgot-password";
import ResetPswPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientPage from "../../pages/ingredient-info/ingredient-page";

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
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPswPage />
          </Route>
          <Route path="/reset-password">
            <ResetPswPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/ingredient">
            <IngredientPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
