import { FC } from "react";

import styles from "./appFormStyles.module.css";
import { IAppForm } from "../../utils/types";

const AppForm: FC<IAppForm> = ({ children, title, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={`mb-6`}>
        <p className={`text text_type_main-medium ${styles.title}`}>{title}</p>
      </div>
      {children}
    </form>
  );
};

export default AppForm;
