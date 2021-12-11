import React from "react";
import PropTypes from "prop-types";
import {inputDataTypes} from "../../../utils/dataTypes";

import styles from "./IngredientElementStyles.module.css"
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon';

const IngredientElement = (props) => {

  return (
    <div className = {styles.ingredient_element}>
      <div className = {styles.ingredient_content}>
        <img alt = "Фото элемента" src={props.image} className = {styles.element_img} />
        <p className = {styles.price}>
          {props.price}
          <CurrencyIcon type = "primary" />
        </p>
        <p className = "text text_type_main-default">
          {props.name}
        </p>
      </div>
      <Counter size = "default" count = {1}/>
    </div>
  );
}

export default IngredientElement;

IngredientElement.propTypes = {
  props: PropTypes.arrayOf(inputDataTypes),
};