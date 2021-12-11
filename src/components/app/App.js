import styles from "./AppStyles.module.css"

import AppHeader from "../app-header/AppHeader"
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

import {inputData} from "../../utils/data"


function App() {
  return (
    <div className = {styles.app}>
      <AppHeader />  
      <main className = {styles.content}>
        <BurgerIngredients burgerInputData = {inputData}/>
        <BurgerConstructor burgerInputData = {inputData}/>
      </main>  
    </div>
  );
}

export default App;