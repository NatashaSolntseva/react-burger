import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { REORDER_CONSTRUCTOR_INGREDIENT } from "../../../../services/actions/constructorActions";
import { reorderConstructorIngredient } from "../../../../services/actions/constructorActions";
import BurgerConstructorElement from "../burger-constructor-element/burgerConstructorElement";

function BurgerConstructorElementDndWrapper({
  ingredient,
  index,
  handleDeleteIngredient,
}) {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: "burger-constructor-element",
    item: { draggedElementIndex: index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ isHover }, dropTarget] = useDrop({
    accept: "burger-constructor-element",
    drop({ draggedElementIndex }) {
      dispatch({
        type: REORDER_CONSTRUCTOR_INGREDIENT,
        payload: {
          draggedElementIndex: draggedElementIndex,
          targetElementIndex: index,
        },
      });
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
      isHover={isHover}
      isDrag={isDrag}
      handleDeleteIngredient={handleDeleteIngredient}
    />
  );
}

export default BurgerConstructorElementDndWrapper;

const BurgerConstructorElementDndWrapperPropTypes = PropTypes.shape({
  handleDeleteIngredient: PropTypes.func.isRequired,
});

BurgerConstructorElementDndWrapper.propTypes =
  BurgerConstructorElementDndWrapperPropTypes.isRequired;
