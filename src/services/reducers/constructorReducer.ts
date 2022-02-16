import {
  CLEAR_ORDER_LIST,
  DROP_SELECTED_INGREDIENT,
  DELETE_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructorActions";

import { TConstructorActions } from "../actions/constructorActions";

type TdefaultBurgerConstructorState = {
  droppedIngredients: [];
  droppedBun: any;
};

const defaultBurgerConstructorState: TdefaultBurgerConstructorState = {
  droppedIngredients: [],
  droppedBun: null,
};

export const constructorReducer = (
  state = defaultBurgerConstructorState,
  action: TConstructorActions
) => {
  switch (action.type) {
    case DROP_SELECTED_INGREDIENT: {
      const droppedIngredient = action.droppedIngredient;
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
          (item, index) => index !== action.indexToDelete
        ),
      };
    }
    case CLEAR_ORDER_LIST: {
      return {
        ...state,
        droppedIngredients: [],
        droppedBun: null,
      };
    } //TODO они меняются местами, а по хорошему нужно раздвигать элементы
    case REORDER_CONSTRUCTOR_INGREDIENT: {
      const draggedElementIndex = action.draggedElementIndex;
      const targetElementIndex = action.targetElementIndex;
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
