import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import IngredientIcon from "../../ingredient-icon/ingredientIcon";
import styles from "./ingredientInfo.module.css";

const IngredientInfo: FC = () => {
  return (
    <li className={styles.ingredientInfo__wrapper}>
      <IngredientIcon img="https://code.s3.yandex.net/react/code/meat-03-mobile.png" />
      <p
        className={`text text_type_main-default ml-4 mr-4 ${styles.ingredientInfo__title}`}
      >
        Флюоресцентная булка R2-D3
      </p>
      <p className={styles.ingredientInfo__price}>
        <span className="text text_type_digits-default mr-2">
          {2} x {4}
        </span>{" "}
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
};

export default IngredientInfo;
