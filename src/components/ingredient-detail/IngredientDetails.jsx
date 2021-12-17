import React from "react";

import styles from "./IngredientDetails.module.css"

import meatImg from "../../image/meat-01.png"

function IngredientDetails(props) {
  return (
    <div className = {`${styles.container} p-10`}>
      <p className = {`${styles.header} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img className = {`${styles.icon}`}
            alt ="заказ принят"
            src ={meatImg}      
      />
      <p className="text text_type_main-medium">
        Биокотлета из марсианской Магнолии
      </p>
      <div className = {`${styles.captioncontainer} mt-8 text_color_inactive`}>
        <div className = {`${styles.element} mr-5`}>
          <p className="text text_type_main-default">
          Калории,ккал
          </p>
          <p className="text text_type_digits-default">
          244,4
          </p>
        </div>
        <div className = {`${styles.element} mr-5`}>
          <p className="text text_type_main-default">
          Белки, г
          </p>
          <p className="text text_type_digits-default">
          12,2
          </p>
        </div>
        <div className = {`${styles.element} mr-5`}>
          <p className="text text_type_main-default">
          Жиры, г
          </p>
          <p className="text text_type_digits-default">
          17,2
          </p>
        </div>
        <div className = {`${styles.element} mr-5`}>
          <p className="text text_type_main-default">
          Углеводы, г
          </p>
          <p className="text text_type_digits-default">
          10,2
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;