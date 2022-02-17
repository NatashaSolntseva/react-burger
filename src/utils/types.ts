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
