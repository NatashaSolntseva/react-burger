import {
  OPEN_MODAL_INGREDIENT,
  OPEN_MODAL_ORDER,
  SET_MODAL_ERROR,
  CLOSE_MODAL,
} from "../actions/modalActions";

import { TModalActions } from "../actions/modalActions";

type TmodalInitialState = {
  modalIngredientData: {};
  isOrderDetailModalVisible: boolean;
  isIngredientDetailModalVisible: boolean;
  hasModalError: boolean;
};
const modalInitialState: TmodalInitialState = {
  modalIngredientData: {},
  isOrderDetailModalVisible: false,
  isIngredientDetailModalVisible: false,
  hasModalError: false,
};

export const modalReducer = (
  state = modalInitialState,
  action: TModalActions
) => {
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT: {
      return {
        ...state,
        hasModalError: true,
        isIngredientDetailModalVisible: true,
        modalIngredientData: action.ingredient,
      };
    }
    case OPEN_MODAL_ORDER: {
      return {
        ...state,
        hasModalError: true,
        isOrderDetailModalVisible: true,
      };
    }
    case SET_MODAL_ERROR: {
      return {
        ...state,
        hasModalError: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modalIngredientData: {},
        isOrderDetailModalVisible: false,
        isIngredientDetailModalVisible: false,
      };
    }
    default:
      return state;
  }
};
