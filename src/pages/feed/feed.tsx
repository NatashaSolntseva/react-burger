import { FC, useEffect } from "react";
import FeedStatistic from "../../components/feed-statistic/feed-statistic";
import Loader from "../../components/loader/loader";
import OrdersLists from "../../components/orders-lists/orders-lists";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/feedActions";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import styles from "./feedStyles.module.css";

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const { ordersData, wsConnected } = useAppSelector((store) => store.feed);

  //console.log("wsConnected", wsConnected);
  //console.log("ordersData", ordersData);

  //номера готовых заказов
  const doneOrders: number[] | null =
    ordersData &&
    ordersData.orders
      .filter((order) => order.status === "done")
      .map((order) => order.number);

  //console.log("doneOrders", doneOrders);

  //номера заказов в работе
  const pendingOrders: number[] | null =
    ordersData &&
    ordersData.orders
      .filter((order) => order.status === "pending")
      .map((order) => order.number);

  //console.log("pendingOrders", pendingOrders);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <>
      {wsConnected && ordersData ? (
        <main className={styles.feed}>
          <h1 className={`text text_type_main-large ${styles.feed__title}`}>
            Лента заказов
          </h1>
          {ordersData.orders.length === 50 ? (
            <section className={styles.feed__orderSection}>
              <OrdersLists ordersData={ordersData.orders} />
            </section>
          ) : (
            <Loader />
          )}
          <section className={styles.feed__statisticSection}>
            <FeedStatistic
              total={ordersData.total}
              totalToday={ordersData.totalToday}
              doneOrders={doneOrders}
              pendingOrders={pendingOrders}
            />
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FeedPage;
