import styles from "./ingredientIcon.module.css";

import { FC } from "react";
import { IIngredientIcon } from "../../utils/types";

const IngredientIcon: FC<IIngredientIcon> = ({ img, hiddenIconsCount }) => {
  return (
    <div className={`${styles.ingerdientIcon__wrapper}`}>
      <img
        className={styles.ingredientIcon__image}
        src={img}
        alt="Изображение инредиента"
      />
      {hiddenIconsCount && (
        <div
          className={`text text_type_main-default ${styles.ingredientIcon__hidden}`}
        >{`+${hiddenIconsCount}`}</div>
      )}
    </div>
  );
};

export default IngredientIcon;
