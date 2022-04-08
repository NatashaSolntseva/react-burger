import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./not-found-404.module.css";

const NotFound404Page: FC = () => {
  return (
    <main className={styles.notFound404__container}>
      <div className={styles.notFound404__wrapper}>
        <h1 className={`text text_type_digits-large`}>404</h1>
        <p className={`text text_type_main-medium`}>Страница не найдена</p>
        <NavLink
          to="/"
          className={`text text_type_main-medium ${styles.notFound404__link}`}
        >
          На главную
        </NavLink>
      </div>
    </main>
  );
};

export default NotFound404Page;
