import { FC, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { reorderConstructorIngredient } from "../../../../services/actions/constructorActions";
import BurgerConstructorElement from "../burger-constructor-element/burgerConstructorElement";

import { IBurgerConstructorElement } from "../../../../utils/types";

const BurgerConstructorElementDndWrapper: FC<IBurgerConstructorElement> = ({
  ingredient,
  index,
  handleDeleteIngredient,
}) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [, dragRef] = useDrag({
    type: "burger-constructor-element",
    item: { draggedElementIndex: index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropTarget] = useDrop({
    accept: "burger-constructor-element",
    drop(item: { draggedElementIndex: number }) {
      dispatch(reorderConstructorIngredient(item.draggedElementIndex, index));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  useEffect(
    function () {
      dragRef(dropTarget(ref));
    },
    [dragRef, dropTarget]
  );

  return (
    <BurgerConstructorElement
      ingredient={ingredient}
      ref={ref}
      index={index}
      handleDeleteIngredient={handleDeleteIngredient}
    />
  );
};

export default BurgerConstructorElementDndWrapper;
