//import { useSelector, useDispatch } from "react-redux";
import { forwardRef, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burgerConstructorDndStyles.module.css";

import IngredientsMold from "./components/ingredients-mold/ingredientsMold";
import BunMold from "./components/bun-mold/bunMold";
import BurgerConstructorElementDndWrapper from "./components/burger-constructor-element-dnd-wrapper/burgerConstructorElementDndWrapper";

import { getOrderNumberApi } from "../../services/actions/orderActions";
import { deleteIngredient } from "../../services/actions/constructorActions";

import { IBurgerConstructor } from "../../utils/types";

import { IIngredient } from "../../utils/types";
import { useHistory } from "react-router-dom";

const BurgerConstructorDnd = forwardRef<HTMLUListElement, IBurgerConstructor>(
  ({ openModal }, ref) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { userIsAuth } = useAppSelector((store) => store.user);

    const { droppedIngredients, droppedBun } = useAppSelector(
      (store) => store.burgerConstructor
    );

    const totalPrice = useMemo(
      () =>
        droppedIngredients.reduce(
          (price: number, ingredient: IIngredient) => price + ingredient.price,
          droppedBun ? droppedBun.price * 2 : 0
        ),
      [droppedIngredients, droppedBun]
    );

    const handleSubmit = () => {
      if (!droppedBun) {
        alert("Вы не выбрали булочку!"); //TODO что-то более красивое
        return;
      } else {
        const constructorIngredients = droppedIngredients.concat(droppedBun);
        const orderIngredientList = constructorIngredients.map(
          (el: IIngredient) => el._id
        );
        dispatch(getOrderNumberApi(orderIngredientList));
        openModal({ modalType: "orderDetail" });
      }
    };

    const handleDeleteIngredient = useCallback(
      (indexToDelete) => {
        console.log("delete");
        dispatch(deleteIngredient(indexToDelete));
      },
      [dispatch]
    );

    const handleSignIn = useCallback(() => {
      history.replace({ pathname: "/login" });
    }, [history]);

    return (
      <section
        className={`${styles.main_container} pt-25`}
        ari-label="Конструктор бургеров"
      >
        <ul className={styles.ingredients_list} ref={ref}>
          <li className={`${styles.ingredient} ${styles.top_container}`}>
            {!droppedBun ? (
              <BunMold position="top">Перетащи себе булочку</BunMold>
            ) : (
              <ConstructorElement
                type="top"
                isLocked
                text={`${droppedBun.name} (верх)`}
                price={droppedBun.price}
                thumbnail={droppedBun.image}
              />
            )}
          </li>
          <li className={styles.ingredient}>
            {droppedIngredients.length === 0 ? (
              <IngredientsMold>Добавь начинку и соус</IngredientsMold>
            ) : (
              <ul className={styles.constructor_container}>
                {droppedIngredients
                  ? droppedIngredients.map(
                      (ingredient: IIngredient, index: number) => {
                        return (
                          <BurgerConstructorElementDndWrapper
                            ingredient={ingredient}
                            key={ingredient.uid}
                            index={index}
                            handleDeleteIngredient={handleDeleteIngredient}
                          />
                        );
                      }
                    )
                  : null}
              </ul>
            )}
          </li>
          <li className={`${styles.ingredient} ${styles.bottom_container}`}>
            {!droppedBun ? (
              <BunMold position="bottom">Перетащи себе булочку</BunMold>
            ) : (
              <ConstructorElement
                type="bottom"
                isLocked
                text={`${droppedBun.name} (низ)`}
                price={droppedBun.price}
                thumbnail={droppedBun.image}
              />
            )}
          </li>
        </ul>
        <div className={styles.outcome}>
          <div className={styles.price}>
            <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={userIsAuth ? handleSubmit : handleSignIn}
          >
            {userIsAuth ? "Оформить заказ" : "Войти"}
          </Button>
        </div>
      </section>
    );
  }
);

export default BurgerConstructorDnd;
