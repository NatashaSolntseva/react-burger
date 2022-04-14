import styles from "./feedStatistic.module.css";
import { FC } from "react";
import StatisticTotal from "./statistic-total/statistic-total";
import LifeStatistic from "./statistic-life/statistic-life";

const FeedStatistic: FC = () => {
  return (
    <section className={styles.feedStatistic}>
      <div className={styles.feedStatsistic__listWrapper}>
        <LifeStatistic title="Готовы:" hightlightSelection />
        <LifeStatistic title="В работе:" />
      </div>
      <StatisticTotal title="Выполнено за все время:">28752</StatisticTotal>
      <StatisticTotal title="Выполнено за сегодня:">138</StatisticTotal>
    </section>
  );
};

export default FeedStatistic;
