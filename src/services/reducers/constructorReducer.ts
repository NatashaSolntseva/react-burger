import {
  CLEAR_ORDER_LIST,
  DROP_SELECTED_INGREDIENT,
  DELETE_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructorActions";

import { TConstructorActions } from "../actions/constructorActions";

import { IIngredient } from "../../utils/types";

type TdefaultBurgerConstructorState = {
  droppedIngredients: IIngredient[];
  droppedBun: IIngredient | null;
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
          (i, index) => index !== action.indexToDelete
        ),
      };
    }
    case CLEAR_ORDER_LIST: {
      return {
        ...state,
        droppedIngredients: [],
        droppedBun: null,
      };
    }
    case REORDER_CONSTRUCTOR_INGREDIENT: {
      const constructorIngredientsArr = [...state.droppedIngredients];
      const draggedEl = constructorIngredientsArr.splice(
        action.draggedElementIndex,
        1
      ); // удаляет и возвращает один элемент по индексу draggedElementIndex
      constructorIngredientsArr.splice(
        action.targetElementIndex,
        0,
        draggedEl[0]
      ); //добавляем удаленный элемент на место таргета
      return {
        ...state,
        droppedIngredients: constructorIngredientsArr,
      };
    }
    default:
      return state;
  }
};
