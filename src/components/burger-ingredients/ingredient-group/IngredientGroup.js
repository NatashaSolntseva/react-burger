import React from "react";
import PropTypes from "prop-types";
import {inputDataTypes} from "../../../utils/dataTypes";

import styles from "./IngredientGroupStyles.module.css"
import IngredientElement from "../ingredient-element/IngredientElement";

const IngredientGroup = React.forwardRef((props, ref) => {
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
  props: PropTypes.arrayOf(inputDataTypes),
};