import React, { useState, useRef, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../utils/dataTypes";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "./ingredient-group/ingredientGroup";

import styles from "./burgerIngredientsStyles.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

//контекст
import { ProductContext } from "../../services/productContext";

function BurgerIngredients({ openModal }) {
  //контекст
  const ingredientContext = useContext(ProductContext);
  // для формирования списка игредиентов
  const bun = useMemo(
    () => ingredientContext.filter((ingredient) => ingredient.type === "bun"),
    [ingredientContext]
  );
  const sauce = useMemo(
    () => ingredientContext.filter((ingredient) => ingredient.type === "sauce"),
    [ingredientContext]
  );
  const main = useMemo(
    () => ingredientContext.filter((ingredient) => ingredient.type === "main"),
    [ingredientContext]
  );
  //__________________________________________________скрол________________________
  const bunRef = useRef(null); //разметка отрисовывается и ref прицепляется; forwarding ref
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [currentTab, setCurrentTab] = useState("buns");

  function scrollToTab(value) {
    if (value) {
      value.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className={`${styles.burger_ingredients} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.burger_menu_tab} mt-5 mb-10`}>
        <Tab
          value="buns"
          active={currentTab === "buns"}
          onClick={(value) => {
            setCurrentTab(value);
            scrollToTab(bunRef.current);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauses"
          active={currentTab === "sauses"}
          onClick={(value) => {
            setCurrentTab(value);
            scrollToTab(sauceRef.current);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={currentTab === "fillings"}
          onClick={(value) => {
            setCurrentTab(value);
            scrollToTab(mainRef.current);
          }}
        >
          Начинки
        </Tab>
      </div>
      <ul
        className={`${styles.burger_list_container} pt-25`}
        onScroll={(evt) => {
          const scrollPosition = evt.target.scrollTop;
          const positionOfBunTab = bunRef.current.offsetTop;
          const positionOfSauceTab = sauceRef.current.offsetTop;
          const positionOfMainTab = mainRef.current.offsetTop;

          if (scrollPosition + 440 <= positionOfSauceTab) {
            //console.log("scrollPosition", scrollPosition);
            //console.log("positionOfSauceTab", positionOfSauceTab);
            //console.log(" читаем булки");
            setCurrentTab("buns");
          } else if (scrollPosition + 440 <= positionOfMainTab) {
            //console.log("scrollPosition", scrollPosition);
            // console.log("positionOfMainTab", positionOfMainTab);
            // console.log("читаем соусы");
            setCurrentTab("sauses");
          } else {
            // console.log("scrollPosition", scrollPosition);
            // console.log("читаем начинки");
            setCurrentTab("fillings");
          }
        }}
      >
        <li>
          <IngredientGroup
            groupName={"Булки"}
            groupElement={bun}
            ref={bunRef}
            openModal={openModal}
          />
        </li>
        <li>
          <IngredientGroup
            groupName={"Соусы"}
            groupElement={sauce}
            ref={sauceRef}
            openModal={openModal}
          />
        </li>
        <li>
          <IngredientGroup
            groupName={"Начинки"}
            groupElement={main}
            ref={mainRef}
            openModal={openModal}
          />
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;

const BurgerIngredientsPropTypes = PropTypes.shape({
  openModal: PropTypes.func.isRequired,
  ingredientContext: PropTypes.arrayOf(ingredientTypes.isRequired).isRequired,
});

BurgerIngredients.propTypes = BurgerIngredientsPropTypes.isRequired;
