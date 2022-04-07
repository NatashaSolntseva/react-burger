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

import { registerNewUser } from "../../services/actions/userActions";

import { Redirect } from "react-router-dom";

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const { userIsAuth } = useAppSelector((store) => store.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const accessToken = getCookie("token");

  const handleSubmitOnRegistrationForm = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(registerNewUser(email, password, name));
    },
    [dispatch, email, password, name]
  );

  if (userIsAuth) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <AppForm title="Регистрация" onSubmit={handleSubmitOnRegistrationForm}>
      <FormInputWrapper>
        <Input
          name="name"
          value={name}
          type="text"
          placeholder="Имя"
          errorText="Ошибка"
          onChange={(evt) => setName(evt.target.value)}
        />
      </FormInputWrapper>
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
      <AppFormSubmit>Зарегистрироваться</AppFormSubmit>
      <FormCaption linkCaption=" Войти" link="/login">
        Уже зарегистрированы?
      </FormCaption>
    </AppForm>
  );
};

export default RegisterPage;
