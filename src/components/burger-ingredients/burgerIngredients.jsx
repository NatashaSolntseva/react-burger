import { useState, useRef, useMemo, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../utils/dataTypes";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "./ingredient-group/ingredientGroup";

import styles from "./burgerIngredientsStyles.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

import { ProductContext } from "../../services/productContext";

function BurgerIngredients({ openModal }) {
  const ingredientContext = useContext(ProductContext);

  // константы для формирования списка игредиентов
  const buns = useMemo(
    () => ingredientContext.filter((ingredient) => ingredient.type === "bun"),
    [ingredientContext]
  );
  const sauces = useMemo(
    () => ingredientContext.filter((ingredient) => ingredient.type === "sauce"),
    [ingredientContext]
  );
  const mains = useMemo(
    () => ingredientContext.filter((ingredient) => ingredient.type === "main"),
    [ingredientContext]
  );

  // реализация функционала скрола
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [currentTab, setCurrentTab] = useState("buns");

  useEffect(() => {
    if (currentTab === "buns") {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (currentTab === "sauses") {
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (currentTab === "mains") {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentTab]);

  return (
    <section className={`${styles.burger_ingredients} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.burger_menu_tab} mt-5 mb-10`}>
        <Tab
          value="buns"
          active={currentTab === "buns"}
          onClick={setCurrentTab}
        >
          Булки
        </Tab>
        <Tab
          value="sauses"
          active={currentTab === "sauses"}
          onClick={setCurrentTab}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={currentTab === "mains"}
          onClick={setCurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.burger_list_container} pt-25`}>
        <li>
          <IngredientGroup
            groupName={"Булки"}
            groupElement={buns}
            ref={bunRef}
            openModal={openModal}
          />
        </li>
        <li>
          <IngredientGroup
            groupName={"Соусы"}
            groupElement={sauces}
            ref={sauceRef}
            openModal={openModal}
          />
        </li>
        <li>
          <IngredientGroup
            groupName={"Начинки"}
            groupElement={mains}
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
