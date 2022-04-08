import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import styles from "./profile.module.css";

import FormInputWrapper from "../../components/form-input-wrapper/formInputWrapper";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { deleteCookie, getCookie } from "../../utils/cookies";
import Api from "../../utils/api";
import {
  LOGOUT_USER_REQUEST,
  patchUser,
} from "../../services/actions/userActions";

const ProfilePage: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { userName, userEmail, userPassword } = useAppSelector(
    (store) => store.user
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userName) {
      setName(userName);
      setEmail(userEmail);
    }
  }, [userName, userEmail]);

  const isInfoChanged = useMemo(
    () => name !== userName || email !== userEmail || password !== userPassword,
    [userName, userEmail, userPassword, name, email, password]
  );
  //console.log("isInfo", isInfoChanged);

  const handleLogoutClick = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      const refreshToken = getCookie("refreshToken");
      // console.log("refreshToen", refreshToken);
      refreshToken && Api.signOutUserRequest(refreshToken);
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
      dispatch({ type: LOGOUT_USER_REQUEST });
    },
    [dispatch]
  );

  const handleResetChanges = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      setName(userName);
      setEmail(userEmail);
      setPassword("");
    },
    [userName, userEmail]
  );

  const handleSaveChanges = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(patchUser(name, email, password));
    },
    [dispatch, name, email, password]
  );

  return (
    <div className={styles.wrapper}>
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
      <form className={styles.form}>
        <FormInputWrapper>
          <Input
            name="name"
            type="text"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            icon="EditIcon"
            placeholder="Имя"
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <Input
            name="login"
            type="text"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            icon="EditIcon"
            placeholder="Логин"
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            icon="EditIcon"
            placeholder="Пароль"
          />
        </FormInputWrapper>
        {isInfoChanged && (
          <div className={styles.form__buttons}>
            <Button type="secondary" size="medium" onClick={handleResetChanges}>
              Отмена
            </Button>
            <Button type="primary" size="medium" onClick={handleSaveChanges}>
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;

//TODO  условный рендернинг кнопок - userPassword <empty string> в хранилице
//TODO  серверная часть - патч юзера
//TODO что-то не то с хранилищем пароля
