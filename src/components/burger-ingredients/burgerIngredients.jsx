import { useState, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "./components/ingredient-group/ingredientGroup";

import styles from "./burgerIngredientsStyles.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

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

  const handleTabClick = useCallback(
    ({ tab, ref }) =>
      () => {
        setCurrentTab(tab);
        ref.current.scrollIntoView({ behavior: "smooth" });
      },
    [setCurrentTab]
  );

  const handleIngredientListScroll = (event) => {
    const scrollContainer = event.target;
    const scrollPosition = scrollContainer.scrollTop;
    const sauceTabPosition = sauceRef.current.offsetTop;
    const mainTabPosition = mainRef.current.offsetTop;
    const scrollSetup = 400;
    if (scrollPosition + scrollSetup <= sauceTabPosition) {
      setCurrentTab("buns");
    } else if (scrollPosition + scrollSetup <= mainTabPosition) {
      setCurrentTab("sauses");
    } else {
      setCurrentTab("mains");
    }
  };
  // счетчик игредиентов при перетаскивании
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
          onClick={handleTabClick({
            tab: currentTab,
            ref: bunRef,
          })}
        >
          Булки
        </Tab>
        <Tab
          value="sauses"
          active={currentTab === "sauses"}
          onClick={handleTabClick({
            tab: currentTab,
            ref: sauceRef,
          })}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={currentTab === "mains"}
          onClick={handleTabClick({
            tab: currentTab,
            ref: mainRef,
          })}
        >
          Начинки
        </Tab>
      </div>
      <ul
        className={`${styles.burger_list_container} pt-25`}
        onScroll={handleIngredientListScroll}
      >
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
