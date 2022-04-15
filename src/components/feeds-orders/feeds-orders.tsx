import styles from "./feedsOrders.module.css";

import { FC } from "react";

import { IFeedsOrders } from "../../utils/types";
import OrderCard from "./order-card/order-card";
import Loader from "../loader/loader";

const FeedsOrders: FC<IFeedsOrders> = ({ orders }) => {
  return !orders ? (
    <Loader />
  ) : (
    <ul className={styles.orders__list}>
      {orders.map((order: any) => (
        <OrderCard orderData={order} />
      ))}
    </ul>
  );
};

export default FeedsOrders;
