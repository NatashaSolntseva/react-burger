import { FC, useCallback } from "react";
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
import OrderHistoryPage from "../../pages/order-history/order-histort";
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/components/ingredient-detail/ingredientDetails";
import { closeModal } from "../../services/actions/modalActions";
import { useAppDispatch } from "../../services/hooks/hooks";

const App: FC = () => {
  const location = useLocation<ILocation>();
  const background = location.state && location.state.background;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleIngredientModalClose = useCallback(() => {
    dispatch(closeModal());
    history.replace("/");
  }, [dispatch, history]);

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
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/orders">
          <OrderHistoryPage />
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
      {background && (
        <Route path="/ingredients/:id">
          <Modal closeModal={handleIngredientModalClose}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
