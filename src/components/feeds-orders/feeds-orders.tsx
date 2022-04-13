import styles from "./feedsOrders.module.css";

import { FC } from "react";

import { IFeedsOrders } from "../../utils/types";
import OrderCard from "./order-card/order-card";

const FeedsOrders: FC<IFeedsOrders> = () => {
  return (
    <ul className={styles.orders__list}>
      <OrderCard />
    </ul>
  );
};

export default FeedsOrders;
