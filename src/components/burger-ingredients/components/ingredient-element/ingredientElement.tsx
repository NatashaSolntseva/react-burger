import { forwardRef } from "react";

import styles from "./ingredientElementStyles.module.css";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";

import { IBurgerIngredientElement } from "../../../../utils/types";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ILocation } from "../../../../utils/types";

const IngredientElement = forwardRef<
  HTMLDivElement,
  IBurgerIngredientElement & { isDragging: boolean }
>(({ ingredient, openModal, isDragging, count }, ref) => {
  const handleOpenModal = () => {
    openModal({ modalType: "ingredientDetail", itemId: ingredient._id });
  };

  const location = useLocation<ILocation>();

  return (
    <div ref={ref}>
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
        className={
          isDragging
            ? `${styles.ingredient} ${styles.ingredient_dragging}`
            : `${styles.ingredient}`
        }
        onClick={handleOpenModal}
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
        {count !== 0 && <Counter size="default" count={count} />}
      </Link>
    </div>
  );
});

export default IngredientElement;
