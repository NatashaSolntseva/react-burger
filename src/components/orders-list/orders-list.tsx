import styles from "./ordersList.module.css";

import { FC } from "react";
import Loader from "../loader/loader";
import OrderCard from "./order-card/order-card";

const OrdersList: FC = () => {
  return (
    <ul className={styles.ordersList__list}>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </ul>
  );
};

export default OrdersList;
