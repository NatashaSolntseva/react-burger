import { FC } from "react";

import styles from "./ingredientPage.module.css";

import IngredientDetails from "../../components/burger-ingredients/components/ingredient-detail/ingredientDetails";

import { IIngredient } from "../../utils/types";

const selected: IIngredient = {
  _id: "60666c42cc7b410027a1a9b5",
  name: "Говяжий метеорит (отбивная)",
  type: "main",
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: "https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
  __v: 0,
};

const IngredientPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <IngredientDetails ingredient={selected} />
    </div>
  );
};

export default IngredientPage;
