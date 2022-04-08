import styles from "./loader.module.css";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className={`${styles.loader__container} pt-30 pb-25`}>
      <div className={`${styles.loader}`}></div>
      <span className={`${styles.loader__span}`}>Загрузка...</span>
    </div>
  );
};

export default Loader;
