import React, { useCallback } from "react";
import styles from "./profileNav.module.css";
import Api from "../../utils/api";

import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../services/hooks/hooks";
import { deleteCookie, getCookie } from "../../utils/cookies";

import { LOGOUT_USER_REQUEST } from "../../services/actions/userActions";

const ProfileNav = () => {
  const dispatch = useAppDispatch();

  const handleLogoutClick = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      const refreshToken = getCookie("refreshToken");
      refreshToken && Api.signOutUserRequest(refreshToken);
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
      dispatch({ type: LOGOUT_USER_REQUEST });
    },
    [dispatch]
  );

  return (
    <aside className={styles.navwrapper}>
      <ul className={styles.list}>
        <li>
          <NavLink
            className={`text text_type_main-medium pt-4 pb-5 ${styles.listelement}`}
            activeClassName={styles.listelement_active}
            to="/profile"
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`text text_type_main-medium pt-4 pb-5 ${styles.listelement}`}
            activeClassName={styles.listelement_active}
            to="/profile/orders"
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <button
            className={`text text_type_main-medium text_color_inactive pt-4 pb-5 ${styles.button}`}
            onClick={handleLogoutClick}
          >
            Выход
          </button>
        </li>
      </ul>
      <div className={`mt-20`}>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info}`}
        >
          В этом разделе вы можете&nbsp; изменить свои персональные данные
        </p>
      </div>
    </aside>
  );
};

export default ProfileNav;
