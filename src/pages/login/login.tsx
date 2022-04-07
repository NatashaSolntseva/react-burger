import React, { FC, useCallback } from "react";
import { useState } from "react";

import AppForm from "../../components/app-form/appForm";
import AppFormSubmit from "../../components/app-form-submit/appFormSubmit";
import FormInputWrapper from "../../components/form-input-wrapper/formInputWrapper";
import FormCaption from "../../components/form-caption/formCaption";

import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { loginUser } from "../../services/actions/userActions";
import { Redirect, useHistory } from "react-router-dom";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { userIsAuth } = useAppSelector((store) => store.user);

  const history = useHistory();
  const { historyState }: any = history.location;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitOnSignInForm = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(loginUser(email, password));
    },
    [dispatch, email, password]
  );

  if (userIsAuth) {
    return <Redirect to={historyState?.from || "/"} />;
  }

  return (
    <AppForm title="Вход" onSubmit={handleSubmitOnSignInForm}>
      <FormInputWrapper>
        <Input
          name="email"
          value={email}
          type="text"
          placeholder="E-mail"
          errorText="Вы ввели неверный e-mail"
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </FormInputWrapper>
      <FormInputWrapper>
        <PasswordInput
          name="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </FormInputWrapper>
      <AppFormSubmit>Войти</AppFormSubmit>
      <FormCaption linkCaption=" Зарегистрироваться" link="/register">
        Вы - новый пользователь?
      </FormCaption>
      <div className="mt-4">
        <FormCaption linkCaption=" Восстановить пароль" link="/forgot-password">
          Забыли пароль?
        </FormCaption>
      </div>
    </AppForm>
  );
};

export default LoginPage;
