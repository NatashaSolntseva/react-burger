import styles from "./orderHistory.module.css";

import { FC, useEffect } from "react";
import ProfileNav from "../../components/profile-nav/pforile-nav";
import OrdersList from "../../components/orders-list/orders-list";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  WS_AUTH_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/feedActions";
import Loader from "../../components/loader/loader";

const OrderHistoryPage: FC = () => {
  const dispatch = useAppDispatch();
  const { ordersData, wsConnected } = useAppSelector((store) => store.feed);
  // console.log("wsAuthConnected", wsConnected);
  //console.log("ordersData in ordersHistoryPage", ordersData);

  useEffect(() => {
    dispatch({ type: WS_AUTH_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <main className={styles.orderHistoryPage__wrapper}>
      <ProfileNav />
      {wsConnected && ordersData ? (
        <section className={styles.orderHistoryPage__content}>
          <OrdersList ordersData={ordersData.orders} />
        </section>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default OrderHistoryPage;
