import React from "react";
import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderInfo.module.css";
import getDateFormat from "../../utils/date";
import IngredientInfo from "./components/ingredient-info";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";
import { findOrderById } from "../../services/actions/orderActions";
import { IIngredient } from "../../utils/types";

//TODO компонент для модалки

const OrderInfo: FC = () => {
  const params = useParams<{ id: string }>();
  const { ordersData } = useAppSelector((store) => store.feed);
  console.log("ordersData", ordersData);
  //получили состав заказа, в т.ч. id ингредиентов
  const exactOrder = useAppSelector(findOrderById(params.id));
  //console.log("exctOrder", exactOrder);

  const { ingredientsDataFromServer } = useAppSelector(
    (store) => store.ingredients
  );
  /*
  const ingedientsInOrder: IIngredient[] = ingredientsDataFromServer.filter(
    (ingredient) => {
      return ordersData?.orders. ingredients
    }
  );
  
  const totalPrice: number = ingedientsInOrder.reduce(
    (price: number, ingredient: IIngredient) => price + ingredient.price,
    0
  );*/

  return (
    <div className={styles.orderInfo__wrapper}>
      <p className="text text_type_digits-default">#{exactOrder.number} </p>
      <h2 className={`text text_type_main-medium ${styles.orderInfo__title}`}>
        {exactOrder.name}
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
          {getDateFormat(exactOrder.createdAt)} i-GMT+3
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
