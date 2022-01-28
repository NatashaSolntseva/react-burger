import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./appStyles.module.css";

// компоненты
import AppHeader from "../app-header/appHeader";
import BurgerIngredients from "../burger-ingredients/burgerIngredients";

import BurgerConstructorDndWrapper from "../burger-constructor/components/burger-constructor-dnd-wrapper/burger-constructor-dnd-wrapper";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/orderDetails";
import IngredientDetails from "../burger-ingredients/components/ingredient-detail/ingredientDetails";

// серверная часть

import { getIngredientsApiRequest } from "../../utils/api";

import {
  CLOSE_MODAL,
  OPEN_MODAL_ORDER,
  OPEN_MODAL_INGREDIENT,
  CLEAR_ORDER_LIST,
} from "../../services/actions/actions";

function App() {
  const dispatch = useDispatch();

  //запрос данных ингредиентов с сервера
  const {
    ingredientsApiRequest,
    ingredientsApiFailed,
    ingredientsDataFromServer,
  } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredientsApiRequest());
  }, [dispatch]);

  // реализация функциона модельных окон

  const {
    isOrderDetailModalVisible,
    isIngredientDetailModalVisible,
    modalIngredientData,
  } = useSelector((store) => store.modal);

  function openModal({ modalType, itemId }) {
    if (modalType === "ingredientDetail") {
      const ingredient = ingredientsDataFromServer.find(
        (item) => item._id === itemId
      );
      dispatch({ type: OPEN_MODAL_INGREDIENT, payload: ingredient });
    } else {
      if (modalType === "orderDetail") {
        dispatch({ type: OPEN_MODAL_ORDER });
      }
    }
  }

  const handleIngredientModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const handleOrderModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: CLEAR_ORDER_LIST });
  };

  //___________________________________________render______________________________________________
  return (
    <div className={styles.app}>
      <AppHeader />
      {ingredientsApiRequest && <h1>загрузка данных</h1>}
      {ingredientsApiFailed && (
        <main>
          <section>
            <h1 className="text text_type_main-large mt-3">
              Ох, ошибка загрузки данных...
            </h1>
          </section>
        </main>
      )}
      <DndProvider backend={HTML5Backend}>
        {!ingredientsApiRequest &&
          !ingredientsApiFailed &&
          ingredientsDataFromServer.length && (
            <main className={styles.content}>
              <BurgerIngredients openModal={openModal} />
              {/*<BurgerConstructor openModal={openModal} />*/}
              <BurgerConstructorDndWrapper openModal={openModal} />
            </main>
          )}
      </DndProvider>
      {/* модальное окно  - подробное описание игредиента*/}
      {isIngredientDetailModalVisible && (
        <Modal closeModal={handleIngredientModalClose}>
          <IngredientDetails
            image={modalIngredientData.image}
            name={modalIngredientData.name}
            calories={modalIngredientData.calories}
            fat={modalIngredientData.fat}
            proteins={modalIngredientData.proteins}
            carbohydrates={modalIngredientData.carbohydrates}
          />
        </Modal>
      )}
      {/* модальное окно о готовности заказа. номер и т.д.*/}
      {isOrderDetailModalVisible && (
        <Modal closeModal={handleOrderModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
