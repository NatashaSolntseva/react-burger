import styles from "./ordersLists.module.css";

import { FC } from "react";
import Loader from "../loader/loader";

import { IOrdersList } from "../../utils/types";
import OrderCard from "./components/order-card";

const OrdersLists: FC<IOrdersList> = ({ ordersData, path, isOrderStatus }) => {
  //console.log("ordersData in OrderList", ordersData);
  return !ordersData ? (
    <Loader />
  ) : (
    <ul className={styles.ordersList__list}>
      {ordersData?.map((order) => {
        //console.log("order in MAP", order);
        return (
          <OrderCard
            path={path}
            orderData={order}
            isOrderStatus={isOrderStatus}
            key={order._id}
          />
        );
      })}
    </ul>
  );
};

export default OrdersLists;
