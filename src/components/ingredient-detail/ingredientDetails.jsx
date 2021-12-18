import React from "react";
import PropTypes from "prop-types";

import styles from "./ingredientDetails.module.css"

function IngredientDetails({
  image,
  name,
  calories,
  fat,
  proteins,
  carbohydrates
 }) {
  return (
    <div className = {`${styles.container} p-10`}>
      <p className = {`${styles.header} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img className = {`${styles.icon}`}
            alt ="заказ принят"
            src ={image}      
      />
      <p className="text text_type_main-medium">
        {name}
      </p>
      <div className = {`${styles.captioncontainer} mt-8 text_color_inactive`}>
        <div className = {`${styles.element} mr-5`}>
          <p className="text text_type_main-default">
          Калории,ккал
          </p>          
          <p className="text text_type_digits-default">
          {calories}
          </p>
        </div>
        <div className = {`${styles.element} mr-5`}>
          <p className="text text_type_main-default">
          Белки, г
          </p>
          <p className="text text_type_digits-default">
          {proteins}
          </p>
        </div>
        <div className = {`${styles.element} mr-5`}>
          <p className="text text_type_main-default">
          Жиры, г
          </p>
          <p className="text text_type_digits-default">
          {fat}
          </p>
        </div>
        <div className = {`${styles.element} mr-5`}>
          <p className="text text_type_main-default">
          Углеводы, г
          </p>
          <p className="text text_type_digits-default">
          {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}


export default IngredientDetails;


const IngredientDetailsPropTypes = PropTypes.shape({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
});


IngredientDetails.propTypes = IngredientDetailsPropTypes.isRequired;