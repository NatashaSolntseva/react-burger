import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import BurgerConstructorDnd from "../../burgerConstructorDnd";

import { DROP_SELECTED_INGREDIENT } from "../../../../services/actions/actions";

function BurgerConstructorDndWrapper({ openModal }) {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop({ burgerItem }) {
      dispatch({
        type: DROP_SELECTED_INGREDIENT,
        payload: {
          droppedIngredient: { ...burgerItem, uid: uuidv4() },
        },
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
