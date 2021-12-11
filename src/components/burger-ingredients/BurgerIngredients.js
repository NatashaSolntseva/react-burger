import React from "react";
import PropTypes from "prop-types";
import {ingredientTypes} from "../../utils/dataTypes";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "./ingredient-group/IngredientGroup";

import styles from "./BurgerIngredientsStyles.module.css";
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';


function BurgerIngredients(props) {

  console.log('props in BurgerIngredients', props);

  const bun = React.useRef(null);
  const sauce = React.useRef(null);
  const main = React.useRef(null);

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
            scrollToTab(bun.current);
          }}>
            Булки
        </Tab>
        <Tab
          value = "sauses"
          active = {current === "sauses"}
          onClick = {(value) => {
            setCurrent(value);
            scrollToTab(sauce.current);
        }}>
            Соусы
        </Tab>
        <Tab
          value = "fillings"
          active = {current === "fillings"}
          onClick = {(value) => {
            setCurrent(value);
            scrollToTab(main.current);
        }}>    
            Начинки
        </Tab>
      </div>
      <ul className = {`${styles.burger_list_container} pt-25`}>
        <li>
          <IngredientGroup
            groupName = {"Булки"}
            groupElement = {props.burgerInputData.filter(burgerItem => burgerItem.type === 'bun')}
            ref = {bun}
          />
        </li>
        <li>
         <IngredientGroup
            groupName = {"Соусы"}
            groupElement = {props.burgerInputData.filter(burgerItem => burgerItem.type === 'sauce')}
            ref = {sauce}
          />
        </li>
        <li>
          <IngredientGroup
            groupName = {"Начинки"}
            groupElement = {props.burgerInputData.filter(burgerItem => burgerItem.type === 'main')}
            ref = {main}
          />
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  burgerInputData: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired,
};