import React, { useEffect, useState } from "react";

import styles from "./AppStyles.module.css"

import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import Modal from "../modal/modal"
import OrderDetails from "../order-details/OrderDetails"
import IngredientDetails from "../ingredient-detail/IngredientDetails";

import {inputDataUrl} from "../../utils/data"



function App() {
  //console.log(inputDataUrl);
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    error: '',
    inputDataFromServer: []
  });

  function getResponseData(res) {
    if (res.ok) {
      return res.json();
    } return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  };

  useEffect(() =>{
    fetch(`${inputDataUrl}`)
      .then(res => getResponseData(res))
      .then(
        (res) => {
          setState(state => ({
            ...state, isLoading: false, inputDataFromServer: res.data
          }));
        },
        (error) => {
          setState(state => ({
            ...state, isLoading: false, hasError: true, error: error            
          }))
        }
      )
  }, []);

  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] = useState(false);
  const [modalIngredientData, setModalIngredientData] = useState();

  function openModal({modalType}) {
    if (modalType === "ingredientDetail") {      
      setIngredientDetailsModalOpen(true);      
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
          <IngredientDetails />
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