import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// компоненты
import AppHeader from "../app-header/appHeader";
// страницы
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPswPage from "../../pages/fogot-password/forgot-password";
import ResetPswPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientPage from "../../pages/ingredient-info/ingredient-page";
import NotFound404Page from "../../pages/not-found-404/not-found-404";
import FeedPage from "../../pages/feed/feed";

const App: FC = () => {
  return (
    <>
      <Router>
        <AppHeader />
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
          <Route path="/feed">
            <FeedPage />
          </Route>
          <Route>
            <NotFound404Page />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
