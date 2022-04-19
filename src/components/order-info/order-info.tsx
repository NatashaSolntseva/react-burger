import React, { useEffect } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";

import styles from "./orderInfo.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../loader/loader";
import IngredientInfo from "./components/ingredient-info";

import getDateFormat from "../../utils/date";

import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { findExactOrderByNumber } from "../../services/actions/orderActions";
import { getOrderByNumber } from "../../services/actions/feedActions";
import { getOrderIngredientsDataByIds } from "../../services/actions/ingredientsActions";

//TODO компонент для модалки

const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();

  const params = useParams<{ number: string }>();

  const { ordersData } = useAppSelector((store) => store.feed);

  const exactOrder = useAppSelector(findExactOrderByNumber(+params.number)); // превращает в число как и Number

  useEffect(() => {
    if (exactOrder && !exactOrder.number) {
      dispatch(getOrderByNumber(+params.number));
    }
  }, [dispatch, exactOrder, params.number]);

  const { ingredients, totalPrice } = useAppSelector(
    getOrderIngredientsDataByIds(exactOrder.ingredients)
  );

  let status = "";
  switch (exactOrder?.status) {
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

  return !ordersData && !exactOrder ? (
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
          {getDateFormat(exactOrder?.createdAt)} i-GMT+3
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
