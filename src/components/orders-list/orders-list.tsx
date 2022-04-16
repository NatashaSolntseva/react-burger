import styles from "./ordersList.module.css";

import { FC } from "react";
import Loader from "../loader/loader";
import OrderCard from "./order-card/order-card";
import { IOrdersList } from "../../utils/types";

const OrdersList: FC<IOrdersList> = ({ ordersData }) => {
  //console.log("ordersData in OrderList", ordersData);
  return !ordersData ? (
    <Loader />
  ) : (
    <ul className={styles.ordersList__list}>
      {ordersData?.map((order) => {
        //console.log("order in MAP", order);
        return <OrderCard orderData={order} />;
      })}
    </ul>
  );
};

export default OrdersList;
