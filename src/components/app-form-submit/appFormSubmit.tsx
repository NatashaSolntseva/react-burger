import { FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appFormSubmitStyles.module.css";

const AppFormSubmit: FC = () => {
  return (
    <div className={`${styles.wrapper} mb-20`}>
      <Button>Войти</Button>
    </div>
  );
};

export default AppFormSubmit;
