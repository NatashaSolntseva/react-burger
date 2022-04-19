import React, { useEffect } from "react";
import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderInfo.module.css";
import getDateFormat from "../../utils/date";
import IngredientInfo from "./components/ingredient-info";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  findExactOrderByNumber,
  getOrderByNumber,
} from "../../services/actions/orderActions";
import Loader from "../loader/loader";
//import { getOrderIngredientsDataByIds } from "../../services/actions/ingredientsActions";

import { IIngredient, TWsOrder } from "../../utils/types";

//TODO компонент для модалки

const OrderInfo: FC<{ protectedRoute?: boolean }> = ({ protectedRoute }) => {
  const dispatch = useAppDispatch();

  const params = useParams<{ number: string }>();

  const { ordersData } = useAppSelector((store) => store.feed);
  const { order } = useAppSelector((store) => store.order);

  const { ingredientsDataFromServer } = useAppSelector(
    (store) => store.ingredients
  );

  console.log("ordersData in OrderInfo", ordersData);
  console.log("params.number in OrderInfo", params.number);

  const exactOrder = useAppSelector(findExactOrderByNumber(+params.number)); // превращает в число как и Number
  console.log("exctOrder", exactOrder);
  console.log("exctOrder number", exactOrder?.number);

  useEffect(() => {
    if (exactOrder && !exactOrder.number) {
      //console.log(exactOrder.number);
      console.log("should call for order with params.id");
      //Следовательно там где console - надо задиспатчить экшен который у тебя найден заказ по тому number который лежит в параметрах текущего урла
      dispatch(getOrderByNumber(+params.number));
      console.log("FOUND ORDER BY NUMBER", order);
    }
  }, [dispatch, exactOrder, params.number]);

  const ingredients = exactOrder?.ingredients
    .filter((id) => typeof id === "string")
    .map((id) =>
      ingredientsDataFromServer.find((item: IIngredient) => item._id === id)
    );

  const totalPrice = ingredients?.reduce((sum, ingredient) => {
    if (ingredient) sum += ingredient.price;
    return sum;
  }, 0);

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

  //TODO не работает лоадер? пустой массив
  console.log("ingredients.length", ingredients);

  return !ordersData ? (
    <Loader />
  ) : (
    <div className={styles.orderInfo__wrapper}>
      <p className={`text text_type_digits-default`}>#{exactOrder?.number} </p>
      <h2 className={`text text_type_main-medium ${styles.orderInfo__title}`}>
        {exactOrder?.name}
      </h2>
      <p className={`text text_type_main-default ${styles.orderInfo__status}`}>
        {status}
      </p>
      <p className={`text text_type_main-medium ${styles.orderInfo__consist}`}>
        Состав:
      </p>
      <ul className={`mt-6 ${styles.orderInfo__list}`}>
        {ingredients?.map((item: any, index: number) => {
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

/*

для модалок не нужно обрывать связб

      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };

      
*/

/*
  useEffect(() => {
    if (!ordersData) {
      protectedRoute
        ? dispatch({ type: WS_CONNECTION_START })
        : dispatch({ type: WS_AUTH_CONNECTION_START });
    }
  }, [dispatch, ordersData, protectedRoute]);*/

// console.log("wsConnected", wsConnected);
//console.log("ordersData in OrderInfo", ordersData);
//получили состав заказа, в т.ч. id ингредиентов
//const exactOrder = useAppSelector(findOrderById(params.id));

//console.log("exactOrder.ingredients", exactOrder.ingredients); //тут id лежат

/*const { ingredients, totalPrice } = useAppSelector(
    getOrderIngredientsDataByIds(exactOrder.ingredients)
  );
*/

//console.log("ingredients", ingredients);
//console.log("totalPrice", totalPrice);

//console.log("protectedRoute", protectedRoute);

/*const exactOrder = ordersData?.orders.find(
    (order: TWsOrder) => order.number === Number(params.number)
  );*/
