import styles from "./orderHistory.module.css";

import { FC, useEffect } from "react";
import ProfileNav from "../../components/profile-nav/pforile-nav";
import OrdersList from "../../components/orders-list/orders-list";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  WS_AUTH_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/feedActions";

const OrderHistoryPage: FC = () => {
  const dispatch = useAppDispatch();
  const { ordersData, wsConnected } = useAppSelector((store) => store.feed);
  console.log("wsConnected", wsConnected);
  console.log("ordersData", ordersData);

  useEffect(() => {
    dispatch({ type: WS_AUTH_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <main className={styles.orderHistoryPage__wrapper}>
      <ProfileNav />
      <section className={styles.orderHistoryPage__content}>
        <OrdersList />
      </section>
    </main>
  );
};

export default OrderHistoryPage;
