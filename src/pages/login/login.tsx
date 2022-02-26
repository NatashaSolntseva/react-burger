import { FC } from "react";
import styles from "./loginStyle.module.css";
import { useState } from "react";

import AppForm from "../../components/app-form/appForm";
import AppFormSubmit from "../../components/app-form-submit/appFormSubmit";
import FormInputWrapper from "../../components/form-input-wrapper/formInputWrapper";
import FormCaption from "../../components/form-caption/formCaption";

import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <AppForm>
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
      <AppFormSubmit />
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
