import { FC } from "react";

import { useAppSelector } from "../../services/hooks/hooks";
import { useAppDispatch } from "../../services/hooks/hooks";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./homeStyle.module.css";

import BurgerIngredients from "../../components/burger-ingredients/burgerIngredients";
import BurgerConstructorDndWrapper from "../../components/burger-constructor/components/burger-constructor-dnd-wrapper/burger-constructor-dnd-wrapper";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/orderDetails";
import Loader from "../../components/loader/loader";

import {
  closeModal,
  openModalOrder,
  openModalIngredient,
} from "../../services/actions/modalActions";

import { clearOrderList } from "../../services/actions/constructorActions";
import { IIngredient } from "../../utils/types";
import { TOpenModal } from "../../utils/types";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    ingredientsApiRequest,
    ingredientsApiFailed,
    ingredientsDataFromServer,
  } = useAppSelector((store) => store.ingredients);

  const { isOrderDetailModalVisible } = useAppSelector((store) => store.modal);

  function openModal({ modalType, itemId }: TOpenModal) {
    if (modalType === "ingredientDetail") {
      const ingredient = ingredientsDataFromServer.find(
        (item: IIngredient) => item._id === itemId
      );
      dispatch(openModalIngredient(ingredient));
    } else {
      if (modalType === "orderDetail") {
        dispatch(openModalOrder());
      }
    }
  }

  const handleOrderModalClose = () => {
    dispatch(closeModal());
    dispatch(clearOrderList());
  };

  //___________________________________________render______________________________________________
  return (
    <div className={styles.app}>
      {ingredientsApiRequest && <Loader />}
      {ingredientsApiFailed && (
        <main>
          <section>
            <h1 className="text text_type_main-large">
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
              <BurgerConstructorDndWrapper openModal={openModal} />
            </main>
          )}
      </DndProvider>

      {/* модальное окно о готовности заказа. номер и т.д.*/}
      {isOrderDetailModalVisible && (
        <Modal closeModal={handleOrderModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
