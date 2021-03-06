import {
  GET_INGREDIENTS_API_REQUEST,
  GET_INGREDIENTS_API_FAILD,
  GET_INGREDIENTS_API_SUCCESS,
} from "../actions/ingredientsActions";

import { TIngredientsActions } from "../actions/ingredientsActions";

import { IIngredient } from "../../utils/types";

type TdefaultIngredientsState = {
  ingredientsApiRequest: boolean;
  ingredientsApiFailed: boolean;
  ingredientsDataFromServer: IIngredient[];
};
const defaultIngredientsState: TdefaultIngredientsState = {
  ingredientsApiRequest: true,
  ingredientsApiFailed: false,
  ingredientsDataFromServer: [],
};

export const ingredientsReducer = (
  state = defaultIngredientsState,
  action: TIngredientsActions
): TdefaultIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_API_REQUEST: {
      return {
        ...state,
        ingredientsApiRequest: true,
        ingredientsApiFailed: false,
      };
    }
    case GET_INGREDIENTS_API_SUCCESS: {
      return {
        ...state,
        ingredientsDataFromServer: action.ingredients,
        ingredientsApiRequest: false,
      };
    }
    case GET_INGREDIENTS_API_FAILD: {
      return {
        ...defaultIngredientsState,
        ingredientsApiFailed: true,
        ingredientsApiRequest: false,
      };
    }
    default:
      return state;
  }
};
