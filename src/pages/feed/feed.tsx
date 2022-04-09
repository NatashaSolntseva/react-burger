import { FC } from "react";
import FeedStatistic from "../../components/feed-statistic/feed-statistic";
import FeedsOrders from "../../components/feeds-orders/feeds-orders";
import styles from "./feedStyles.module.css";

const FeedPage: FC = () => {
  return (
    <main className={styles.feed}>
      <h1 className={`text text_type_main-large ${styles.feed__title}`}>
        Лента заказов в разработке
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
