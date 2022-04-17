import React from "react";
import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderInfo.module.css";
import getDateFormat from "../../utils/date";
import IngredientInfo from "./components/ingredient-info";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";
import { findOrderById } from "../../services/actions/orderActions";
import Loader from "../loader/loader";
import { getOrderIngredientsDataByIds } from "../../services/actions/ingredientsActions";

//TODO компонент для модалки

const OrderInfo: FC = () => {
  const params = useParams<{ id: string }>();
  const { ordersData, wsError, wsConnected } = useAppSelector(
    (store) => store.feed
  );
  console.log("ordersData in OrderInfo", ordersData);
  //получили состав заказа, в т.ч. id ингредиентов
  const exactOrder = useAppSelector(findOrderById(params.id));
  //console.log("exctOrder", exactOrder);
  //console.log("exactOrder.ingredients", exactOrder.ingredients); //тут id лежат

  const { ingredients, totalPrice } = useAppSelector(
    getOrderIngredientsDataByIds(exactOrder.ingredients)
  );

  //console.log("ingredients", ingredients);
  //console.log("totalPrice", totalPrice);

  let status = "";
  switch (exactOrder.status) {
    case "created":
      status = "Создан";
      break;
    case "pending":
      status = "Готовится";
      break;
    case "done":
      status = "Выполнен";
      break;
  }

  //TODO не работает лоадер? пустой массив

  return wsError && !wsConnected && !ordersData ? (
    <Loader />
  ) : (
    <div className={styles.orderInfo__wrapper}>
      <p className={`text text_type_digits-default`}>#{exactOrder.number} </p>
      <h2 className={`text text_type_main-medium ${styles.orderInfo__title}`}>
        {exactOrder.name}
      </h2>
      <p className={`text text_type_main-default ${styles.orderInfo__status}`}>
        {status}
      </p>
      <p className={`text text_type_main-medium ${styles.orderInfo__consist}`}>
        Состав:
      </p>
      <ul className={`mt-6 ${styles.orderInfo__list}`}>
        {ingredients.map((item: any, index: number) => {
          return <IngredientInfo ingredient={item} key={index} />;
        })}
      </ul>
      <div className={styles.orderInfo__footer}>
        <time className="text text_type_main-default text_color_inactive">
          {getDateFormat(exactOrder.createdAt)} i-GMT+3
        </time>
        <div className={styles.orderInfo__price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderInfo);
