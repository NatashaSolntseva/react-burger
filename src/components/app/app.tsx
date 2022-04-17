import { FC, useCallback, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { ILocation } from "../../utils/types";
import { useAppDispatch } from "../../services/hooks/hooks";

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
import NotFound404Page from "../../pages/not-found-404/not-found-404";
import FeedPage from "../../pages/feed/feed";
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/components/ingredient-detail/ingredientDetails";
import { getIngredientsRequestApi } from "../../services/actions/ingredientsActions";
import { checkUserAuth } from "../../services/actions/userActions";
import OrderInfo from "../order-info/order-info";

const App: FC = () => {
  const location = useLocation<ILocation>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const background =
    history.action === "PUSH" && location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredientsRequestApi());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const closeModal = useCallback(
    (href: string) => {
      history.push(href);
    },
    [history]
  );

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
          <ResetPswPage />s
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientDetails />
        </Route>
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderInfo />
        </Route>

        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderInfo protectedRoute />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>

        <Route>
          <NotFound404Page />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id">
          <Modal closeModal={() => closeModal("/")}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal closeModal={() => closeModal("/feed")}>
            <OrderInfo />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal closeModal={() => closeModal("/profile/orders")}>
            <OrderInfo />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
