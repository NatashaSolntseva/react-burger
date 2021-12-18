import React from "react";
import PropTypes from "prop-types";
import {ingredientTypes} from "../../utils/dataTypes";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "./ingredient-group/ingredientGroup";

import styles from "./burgerIngredientsStyles.module.css";
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';


function BurgerIngredients({openModal, burgerInputData}) {

  //console.log('props in BurgerIngredients', props);
  /*для скрола*/
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  const [current, setCurrent] = React.useState("buns");
  function scrollToTab(value) {
    if (value) {
      value.scrollIntoView({behavior: "smooth"});
    }
  } 
  
  return (
    <section className = {`${styles.burger_ingredients} pt-10`}>
      <h1 className = "text text_type_main-large">
        Соберите бургер
      </h1>
      <div className = {`${styles.burger_menu_tab} mt-5 mb-10`}>
        <Tab
          value = "buns"
          active = {current === "buns"}
          onClick = {(value) => {
            setCurrent(value);
            scrollToTab(bunRef.current);
          }}>
            Булки
        </Tab>
        <Tab
          value = "sauses"
          active = {current === "sauses"}
          onClick = {(value) => {
            setCurrent(value);
            scrollToTab(sauceRef.current);
        }}>
            Соусы
        </Tab>
        <Tab
          value = "fillings"
          active = {current === "fillings"}
          onClick = {(value) => {
            setCurrent(value);
            scrollToTab(mainRef.current);
        }}>    
            Начинки
        </Tab>
      </div>
      <ul className = {`${styles.burger_list_container} pt-25`} >
        <li>
          <IngredientGroup
            groupName = {"Булки"}
            groupElement = {burgerInputData.filter(burgerItem => burgerItem.type === 'bun')}
            ref = {bunRef}
            openModal = {openModal}                     
          />
        </li>
        <li>
          <IngredientGroup
            groupName = {"Соусы"}
            groupElement = {burgerInputData.filter(burgerItem => burgerItem.type === 'sauce')}
            ref = {sauceRef}
            openModal = {openModal}                 
          />
        </li>
        <li>
          <IngredientGroup
            groupName = {"Начинки"}
            groupElement = {burgerInputData.filter(burgerItem => burgerItem.type === 'main')}
            ref = {mainRef}  
            openModal = {openModal}                       
          />
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;

const BurgerIngredientsPropTypes = PropTypes.shape({
  openModal: PropTypes.func.isRequired,
  burgerInputData: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired,
});

BurgerIngredients.propTypes = BurgerIngredientsPropTypes.isRequired;