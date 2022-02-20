import { forwardRef, useCallback } from "react";

import styles from "./burgerConstructorElementStyles.module.css";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IBurgerConstructorElement } from "../../../../utils/types";

const BurgerConstructorElement = forwardRef<
  HTMLLIElement,
  IBurgerConstructorElement
>(({ ingredient, index, handleDeleteIngredient }, ref) => {
  const handleDelete = useCallback(
    () => handleDeleteIngredient(index),
    [handleDeleteIngredient, index]
  );

  return (
    <li ref={ref} className={styles.container_wrapper}>
      <div className="mr-1">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleDelete}
      />
    </li>
  );
});

export default BurgerConstructorElement;
