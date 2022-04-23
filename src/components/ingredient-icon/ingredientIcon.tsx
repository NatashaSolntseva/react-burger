import styles from "./ingredientIcon.module.css";

import { FC } from "react";
import { IIngredientIcon } from "../../utils/types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientIcon: FC<IIngredientIcon> = ({
  img,
  hiddenIconsCount,
  counter,
}) => {
  return (
    <div className={`${styles.ingerdientIcon__wrapper}`}>
      <img
        className={styles.ingredientIcon__image}
        src={img}
        alt="Изображение инредиента"
      />
      {counter && !hiddenIconsCount && counter > 1 && (
        <Counter count={counter} size="small" />
      )}

      {hiddenIconsCount && (
        <div
          className={`text text_type_main-default ${styles.ingredientIcon__hidden}`}
        >{`+${hiddenIconsCount}`}</div>
      )}
    </div>
  );
};

export default IngredientIcon;
