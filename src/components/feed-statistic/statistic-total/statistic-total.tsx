//import styles from "./statisticTotal.module.css";
import { FC } from "react";

const StatisticTotal: FC<{ title: string; children: number | string }> = ({
  title,
  children,
}) => {
  return (
    <div>
      <p className={`text text_type_main-medium`}>{title}</p>
      <span className={`text text_type_digits-large`}>{children}</span>
    </div>
  );
};

export default StatisticTotal;
