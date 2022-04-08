import { FC } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { ILocation } from "../../utils/types";

// компоненты
import AppHeader from "../app-header/appHeader";
import ProtectedRoute from "../protected-route/protected-route";
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
  const location = useLocation<ILocation>();
  const background = location.state && location.state.background;
  const history = useHistory();
  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
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
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredient/:id" exact>
          <IngredientPage />
        </Route>
        <Route path="/feed">
          <FeedPage />
        </Route>
        <Route>
          <NotFound404Page />
        </Route>
      </Switch>
      {background && <Route path="/ingredients:id"></Route>}
    </>
  );
};

export default App;
