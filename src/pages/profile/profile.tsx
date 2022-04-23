import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";

import { patchUser } from "../../services/actions/userActions";

import styles from "./profile.module.css";

import FormInputWrapper from "../../components/form-input-wrapper/formInputWrapper";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileNav from "../../components/profile-nav/pforile-nav";

import {
  WS_AUTH_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/feedActions";
import Loader from "../../components/loader/loader";
import OrdersLists from "../../components/orders-lists/orders-lists";
import ErrorMessage from "../../components/error-message/error-message";

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const { userName, userEmail, userPassword } = useAppSelector(
    (store) => store.user
  );
  const { ordersData, wsConnected, wsError, wsRequest } = useAppSelector(
    (store) => store.feed
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

  useEffect(() => {
    dispatch({ type: WS_AUTH_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const isInfoChanged = useMemo(
    () => name !== userName || email !== userEmail || password !== userPassword,
    [userName, userEmail, userPassword, name, email, password]
  );
  //console.log("isInfo", isInfoChanged);

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

  //console.log("wsRequest", wsRequest);

  return (
    <div className={styles.wrapper}>
      <ProfileNav />
      <Route path="/profile" exact>
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
              <Button
                type="secondary"
                size="medium"
                onClick={handleResetChanges}
              >
                Отмена
              </Button>
              <Button type="primary" size="medium" onClick={handleSaveChanges}>
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </Route>
      <Route path="/profile/orders">
        {wsRequest && <Loader />}
        {!wsError && wsConnected && ordersData ? (
          <section className={styles.orderHistoryPage__content}>
            <OrdersLists
              ordersData={ordersData.orders && [...ordersData.orders].reverse()}
              path="/profile/orders/"
              isOrderStatus
            />
          </section>
        ) : (
          <ErrorMessage>
            Ошибка загрузки данных. Пожалуйста, попробуйте зайти позже
          </ErrorMessage>
        )}
      </Route>
    </div>
  );
};

export default ProfilePage;

//сначала идут более поздние по ТЗ

/*
        {!wsError && wsConnected && ordersData ? (
          <section className={styles.orderHistoryPage__content}>
            <OrdersLists
              ordersData={ordersData.orders && [...ordersData.orders].reverse()}
              path="/profile/orders/"
              isOrderStatus
            />
          </section>
        ) : (
          <Loader />
        )}

*/
