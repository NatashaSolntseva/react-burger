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

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  //номера готовых заказов
  const doneOrders =
    ordersData &&
    ordersData.orders
      .filter((order) => order.status === "done")
      .map((order) => order.number);

  //номера заказов в работе
  const pendingOrders =
    ordersData &&
    ordersData.orders
      .filter((order) => order.status === "pending")
      .map((order) => order.number);

  return (
    <>
      {wsConnected && ordersData && doneOrders && pendingOrders ? (
        <main className={styles.feed}>
          <h1 className={`text text_type_main-large ${styles.feed__title}`}>
            Лента заказов
          </h1>
          {ordersData.orders.length === 50 ? (
            <section className={styles.feed__orderSection}>
              <OrdersLists path="/feed/" ordersData={ordersData.orders} />
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
