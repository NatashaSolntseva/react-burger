import styles from "./orderCard.module.css";

import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ILocation } from "../../../utils/types";
import getDateFormat from "../../../utils/date";

import IngredientIcon from "../../ingredient-icon/ingredientIcon";

const OrderCard: FC = () => {
  const location = useLocation<ILocation>();
  return (
    <li className={styles.orderCard__item}>
      <Link
        to={{
          pathname: "/profile/orders/:id",
          state: { background: location },
        }}
        className={styles.orderCard__link}
      >
        <p
          className={`text text_type_digits-default ${styles.orderCard__header}`}
        >
          #{"034540"}{" "}
          <time className={`text text_type_main-default text_color_inactive`}>
            {getDateFormat("2022-04-13T15:15:15.552Z")} i-GMT+3
          </time>
        </p>
        <h2 className={`text text_type_main-medium ${styles.orderCard__title}`}>
          {"Black Hole Singularity острый бургер"}
        </h2>
        <p
          className={`text text_type_main-default mt-2 ${styles.orderCard__subTitle}`}
        >
          Готовится
        </p>
        <div className={styles.orderCard__ingredientsList_wrapper}>
          <ul className={styles.orderCard__ingredientsList}>
            <IngredientIcon
              img="https://code.s3.yandex.net/react/code/sauce-03-mobile.png"
              hiddenIconsCount={4}
            />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/meat-03-mobile.png" />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/sauce-04-mobile.png" />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/sauce-01-mobile.png" />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/meat-04-mobile.png" />
            <IngredientIcon img="https://code.s3.yandex.net/react/code/sauce-03-mobile.png" />
          </ul>
          <p className={styles.orderCard__priceWrapper}>
            <span
              className={`text text_type_digits-default ${styles.orderCard__price}`}
            >
              {"510"}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
