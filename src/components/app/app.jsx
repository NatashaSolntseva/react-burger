import React, { useEffect, useState } from "react";

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

//контекст
import { OrderContext } from "../../services/orderContext";
import { ProductContext } from "../../services/productContext";

function App() {
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    error: "",
    inputDataFromServer: [],
  });

  useEffect(() => {
    fetch(`${inputDataUrl}/ingredients`)
      .then((res) => getResponseData(res))
      .then((res) => {
        setState((state) => ({
          ...state,
          isLoading: false,
          inputDataFromServer: res.data,
        }));
      })
      .catch((error) => {
        //ловит все ошибки
        setState((state) => ({
          ...state,
          isLoading: false,
          hasError: true,
          error: error,
        }));
      });
  }, []);
  //_______________________________функционал модельных окон___________________________________
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] =
    useState(false);
  const [modalIngredientData, setModalIngredientData] = useState({
    data: null,
  });

  function openModal({ modalType, itemId }) {
    let modalIngredientData = null;
    if (modalType === "ingredientDetail") {
      setIngredientDetailsModalOpen(true);
      modalIngredientData = state.inputDataFromServer.find(
        (item) => item._id === itemId
      );
      //console.log("modalIngredientData", modalIngredientData);
      //console.log("modalIngredientDat image", modalIngredientData.image);
      setModalIngredientData({ data: modalIngredientData });
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
  const ingredientDataContext = state.inputDataFromServer; // для передачи на вход в конструктор, контекст, будет переделано на DnD
  const [orderInfo, setOrderInfo] = useState({
    orderId: null,
    isCreatingOrder: false,
    error: "",
  });

  const handleMakeOrder = async () => {
    //булочки
    const bun = ingredientDataContext.find((el) =>
      el.type === "bun" ? el : 0
    )._id;
    //console.log("bun make order", bun);
    //начинка
    const filling = ingredientDataContext
      .filter((el) => el.type !== "bun")
      .map((el) => el._id);
    //console.log("начинка", filling);
    //все вместе - булки и начинка для бургера
    const orderIngredientList = filling.concat(bun, bun);
    //console.log("order total", orderIngredientList);

    //отправка листа ингредиентов на сервер
    const postOrderOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: orderIngredientList,
      }),
    };

    try {
      setOrderInfo({ ...orderInfo, isCreatingOrder: true });
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
      setOrderInfo({ ...orderInfo, isCreatingOrder: false, error: error });
    }
    openModal({ modalType: "orderDetail" });
  };

  //___________________________________________render______________________________________________
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <ProductContext.Provider value={ingredientDataContext}>
          <BurgerIngredients openModal={openModal} />
        </ProductContext.Provider>
        <ProductContext.Provider value={ingredientDataContext}>
          {/* пока нет выбора складываем в правую часть все ингредиенты с сервера state.inputDataFromServer*/}
          <BurgerConstructor handleMakeOrder={handleMakeOrder} />
        </ProductContext.Provider>
      </main>
      {/* модальное окно  - подробное описание игредиента*/}
      {isIngredientDetailsModalOpen && (
        <Modal closeModal={closeModal}>
          <IngredientDetails
            image={modalIngredientData.data.image}
            name={modalIngredientData.data.name}
            calories={modalIngredientData.data.calories}
            fat={modalIngredientData.data.fat}
            proteins={modalIngredientData.data.proteins}
            carbohydrates={modalIngredientData.data.carbohydrates}
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
