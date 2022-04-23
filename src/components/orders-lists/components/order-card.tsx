import styles from "./orderCard.module.css";

import { FC } from "react";
import { useAppSelector } from "../../../services/hooks/hooks";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ILocation, IOrderCard } from "../../../utils/types";
import getDateFormat from "../../../utils/date";

import IngredientIcon from "../../ingredient-icon/ingredientIcon";
import { getOrderIngredientsDataByIds } from "../../../services/actions/ingredientsActions";

const OrderCard: FC<IOrderCard> = ({ orderData, path, isOrderStatus }) => {
  const location = useLocation<ILocation>();
  const { ingredients, totalPrice } = useAppSelector(
    getOrderIngredientsDataByIds(orderData.ingredients)
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
          pathname: `${path}${orderData.number}`,
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
        {isOrderStatus && (
          <p
            className={`text text_type_main-default mt-2 ${
              orderData.status === "done" && styles.orderCard__subTitle
            }`}
          >
            {status}
          </p>
        )}

        <div className={styles.orderCard__ingredientsList_wrapper}>
          <ul className={styles.orderCard__ingredientsList}>
            {ingredients.length > 5 && (
              <IngredientIcon
                img={ingredients[ingredients.length - 6]?.image_mobile}
                hiddenIconsCount={ingredients.length - 5}
              />
            )}
            {ingredients.slice(-5).map((ingredient, i) => {
              return (
                <IngredientIcon
                  img={ingredient?.image_mobile}
                  key={i}
                  counter={ingredient?.quantity}
                />
              );
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
