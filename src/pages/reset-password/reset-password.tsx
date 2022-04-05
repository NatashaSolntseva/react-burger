import React, { FC, useCallback, useState } from "react";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AppForm from "../../components/app-form/appForm";
import AppFormSubmit from "../../components/app-form-submit/appFormSubmit";
import FormInputWrapper from "../../components/form-input-wrapper/formInputWrapper";
import FormCaption from "../../components/form-caption/formCaption";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { setUserNewPassword } from "../../services/actions/userActions";
import { Redirect } from "react-router-dom";

const ResetPswPage: FC = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [tokenValue, setTokenValue] = useState("");

  const handleSaveNewPswSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(setUserNewPassword(password, tokenValue));
      //alert("save");
    },
    [dispatch, password, tokenValue]
  );

  return (
    <AppForm title="Восстановление пароля" onSubmit={handleSaveNewPswSubmit}>
      <FormInputWrapper>
        <PasswordInput
          name="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </FormInputWrapper>
      <FormInputWrapper>
        <Input
          name="code"
          value={tokenValue}
          onChange={(evt) => setTokenValue(evt.target.value)}
          type="text"
          placeholder="Введите код из письма"
          error={false}
          errorText="Ошибка"
        />
      </FormInputWrapper>
      <AppFormSubmit>Сохранить</AppFormSubmit>
      <FormCaption linkCaption=" Войти" link="/login">
        Вспомнили пароль?
      </FormCaption>
    </AppForm>
  );
};

export default ResetPswPage;
