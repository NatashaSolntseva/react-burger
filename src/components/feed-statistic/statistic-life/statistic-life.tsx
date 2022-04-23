import styles from "./statisticLife.module.css";

import { FC } from "react";
import { IStatisticStatusList } from "../../../utils/types";
import Loader from "../../loader/loader";

const LifeStatistic: FC<IStatisticStatusList> = ({
  title,
  hightlightSelection,
  orders,
}) => {
  const style = hightlightSelection ? { color: "#00cccc" } : {};
  return !orders ? (
    <Loader />
  ) : (
    <div className={styles.lifeStatistic__wrapper}>
      <h2
        className={`text text_type_main-medium ${styles.lifeStatistic__title}`}
      >
        {title}
      </h2>
      <ul className={`${styles.lifeStatistic__list}`}>
        {orders?.slice(0, 10).map((order) => {
          return (
            <li
              className={"text text_type_digits-default"}
              style={style}
              key={order}
            >
              {order}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LifeStatistic;
