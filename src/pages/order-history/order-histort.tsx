import styles from "./orderHistory.module.css";

import { FC } from "react";
import ProfileNav from "../../components/profile-nav/pforile-nav";
import OrdersList from "../../components/orders-list/orders-list";

const OrderHistoryPage: FC = () => {
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
