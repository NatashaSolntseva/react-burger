import { FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appFormSubmitStyles.module.css";

import { IAppFormSubmit } from "../../utils/types";

const AppFormSubmit: FC<IAppFormSubmit> = ({ children }) => {
  return (
    <div className={`${styles.wrapper} mb-20`}>
      <Button>{children}</Button>
    </div>
  );
};

export default AppFormSubmit;
