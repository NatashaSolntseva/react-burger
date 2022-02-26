import { FC } from "react";

import styles from "./appFormStyles.module.css";

const AppForm: FC = ({ children }) => {
  return (
    <form className={styles.form}>
      <div className={`mb-6`}>
        <p className={`text text_type_main-medium ${styles.title}`}>Вход</p>
      </div>
      {children}
    </form>
  );
};

export default AppForm;
