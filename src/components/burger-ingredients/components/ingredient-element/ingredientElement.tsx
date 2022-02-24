import { forwardRef } from "react";

import styles from "./ingredientElementStyles.module.css";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";

import { IBurgerIngredientElement } from "../../../../utils/types";

const IngredientElement = forwardRef<
  HTMLDivElement,
  IBurgerIngredientElement & { isDragging: boolean }
>(({ ingredient, openModal, isDragging, count }, ref) => {
  const handleOpenModal = () => {
    openModal({ modalType: "ingredientDetail", itemId: ingredient._id });
  };

  return (
    <div
      className={
        isDragging
          ? `${styles.ingredient_element} ${styles.dragging_element}`
          : `${styles.ingredient_element}`
      }
    >
      <div
        className={styles.ingredient_content}
        onClick={handleOpenModal}
        ref={ref}
      >
        <img
          alt="Изображение игредиента бургера"
          src={ingredient.image}
          className={styles.element_img}
        />
        <p className={styles.price}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </div>
      {count !== 0 && <Counter size="default" count={count} />}
    </div>
  );
});

export default IngredientElement;
