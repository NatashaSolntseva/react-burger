import { FC } from "react";

import styles from "./not-found-404.module.css";

const NotFound404Page: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={`text text_type_main-large`}>Ой!</h1>
      <p className={`text text_type_main-medium`}>Страница не найдена</p>
      <p className={`text text_type_main-medium`}>Код ошибки: 404</p>
    </div>
  );
};

export default NotFound404Page;
