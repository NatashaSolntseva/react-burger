//import styles from ".statisticLife.module.css";

import { FC } from "react";
import { IStatisticStatusList } from "../../../utils/types";

const LifeStatistic: FC<IStatisticStatusList> = ({ title }) => {
  return (
    <div>
      <p className={`text text_type_main-medium`}>{title}</p>
      <ul>
        <li className={"text text_type_digits-default"}>1234567</li>
        <li className={"text text_type_digits-default"}>123454324</li>
      </ul>
    </div>
  );
};

export default LifeStatistic;
