import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import IngredientElement from "../ingredient-element/ingredientElement";

const IngredientElementDndWrapper = ({ openModal, burgerItem, count }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { burgerItem },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <IngredientElement
      key={burgerItem._id}
      id={burgerItem._id}
      image={burgerItem.image}
      name={burgerItem.name}
      price={burgerItem.price}
      openModal={openModal}
      isDragging={isDrag}
      ref={dragRef}
      count={count}
    />
  );
};

export default IngredientElementDndWrapper;

const IngredientElementDndWrapperPropTypes = PropTypes.shape({
  openModal: PropTypes.func.isRequired,
});
IngredientElementDndWrapper.propTypes =
  IngredientElementDndWrapperPropTypes.isRequired;
