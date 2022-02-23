import { IIngredient } from "../../utils/types";
import { v4 as uuidv4 } from "uuid";

export const DROP_SELECTED_INGREDIENT: "DROP_SELECTED_INGREDIENT" =
  "DROP_SELECTED_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const CLEAR_ORDER_LIST: "CLEAR_ORDER_LIST" = "CLEAR_ORDER_LIST";
export const REORDER_CONSTRUCTOR_INGREDIENT: "REORDER_CONSTRUCTOR_INGREDIENT" =
  "REORDER_CONSTRUCTOR_INGREDIENT";

export interface IDropSelectedIngredient {
  readonly type: typeof DROP_SELECTED_INGREDIENT;
  readonly droppedIngredient: IIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly indexToDelete: number;
}

export interface IClearOrderList {
  readonly type: typeof CLEAR_ORDER_LIST;
}

export interface IReorderConstructorIngredient {
  readonly type: typeof REORDER_CONSTRUCTOR_INGREDIENT;
  readonly targetElementIndex: number;
  readonly draggedElementIndex: number;
}

export type TConstructorActions =
  | IDropSelectedIngredient
  | IDeleteIngredient
  | IClearOrderList
  | IReorderConstructorIngredient;

export const dropSelectedIngredient = (
  ingredient: IIngredient
): IDropSelectedIngredient => {
  return {
    type: DROP_SELECTED_INGREDIENT,
    droppedIngredient: { ...ingredient, uid: uuidv4() },
  };
};

export const deleteIngredient = (indexToDelete: number): IDeleteIngredient => {
  return { type: DELETE_INGREDIENT, indexToDelete };
};

export const clearOrderList = (): IClearOrderList => {
  return {
    type: CLEAR_ORDER_LIST,
  };
};

export const reorderConstructorIngredient = (
  draggedElementIndex: number,
  targetElementIndex: number
): IReorderConstructorIngredient => {
  return {
    type: REORDER_CONSTRUCTOR_INGREDIENT,
    draggedElementIndex,
    targetElementIndex,
  };
};
