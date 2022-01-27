import {
  DROP_SELECTED_INGREDIENT,
  DELETE_INGREDIENT,
  CLEAR_ORDER_LIST,
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
    }
    default:
      return state;
  }
};
