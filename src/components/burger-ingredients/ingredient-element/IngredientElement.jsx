import React from "react";
import PropTypes from "prop-types";
import {ingredientTypes} from "../../../utils/dataTypes";

import styles from "./IngredientElementStyles.module.css"
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon';

const IngredientElement = ({id, image, name, price, openModal}) => {

  function onClick() {
    openModal({modalType: "ingredientDetail"});
   // console.log('push!!');
  }
 //console.log('key', id);

  return (
    <div className = {styles.ingredient_element} >
      <div className = {styles.ingredient_content} onClick = {onClick}>
        <img alt = "Фото элемента" src={image} className = {styles.element_img} />
        <p className = {styles.price}>
          {price}
          <CurrencyIcon type = "primary" />
        </p>
        <p className = "text text_type_main-default">
          {name}
        </p>
      </div>
      <Counter size = "default" count = {1}/>
    </div>
  );
}

export default IngredientElement;

/*
IngredientElement.propTypes = {
  image: ingredientTypes.isRequired,
  price: ingredientTypes.isRequired,
  name: ingredientTypes.isRequired
};
*/

IngredientElement.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
};