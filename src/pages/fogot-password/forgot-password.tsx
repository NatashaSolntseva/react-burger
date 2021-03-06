import React, { FC, useCallback, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import AppForm from "../../components/app-form/appForm";
import AppFormSubmit from "../../components/app-form-submit/appFormSubmit";
import FormInputWrapper from "../../components/form-input-wrapper/formInputWrapper";
import FormCaption from "../../components/form-caption/formCaption";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { getRemindUserPassword } from "../../services/actions/userActions";

import { getCookie } from "../../utils/cookies";

const ForgotPswPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { historyState }: any = history.location;
  const [email, setEmail] = useState("");
  const { userIsAuth, resetPswResult } = useAppSelector((store) => store.user);

  const handleResetPswSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      //alert("восстановить");
      evt.preventDefault();
      const accessToken = getCookie("accessToken");
      console.log("accessToken", accessToken);
      dispatch(getRemindUserPassword(email, accessToken));
    },
    [dispatch, email]
  );

  if (userIsAuth) {
    return <Redirect to={historyState?.from || "/"} />;
  }

  return (
    <>
      {resetPswResult && <Redirect to="/reset-password" />}
      <AppForm title="Восстановление пароля" onSubmit={handleResetPswSubmit}>
        <FormInputWrapper>
          <Input
            name="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            type="text"
            placeholder="Укажите e-mail"
            error={false}
            errorText="Ошибка"
          />
        </FormInputWrapper>
        <AppFormSubmit>Восстановить</AppFormSubmit>
        <FormCaption linkCaption=" Войти" link="/login">
          Вспомнили пароль?
        </FormCaption>
      </AppForm>
    </>
  );
};

export default ForgotPswPage;
