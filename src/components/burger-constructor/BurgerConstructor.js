import React from "react";
import PropTypes from "prop-types";
import {inputDataTypes} from "../../utils/dataTypes";

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerConstructorStyles.module.css";


/*const BurgrConstructorElement = (props) => {

  console.log(props);
  let addText = "";

  if (props.type === "topObj") {
    console.log('top');
    addText = " (верх)";
  } else if (props.type === "bottomObj") {
    console.log('bottom');
    addText = " (низ)";
  }

  return(
    <div className = {styles.element_constructor}>
      <div>
        <DragIcon type = "primary"/>
      </div>
      <ConstructorElement
        
        text = {props.name + addText}
       
        thumbnail = {props.image}
      />
    </div>
  );
}
}*/

const BurgerConstructor = (props) => {
  console.log('props in BurgerConstructor', props);
  return (
    <div className = {`${styles.main_container} pt-25`}>
      {/* первый элемент, зафиксирован */}
      <div className = {styles.top_container}>
        {
          Array.of(props.burgerInputData.find(burgerItem => (burgerItem.type === "bun"))).map(el => (
            <ConstructorElement
              type = "top"
              isLocked = {true}
              text = {`${el.name} (верх)`}
              price = {el.price}
              thumbnail = {el.image}
            />  
           ))
        }  
      </div>
      {/* элементы начинок */}
        <div className = {styles.constructor_container}>
          {props.burgerInputData.filter(burgerItem => (burgerItem.type !== "bun")).map(el => (
            <div className = {styles.container_wrapper}>
              <div className = "mr-1">
                <DragIcon type = "primary" />
              </div>
              <ConstructorElement
                text = {el.name}
                price = {el.price}
                thumbnail = {el.image}
              />
            </div>
          ))}
        </div>
{/* послений элемент, зафиксирован */}
        
          <div className = {styles.bottom_container}>
            {
              Array.of(props.burgerInputData.find(burgerItem => (burgerItem.type === "bun"))).map(el => (
                <ConstructorElement
                  type = "bottom"
                  isLocked = {true}
                  text = {`${el.name} (низ)`}
                  price = {el.price}
                  thumbnail = {el.image}
                />  
              ))
            }  
          </div>      
        

      
      <div className = {styles.outcome}>
        <div className = {styles.price}>
          <p className = "text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type = "primary"/>
        </div>
        <Button type = "primary" size = "large">
          Оформить заказ
        </Button>
      </div>
      </div>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  props: PropTypes.arrayOf(inputDataTypes),
};