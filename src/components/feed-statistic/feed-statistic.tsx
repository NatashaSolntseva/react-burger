import styles from "./feedStatistic.module.css";
import { FC } from "react";
import StatisticTotal from "./statistic-total/statistic-total";
import LifeStatistic from "./statistic-life/statistic-life";
import { IFeedStatistic } from "../../utils/types";
import Loader from "../loader/loader";

const FeedStatistic: FC<IFeedStatistic> = ({
  total,
  totalToday,
  doneOrders,
  pendingOrders,
}) => {
  return !doneOrders && !pendingOrders ? (
    <Loader />
  ) : (
    <section className={styles.feedStatistic}>
      <div className={styles.feedStatsistic__listWrapper}>
        <LifeStatistic
          title="Готовы:"
          orders={doneOrders}
          hightlightSelection
        />
        <LifeStatistic title="В работе:" orders={pendingOrders} />
      </div>
      <StatisticTotal title="Выполнено за все время:">{total}</StatisticTotal>
      <StatisticTotal title="Выполнено за сегодня:">
        {totalToday}
      </StatisticTotal>
    </section>
  );
};

export default FeedStatistic;
