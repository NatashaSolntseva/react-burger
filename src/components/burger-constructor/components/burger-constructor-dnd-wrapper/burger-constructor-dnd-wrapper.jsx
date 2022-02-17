import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import BurgerConstructorDnd from "../../burgerConstructorDnd";

import { DROP_SELECTED_INGREDIENT } from "../../../../services/actions/constructorActions";

function BurgerConstructorDndWrapper({ openModal }) {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ ingredient }) {
      dispatch({
        type: DROP_SELECTED_INGREDIENT,
        droppedIngredient: { ...ingredient, uid: uuidv4() },
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <BurgerConstructorDnd
      openModal={openModal}
      isHover={isHover}
      ref={dropTarget}
    />
  );
}

export default BurgerConstructorDndWrapper;

const BurgerConstructorDndWrapperPropTypes = PropTypes.shape({
  openModal: PropTypes.func.isRequired,
});

BurgerConstructorDndWrapper.propTypes =
  BurgerConstructorDndWrapperPropTypes.isRequired;
