import styles from "./orderCard.module.css";

import { FC } from "react";
import { useAppSelector } from "../../../services/hooks/hooks";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient, ILocation, IOrderCard } from "../../../utils/types";
import getDateFormat from "../../../utils/date";

import IngredientIcon from "../../ingredient-icon/ingredientIcon";
//TODO карточка ингредиента в защищенном роутинге
const OrderCard: FC<IOrderCard> = ({ orderData }) => {
  const location = useLocation<ILocation>();
  const { ingredientsDataFromServer } = useAppSelector(
    (store) => store.ingredients
  );
  const ingedientsInOrders: IIngredient[] = ingredientsDataFromServer.filter(
    (ingredient) => {
      return orderData.ingredients.indexOf(ingredient._id) > -1;
    }
  );
  const totalPrice: number = ingedientsInOrders.reduce(
    (price: number, ingredient: IIngredient) => price + ingredient.price,
    0
  );

  let status = "";
  switch (orderData.status) {
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
          #{orderData.number}{" "}
          <time className={`text text_type_main-default text_color_inactive`}>
            {getDateFormat(orderData.createdAt)} i-GMT+3
          </time>
        </p>
        <h2 className={`text text_type_main-medium ${styles.orderCard__title}`}>
          {orderData.name}
        </h2>
        <p
          className={`text text_type_main-default mt-2 ${
            orderData.status === "done" && styles.orderCard__subTitle
          }`}
        >
          {status}
        </p>
        <div className={styles.orderCard__ingredientsList_wrapper}>
          <ul className={styles.orderCard__ingredientsList}>
            {ingedientsInOrders.length > 5 && (
              <IngredientIcon
                img={
                  ingedientsInOrders[ingedientsInOrders.length - 6].image_mobile
                }
                hiddenIconsCount={ingedientsInOrders.length - 5}
              />
            )}
            {ingedientsInOrders.slice(-5).map((ingredient, i) => {
              return <IngredientIcon img={ingredient.image_mobile} key={i} />;
            })}
          </ul>
          <p className={styles.orderCard__priceWrapper}>
            <span
              className={`text text_type_digits-default ${styles.orderCard__price}`}
            >
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
