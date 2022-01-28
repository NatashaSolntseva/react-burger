import {
  DROP_SELECTED_INGREDIENT,
  DELETE_INGREDIENT,
  CLEAR_ORDER_LIST,
  REORDER_CONSTRUCTOR_INGREDIENT,
} from "../actions/actions";

const defaultBurgerConstructorState = {
  droppedIngredients: [],
  droppedBun: null,
};

export const constructorReducer = (
  state = defaultBurgerConstructorState,
  action
) => {
  switch (action.type) {
    case DROP_SELECTED_INGREDIENT: {
      const { droppedIngredient } = action.payload;
      if (droppedIngredient.type === "bun") {
        return {
          ...state,
          droppedBun: droppedIngredient,
        };
      }
      return {
        ...state,
        droppedIngredients: [...state.droppedIngredients, droppedIngredient],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        droppedIngredients: state.droppedIngredients.filter(
          (item, index) => index !== action.payload.indexToDelete
        ),
      };
    }
    case CLEAR_ORDER_LIST: {
      return {
        ...state,
        droppedIngredients: [],
        droppedBun: null,
      };
    } //TODO они меняются местами, а по хорошему нужно развдивать элементы
    case REORDER_CONSTRUCTOR_INGREDIENT: {
      const { draggedElementIndex, targetElementIndex } = action.payload;
      //console.log("draggedElementIndex", draggedElementIndex);
      //console.log("targetElementIndex", targetElementIndex);
      const constructorIngredientsArr = [...state.droppedIngredients];
      const draggingElementIndex =
        constructorIngredientsArr[draggedElementIndex];
      constructorIngredientsArr[draggedElementIndex] =
        constructorIngredientsArr[targetElementIndex];
      constructorIngredientsArr[targetElementIndex] = draggingElementIndex;
      return {
        ...state,
        droppedIngredients: constructorIngredientsArr,
      };
    }
    default:
      return state;
  }
};
