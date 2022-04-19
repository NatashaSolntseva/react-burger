import { ReactNode, SyntheticEvent } from "react";

import { Location } from "history";

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

export type TOpenModal = {
  modalType: "ingredientDetail" | "orderDetail";
  itemId?: string;
};

export interface IBurgerIngredientElement {
  ingredient: IIngredient;
  openModal: ({ modalType, itemId }: TOpenModal) => void;
  count: number;
}

export interface IIngredientsGroup {
  groupName: string;
  groupElements: IIngredient[];
  openModal: ({ modalType, itemId }: TOpenModal) => void; // openModal: (selectedIngredients: TIngredient[]) => void;
  count: { [ingredient: string]: number }; //ingredientCounter useMemo
}

export interface IBunMold {
  children?: string;
  position: string;
}

export interface IIngredientsMold {
  children?: string;
}

export interface IBurgerConstructorDnDWrapper {
  openModal: ({ modalType }: TOpenModal) => void;
}

export interface IBurgerConstructorElement {
  ingredient: IIngredient;
  handleDeleteIngredient: (index: number) => void;
  index: number;
}

export interface IBurgerConstructor {
  openModal: ({ modalType }: TOpenModal) => void; //selectedIngredients: IIngredient[]
}

export interface IBurgerIngredients {
  openModal: ({ modalType, itemId }: TOpenModal) => void;
}

export interface IFormCaption {
  children: string;
  linkCaption: string;
  link: string;
}

export interface IAppForm {
  children: ReactNode;
  title: string;
  onSubmit?: (evt: SyntheticEvent) => void;
}

export interface IAppFormSubmit {
  children: ReactNode;
}

export interface ILocation extends Location {
  from: {
    key: string;
    pathname: string;
    search: string;
    hash: string;
    state: object;
  };
  background?: Location;
}

export type TUser = {
  user: {
    email: string;
    name: string;
  };
};

export interface IFeedsOrders {
  orders: any;
}

export interface IOrdersList {
  ordersData: TWsOrder[];
  isOrderStatus?: boolean; //для верстки карточки заказа в ленте и в заказах пользователя
  path: string;
}

export interface IOrderCard {
  orderData: TWsOrder;
  isOrderStatus?: boolean; //для верстки карточки заказа в ленте и в заказах пользователя
  path: string;
}

export interface IIngredientIcon {
  img?: string;
  hiddenIconsCount?: number;
}

export type TWsOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TWsAnswer = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: TWsOrder[];
};

export type TWsOrdersActions = {
  wsAllOrdersData: string;
  wsUserOrdersData: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export interface IFeedStatistic {
  total: (number | string) & ReactNode;
  totalToday: (number | string) & ReactNode;
  doneOrders?: number[] | null;
  pendingOrders?: number[] | null;
}

export interface IStatisticStatusList {
  title: string;
  hightlightSelection?: boolean;
  orders?: number[] | null;
}

export type TOrdersIngredient = {
  _id?: string;
  name?: string;
  type?: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price?: number;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  uid?: string;
};
