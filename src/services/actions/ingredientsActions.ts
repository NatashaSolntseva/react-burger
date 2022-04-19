import { IIngredient } from "../../utils/types";
import Api from "../../utils/api";
import { AppDispatch, AppThunk, RootState } from "../..";

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
  readonly ingredients: IIngredient[];
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
  ingredients: IIngredient[]
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

export const getIngredientsRequestApi: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsApiRequest());
    Api.getIngredients()
      .then((res) => {
        dispatch(getIngredientsApiSuccess(res.data));
      })
      .catch((error) => {
        console.log(`Данные с сервера не получены, ошибка: ${error}`);
        dispatch(getIngredientsApiFaild());
      });
  };
};

export const findIngredientById = (id: string) => (state: RootState) => {
  return state.ingredients.ingredientsDataFromServer.find(
    (item: IIngredient) => item._id === id
  );
};

export const getOrderIngredientsDataByIds =
  (idsArr: string[]) => (state: RootState) => {
    const ingredientsArr = idsArr
      .filter((id) => typeof id === "string")
      .map((id) =>
        state.ingredients.ingredientsDataFromServer.find(
          (item: IIngredient) => item._id === id
        )
      );
    //console.log("ingredientsArr", ingredientsArr);

    const totalPrice = ingredientsArr.reduce((sum, ingredient) => {
      if (ingredient) sum += ingredient.price;
      return sum;
    }, 0);
    //const totalPrice = 1510;
    return {
      ingredients: ingredientsArr,
      totalPrice: totalPrice,
    };
  };
