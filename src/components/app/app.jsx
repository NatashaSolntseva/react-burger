import { useEffect, useState } from "react";

import styles from "./appStyles.module.css";

// компоненты
import AppHeader from "../app-header/appHeader";
import BurgerIngredients from "../burger-ingredients/burgerIngredients";
import BurgerConstructor from "../burger-constructor/burgerConstructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/orderDetails";
import IngredientDetails from "../ingredient-detail/ingredientDetails";

// серверная часть
import { inputDataUrl } from "../../utils/data";
import getResponseData from "../../utils/api";

import { OrderContext } from "../../services/orderContext";
import { ProductContext } from "../../services/productContext";

function App() {
  const [isLoadingError, setIsloadingError] = useState(false);
  const [inputDataFromServer, setInputDataFromServer] = useState([]);

  useEffect(() => {
    fetch(`${inputDataUrl}/ingredients`)
      .then((res) => getResponseData(res))
      .then((res) => {
        setInputDataFromServer(res.data);
      })
      .catch((error) => {
        //ловит все ошибки
        setIsloadingError(true);
        console.log(`Данные с сервера не получены, ошибка: ${error}`);
      });
  }, []);

  // реализация функциона модельных окон

  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] =
    useState(false);
  const [modalIngredientData, setModalIngredientData] = useState([]);

  function openModal({ modalType, itemId }) {
    if (modalType === "ingredientDetail") {
      setIngredientDetailsModalOpen(true);
      const ingredient = inputDataFromServer.find(
        (item) => item._id === itemId
      );
      setModalIngredientData(ingredient);
    } else {
      if (modalType === "orderDetail") {
        setOrderDetailsModalOpen(true);
      }
    }
  }

  function closeModal() {
    setOrderDetailsModalOpen(false);
    setIngredientDetailsModalOpen(false);
  }

  //______________________________________фомирование заказа, отправка на сервер данных об ингр-ах бургера____
  const ingredientDataContext = inputDataFromServer; // для передачи на вход в конструктор, контекст, будет переделано на DnD
  const [orderInfo, setOrderInfo] = useState({
    orderId: null,
    isCreatingOrder: false,
    error: "",
  });

  const handleMakeOrder = async () => {
    const orderIngredientList = ingredientDataContext
      .filter((el) => el.type !== "bun")
      .map((el) => el._id)
      .concat(
        ingredientDataContext.find((el) => (el.type === "bun" ? el : 0))._id,
        ingredientDataContext.find((el) => (el.type === "bun" ? el : 0))._id
      );

    //отправка листа ингредиентов на сервер
    const postOrderOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: orderIngredientList,
      }),
    };

    try {
      setOrderInfo({ orderId: null, isCreatingOrder: true });
      const res = await fetch(`${inputDataUrl}/orders`, postOrderOption);
      if (res.ok) {
        const serverResOrderId = await res.json();
        setOrderInfo({
          ...orderInfo,
          isCreatingOrder: false,
          orderId: serverResOrderId,
        });
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (error) {
      setOrderInfo({ orderId: null, isCreatingOrder: false, error: error });
    }
    openModal({ modalType: "orderDetail" });
  };

  //___________________________________________render______________________________________________
  return (
    <div className={styles.app}>
      <AppHeader />
      {!isLoadingError ? (
        <main className={styles.content}>
          <ProductContext.Provider value={ingredientDataContext}>
            <BurgerIngredients openModal={openModal} />
          </ProductContext.Provider>
          <ProductContext.Provider value={ingredientDataContext}>
            {/* пока нет выбора складываем в правую часть все ингредиенты с сервера state.inputDataFromServer*/}
            <BurgerConstructor handleMakeOrder={handleMakeOrder} />
          </ProductContext.Provider>
        </main>
      ) : (
        <main>
          <section>
            <h1 className="text text_type_main-large mt-3">
              Ошибка загрузки данных...
            </h1>
          </section>
        </main>
      )}
      {/* модальное окно  - подробное описание игредиента*/}
      {isIngredientDetailsModalOpen && (
        <Modal closeModal={closeModal}>
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
      <OrderContext.Provider value={orderInfo}>
        {isOrderDetailsModalOpen && (
          <Modal closeModal={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </OrderContext.Provider>
    </div>
  );
}

export default App;
