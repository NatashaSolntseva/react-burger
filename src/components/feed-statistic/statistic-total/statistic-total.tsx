import styles from "./statisticTotal.module.css";
import { FC } from "react";

const StatisticTotal: FC<{ title: string; children: number | string }> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.statisticTotal__wrapper}>
      <p className={`text text_type_main-medium`}>{title}</p>
      <span
        className={`text text_type_digits-large ${styles.statisticTotlal__content}`}
      >
        {!children ? "-" : children}
      </span>
    </div>
  );
};

export default StatisticTotal;
