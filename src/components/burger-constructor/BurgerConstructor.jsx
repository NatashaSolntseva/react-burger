import React from "react";
import PropTypes from "prop-types";
import {ingredientTypes} from "../../utils/dataTypes";

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";



import styles from "./BurgerConstructorStyles.module.css";

const BurgerConstructor = ({openModal, burgerInputData}) => {
 // console.log('props in BurgerConstructor', burgerInputData);
  /*разделение на булки и не булки*/
 const bun = burgerInputData.find((item) => item.type === 'bun'); // находим первую попавшуюся булку
 const notBun = burgerInputData.filter((item) => item.type !== 'bun'); // все не булки - массив
 //console.log('bun', bun);
 //console.log('notBun', notBun); 
  
  // для расчета итоговой суммы заказа
 const bunPrice = bun ? (bun.price*2) : 0; //проверяем есть ли данные с сервера в props
 const notBunPrice = notBun ? (notBun.reduce((sum, current) => sum + current.price, 0)) : 0;
 const totalPrice = bunPrice + notBunPrice;

 function onClick() {
   openModal({modalType: "orderDetail"});
 }

  return (
    <section className = {`${styles.main_container} pt-25`}>

      {/* первый элемент, зафиксирован //проверяем есть ли данные с сервера в props */}
      {bun && <div className = {styles.top_container}> 
        <ConstructorElement 
          type = 'top'
          isLocked = {true}
          text = {`${bun.name} (верх)`}
          price = {bun.price}
          thumbnail = {bun.image}
        />       
      </div>}
      {/* элементы начинок */}
      {notBun && <div className = {styles.constructor_container}>
        {notBun.map((el) => (
          <div className = {styles.container_wrapper} key = {el._id}>
            <div className = 'mr-1'>
              <DragIcon type = 'primary' />
            </div>
            <ConstructorElement            
              text = {el.name}
              price = {el.price}
              thumbnail = {el.image}
            />
          </div>
         ))}
      </div>}
{/* послений элемент, зафиксирован */}
        
      {bun && <div className = {styles.bottom_container}>
        <ConstructorElement 
          type = 'bottom'
          isLocked = {true}
          text = {`${bun.name} (верх)`}
          price = {bun.price}
          thumbnail = {bun.image}
        />           
      </div>
}
      <div className = {styles.outcome}>
        <div className = {styles.price}>
          <p className = "text text_type_digits-medium mr-2">           
           {totalPrice}
          </p>
          <CurrencyIcon type = "primary"/>
        </div>
        <Button type = "primary" size = "large" onClick = {onClick}>
          Оформить заказ
        </Button>
      </div>
      </section>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  burgerInputData: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired,
};


/*


При отрисовке массива компонентов нужно всегда указывать уникальный атрибут key в самом верхнем уровне верстки.

Это нужно исправить везде, где отрисовываете массив через map

*/