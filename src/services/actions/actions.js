// Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients.
export const GET_INGREDIENTS_API_REQUEST = "GET_INGREDIENTS_API_REQUEST";
export const GET_INGREDIENTS_API_FAILD = "GET_INGREDIENTS_API_FAILD";
export const GET_INGREDIENTS_API_SUCCESS = "GET_INGREDIENTS_API_SUCCESS";

//Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
export const DROP_SELECTED_INGREDIENT = "DROP_SELECTED_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const CLEAR_ORDER_LIST = "CLEAR_ORDER_LIST";
export const REORDER_CONSTRUCTOR_INGREDIENT = "REORDER_CONSTRUCTOR_INGREDIENT";
//Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
export const SET_MODAL_ERROR = "SET_MODAL_ERROR";
export const OPEN_MODAL_INGREDIENT = "OPEN_MODAL_INGREDIENT";
export const OPEN_MODAL_ORDER = "OPEN_MODAL_ORDER";
//Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.

export const CLOSE_MODAL = "CLOSE_MODAL";
//Получение и обновление номера заказа в модальном окне OrderDetails.
export const SEND_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const SEND_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const SEND_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
