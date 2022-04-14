import { FC, useEffect } from "react";
import FeedStatistic from "../../components/feed-statistic/feed-statistic";
import FeedsOrders from "../../components/feeds-orders/feeds-orders";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/feedActions";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import styles from "./feedStyles.module.css";

const FeedPage: FC = () => {
  /*const dispatch = useAppDispatch();
  const { ordersData, wsConnected } = useAppSelector((store) => store.feed);
  console.log(ordersData);
  console.log("wsConnected", wsConnected);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);*/

  return (
    <main className={styles.feed}>
      <h1 className={`text text_type_main-large ${styles.feed__title}`}>
        Лента заказов
      </h1>
      <section className={styles.feed__orderSection}>
        <FeedsOrders />
      </section>
      <section className={styles.feed__statisticSection}>
        <FeedStatistic />
      </section>
    </main>
  );
};

export default FeedPage;

//TODO сообщение об ошибке при незагрузке данных
