import { FC } from "react";
import { useDrag } from "react-dnd";

import IngredientElement from "../ingredient-element/ingredientElement";

import { IBurgerIngredientElement } from "../../../../utils/types";

const IngredientElementDndWrapper: FC<IBurgerIngredientElement> = ({
  ingredient,
  openModal,
  count,
}) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <IngredientElement
      ingredient={ingredient}
      openModal={openModal}
      isDragging={isDrag}
      ref={dragRef}
      count={count}
    />
  );
};

export default IngredientElementDndWrapper;
