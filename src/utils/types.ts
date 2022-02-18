import { ReactNode } from "react";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uid?: string;
}

export type TCloseModal = { closeModal: () => void; children?: ReactNode };

export type TOverlayCloseModal = {
  closeModal: (evt: any) => void;
  children?: ReactNode;
};

export type TDetailIngredient = { ingredient: IIngredient };

export interface IBurgerIngredientElement {
  ingredient: IIngredient;
  openModal: ({}: any) => void;
  count: number;
}

export interface IIngredientsGroup {
  groupName: string;
  groupElements: IIngredient[];
  openModal: ({}: any) => void; // openModal: (selectedIngredients: TIngredient[]) => void;
  count: { [ingredient: string]: number }; //ingredientCounter useMemo
}

export interface IBunMold {
  children?: string;
  position: string;
}

export interface IIngredientsMold {
  children?: string;
}

/*export interface IBurgerConstructorDnDWrapper {
  openModal: ({}: any) => void;
}
*/

export interface IBurgerConstructorElement {
  ingredient: IIngredient;
  handleDeleteIngredient: (index: number) => void;
  index: number;
}