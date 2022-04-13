import styles from "./orderCard.module.css";

import { FC } from "react";
import { IFeedsOrders, ILocation } from "../../../utils/types";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderCard: FC<IFeedsOrders> = () => {
  const location = useLocation<ILocation>();
  return (
    <li className={styles.orderCard__content}>
      <Link
        to={{
          pathname: "/",
          state: { background: location },
        }}
        className={styles.orderCard__link}
      >
        <p>
          <time></time>
        </p>
        <h2>Контент</h2>
        <div>
          <ul className={styles.orderCard__ingredientsList}></ul>
          <p>
            <span></span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
