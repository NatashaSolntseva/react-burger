import React from "react";
import PropTypes from "prop-types";
import {ingredientTypes} from "../../../utils/dataTypes";

import styles from "./IngredientGroupStyles.module.css"
import IngredientElement from "../ingredient-element/IngredientElement";

const IngredientGroup = React.forwardRef((props, ref) => {

  console.log('props in IngredientGroup', props);

  return (
    <>
      <p
       className = "text text_type_main-medium"
       ref = {ref}
      >
        {props.groupName}
      </p>
      <div className = {styles.content}>
        {
          props.groupElement.map(burgerItem => (
            <IngredientElement
              key = {burgerItem._id}
              image = {burgerItem.image}
              name = {burgerItem.name}
              price = {burgerItem.price}
            />  
          ))
        }
      </div>
    </>
  ) 
})

export default IngredientGroup;

IngredientGroup.propTypes = {
  groupName: PropTypes.string.isRequired
};

/*


При отрисовке массива компонентов нужно всегда указывать уникальный атрибут key в самом верхнем уровне верстки.

Это нужно исправить везде, где отрисовываете массив через map

*/