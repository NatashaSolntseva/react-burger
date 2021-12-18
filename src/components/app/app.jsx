import React, { useEffect, useState } from "react";

import styles from "./appStyles.module.css"

import AppHeader from "../app-header/appHeader";
import BurgerIngredients from "../burger-ingredients/burgerIngredients";
import BurgerConstructor from "../burger-constructor/burgerConstructor";
import Modal from "../modal/modal"
import OrderDetails from "../order-details/orderDetails"
import IngredientDetails from "../ingredient-detail/ingredientDetails";

import {inputDataUrl} from "../../utils/data"
import getResponseData from "../../utils/api";

function App() {
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    error: '',
    inputDataFromServer: []
  });

  useEffect(() =>{
    fetch(`${inputDataUrl}`)
      .then(res => getResponseData(res))
      .then((res) => {
          setState(state => ({
            ...state, isLoading: false, inputDataFromServer: res.data
          }));
        })
      .catch((error) => { //ловит все ошибки
        setState(state => ({
          ...state, isLoading: false, hasError: true, error: error            
        }))
      });
  }, []);

  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] = useState(false);
  const [modalIngredientData, setModalIngredientData] = useState({data: null});

  function openModal({modalType, itemId}) {
    let modalIngredientData = null;
    if (modalType === "ingredientDetail") {      
      setIngredientDetailsModalOpen(true);
      modalIngredientData = state.inputDataFromServer.find((item) => item._id === itemId);
      console.log('modalIngredientData', modalIngredientData);
      console.log('modalIngredientDat image', modalIngredientData.image);
      setModalIngredientData({data: modalIngredientData});         
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

  return (
    <div className = {styles.app}>
      <AppHeader />  
      <main className = {styles.content}>
        <BurgerIngredients openModal = {openModal} burgerInputData = {state.inputDataFromServer} />
        <BurgerConstructor openModal = {openModal} burgerInputData = {state.inputDataFromServer} /> 
      </main>       
      {isIngredientDetailsModalOpen && (
        <Modal closeModal = {closeModal}>            
          <IngredientDetails
            image = {modalIngredientData.data.image}
            name = {modalIngredientData.data.name}
            calories = {modalIngredientData.data.calories}
            fat = {modalIngredientData.data.fat}
            proteins = {modalIngredientData.data.proteins}
            carbohydrates = {modalIngredientData.data.carbohydrates}
          />
        </Modal>
      )}
      {isOrderDetailsModalOpen && (
        <Modal closeModal = {closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;