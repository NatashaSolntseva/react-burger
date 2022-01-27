import { useState, useRef, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "./components/ingredient-group/ingredientGroup";

import styles from "./burgerIngredientsStyles.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

//import { ProductContext } from "../../services/productContext";
import { useSelector } from "react-redux";

function BurgerIngredients({ openModal }) {
  const { ingredientsDataFromServer } = useSelector(
    (store) => store.ingredients
  );

  const { droppedIngredients, droppedBun } = useSelector(
    ({ burgerConstructor: { droppedIngredients, droppedBun } }) => {
      return { droppedIngredients, droppedBun };
    }
  );

  // константы для формирования списка игредиентов

  const buns = useMemo(
    () =>
      ingredientsDataFromServer.filter(
        (ingredient) => ingredient.type === "bun"
      ),
    [ingredientsDataFromServer]
  );
  const sauces = useMemo(
    () =>
      ingredientsDataFromServer.filter(
        (ingredient) => ingredient.type === "sauce"
      ),
    [ingredientsDataFromServer]
  );
  const mains = useMemo(
    () =>
      ingredientsDataFromServer.filter(
        (ingredient) => ingredient.type === "main"
      ),
    [ingredientsDataFromServer]
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

  //TODO поправить счетчик когда будет второй DnD массив игредиентов (попрвить сравнение id)
  const ingredientCounter = useMemo(() => {
    return ingredientsDataFromServer.reduce((result, ingredient) => {
      if (ingredient.type === "bun") {
        return {
          ...result,
          [ingredient._id]:
            droppedBun && ingredient._id === droppedBun._id ? 1 : 0,
        };
      }
      return {
        ...result,
        [ingredient._id]: droppedIngredients.filter(
          (droppedIngredient) => droppedIngredient._id === ingredient._id
        ).length,
      };
    }, {});
  }, [ingredientsDataFromServer, droppedIngredients, droppedBun]);

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
            groupElements={buns}
            ref={bunRef}
            openModal={openModal}
            count={ingredientCounter}
          />
        </li>
        <li>
          <IngredientGroup
            groupName={"Соусы"}
            groupElements={sauces}
            ref={sauceRef}
            openModal={openModal}
            count={ingredientCounter}
          />
        </li>
        <li>
          <IngredientGroup
            groupName={"Начинки"}
            groupElements={mains}
            ref={mainRef}
            openModal={openModal}
            count={ingredientCounter}
          />
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;

const BurgerIngredientsPropTypes = PropTypes.shape({
  openModal: PropTypes.func.isRequired,
});

BurgerIngredients.propTypes = BurgerIngredientsPropTypes.isRequired;
