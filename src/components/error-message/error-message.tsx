import styles from "./errorMessage.module.css";
import { FC } from "react";

const ErrorMessage: FC = ({ children }) => {
  return (
    <div className={styles.errorMessage__container}>
      <h1 className={`text text_type_main-large ${styles.errorMessage__title}`}>
        Произошла ошибка
      </h1>
      <p className={`text text_type_main-medium ${styles.errorMessage__text}`}>
        {children}
      </p>
    </div>
  );
};

export default ErrorMessage;
