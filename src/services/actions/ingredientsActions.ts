import { TIngredient } from "../../utils/types";
import { getResponseData, inputDataUrl } from "../../utils/api";
import { AppDispatch, AppThunk } from "../..";

export const GET_INGREDIENTS_API_REQUEST: "GET_INGREDIENTS_API_REQUEST" =
  "GET_INGREDIENTS_API_REQUEST";
export const GET_INGREDIENTS_API_FAILD: "GET_INGREDIENTS_API_FAILD" =
  "GET_INGREDIENTS_API_FAILD";
export const GET_INGREDIENTS_API_SUCCESS: "GET_INGREDIENTS_API_SUCCESS" =
  "GET_INGREDIENTS_API_SUCCESS";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_API_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_API_SUCCESS;
  readonly ingredients: TIngredient[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_API_FAILD;
}

export type TIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

const getIngredientsApiRequest = (): IGetIngredientsRequest => {
  return {
    type: GET_INGREDIENTS_API_REQUEST,
  };
};

const getIngredientsApiSuccess = (
  ingredients: TIngredient[]
): IGetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_API_SUCCESS,
    ingredients,
  };
};

const getIngredientsApiFaild = (): IGetIngredientsFailed => {
  return {
    type: GET_INGREDIENTS_API_FAILD,
  };
};

export const getIngredientsRequestApi: AppThunk =
  () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsApiRequest());
    return fetch(`${inputDataUrl}/ingredients`)
      .then((res) => getResponseData(res))
      .then((ingredients) => {
        dispatch(getIngredientsApiSuccess(ingredients.data));
      })
      .catch((error) => {
        console.log(`Данные с сервера не получены, ошибка: ${error}`);
        dispatch(getIngredientsApiFaild());
      });
  };
