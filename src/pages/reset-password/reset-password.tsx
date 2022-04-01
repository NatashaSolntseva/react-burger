import { FC, useState } from "react";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AppForm from "../../components/app-form/appForm";
import AppFormSubmit from "../../components/app-form-submit/appFormSubmit";
import FormInputWrapper from "../../components/form-input-wrapper/formInputWrapper";
import FormCaption from "../../components/form-caption/formCaption";

const ResetPswPage: FC = () => {
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");

  return (
    <AppForm title="Восстановление пароля">
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
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
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
