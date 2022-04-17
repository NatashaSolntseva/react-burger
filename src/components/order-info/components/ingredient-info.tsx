import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { TOrdersIngredient } from "../../../utils/types";
import IngredientIcon from "../../ingredient-icon/ingredientIcon";
import Loader from "../../loader/loader";
import styles from "./ingredientInfo.module.css";

const IngredientInfo: FC<{ ingredient: TOrdersIngredient }> = ({
  ingredient,
}) => {
  //console.log("ingredient in ingredientInfo", ingredient);
  return !ingredient ? (
    <Loader />
  ) : (
    <li className={styles.ingredientInfo__wrapper}>
      <IngredientIcon img={ingredient.image_mobile} />
      <p
        className={`text text_type_main-default ml-4 mr-4 ${styles.ingredientInfo__title}`}
      >
        {ingredient.name}
      </p>
      <p className={styles.ingredientInfo__price}>
        <span className="text text_type_digits-default mr-2">
          {1} x {ingredient.price}
        </span>{" "}
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
};

export default IngredientInfo;
