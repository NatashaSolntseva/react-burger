import React, { useEffect, useState } from "react";

import styles from "./AppStyles.module.css"

import AppHeader from "../app-header/AppHeader"
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

import {inputDataUrl} from "../../utils/data"
import { stat } from "fs";


function App() {
  //console.log(inputDataUrl);
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    error: '',
    inputDataFromServer: []
  });

  function getResponseData(res) {
    if (res.ok) {
      return res.json();
    } return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  };

  React.useEffect(() =>{
    fetch(`${inputDataUrl}`)
      .then(res => getResponseData(res))
      .then(
        (res) => {
          setState(state => ({
            ...state, isLoading: true, inputDataFromServer: res.data
          }));
        },
        (error) => {
          setState(state => ({
            ...state, isLoading: true, hasError: true, error: error            
          }))
        }
      )
  }, []);

  if (state.hasError) {
    console.log('Ошибка', state.error);
  } else if (!state.isLoading) {
    console.log('загрузка с сервера......');
  } else {
    console.log('все ok - загрузка завершена, state:', state); 
    console.log('inputDataFromServer',state.inputDataFromServer);
  }
/*
  return (
    <div className = {styles.app}>
      <AppHeader />  
      <main className = {styles.content}>
        {state.isLoading && (<p>Происходить загрузка данных с сервера, ждите</p>)}
        {state.hasError && (<p>Не загрузились данные с сервера. Ошибка</p>)}
        {!state.isLoading && !state.hasError && (
          <>
            <BurgerIngredients burgerInputData = {state.inputDataFromServer} />
            <BurgerConstructor burgerInputData = {state.inputDataFromServer} />
          </>
        )}

      </main>  
    </div>
  );
*/
  return (
    <div className = {styles.app}>
      <AppHeader />  
      <main className = {styles.content}>
        <BurgerIngredients burgerInputData = {state.inputDataFromServer} />
        <BurgerConstructor burgerInputData = {state.inputDataFromServer} /> 
      </main>  
    </div>
  );


}

export default App;