import React from "react";
import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderInfo.module.css";
import getDateFormat from "../../utils/date";
import IngredientInfo from "./components/ingredient-info";

const OrderInfo: FC = () => {
  return (
    <div className={styles.orderInfo__wrapper}>
      <p className="text text_type_digits-default">#{"034540"} </p>
      <h2 className={`text text_type_main-medium ${styles.orderInfo__title}`}>
        {"Black Hole Singularity острый бургер"}
      </h2>
      <p className={`text text_type_main-default ${styles.orderInfo__status}`}>
        Готовится
      </p>
      <p className={`text text_type_main-medium ${styles.orderInfo__consist}`}>
        Состав:
      </p>
      <ul className={`mt-6 ${styles.orderInfo__list}`}>
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
      </ul>
      <div className={styles.orderInfo__footer}>
        <time className="text text_type_main-default text_color_inactive">
          {getDateFormat("2022-04-13T15:15:15.552Z")} i-GMT+3
        </time>
        <div className={styles.orderInfo__price}>
          <span className="text text_type_digits-default">510</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
