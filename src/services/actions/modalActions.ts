import { TIngredient } from "../../utils/types";
//Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
export const SET_MODAL_ERROR: "SET_MODAL_ERROR" = "SET_MODAL_ERROR";
export const OPEN_MODAL_INGREDIENT: "OPEN_MODAL_INGREDIENT" =
  "OPEN_MODAL_INGREDIENT";
export const OPEN_MODAL_ORDER: "OPEN_MODAL_ORDER" = "OPEN_MODAL_ORDER";
//Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.

export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";

export interface ISetModalError {
  readonly type: typeof SET_MODAL_ERROR;
}

export interface IOpenModalIngredient {
  readonly type: typeof OPEN_MODAL_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IOpenModalOrder {
  readonly type: typeof OPEN_MODAL_ORDER;
}

export interface ICloseModal {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions =
  | ISetModalError
  | IOpenModalIngredient
  | IOpenModalOrder
  | ICloseModal;

export const setModalError = (): ISetModalError => {
  return {
    type: SET_MODAL_ERROR,
  };
};

export const openModalIngredient = (
  ingredient: TIngredient
): IOpenModalIngredient => {
  return {
    type: OPEN_MODAL_INGREDIENT,
    ingredient,
  };
};

export const openModalOrder = (): IOpenModalOrder => {
  return {
    type: OPEN_MODAL_ORDER,
  };
};

export const closeModal = (): ICloseModal => {
  return {
    type: CLOSE_MODAL,
  };
};
