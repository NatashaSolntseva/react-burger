import { FC, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import AppForm from "../../components/app-form/appForm";
import AppFormSubmit from "../../components/app-form-submit/appFormSubmit";
import FormInputWrapper from "../../components/form-input-wrapper/formInputWrapper";
import FormCaption from "../../components/form-caption/formCaption";

const ForgotPswPage: FC = () => {
  const [email, setEmail] = useState("");
  return (
    <AppForm title="Восстановление пароля">
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
  );
};

export default ForgotPswPage;
