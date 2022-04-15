import styles from "./orderCard.module.css";

import { FC } from "react";
import { IIngredient, ILocation, IOrderCard } from "../../../utils/types";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import getDateFormat from "../../../utils/date";
import IngredientIcon from "../../ingredient-icon/ingredientIcon";
import { useAppSelector } from "../../../services/hooks/hooks";

const OrderCard: FC<IOrderCard> = ({ orderData }) => {
  const location = useLocation<ILocation>();
  //console.log("orderData", orderData);
  const { ingredientsDataFromServer } = useAppSelector(
    (store) => store.ingredients
  );
  //console.log("inhredients", ingredientsDataFromServer);

  ///ищем те что в составе заказа
  const ingedientsInOrders: IIngredient[] = ingredientsDataFromServer.filter(
    (ingredient) => {
      return orderData.ingredients.indexOf(ingredient._id) > -1;
    }
  );
  //console.log("ingedientsInOrders", ingedientsInOrders);
  //TODO теряются булки?? одна не считается? id
  // считаем сумму заказа
  const totalPrice: number = ingedientsInOrders.reduce(
    (price: number, ingredient: IIngredient) => price + ingredient.price,
    0
  );

  return (
    <li className={styles.orderCard__item}>
      <Link
        to={{
          pathname: "/feed/:id",
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
