import { FC } from "react";

import styles from "./ingredientPage.module.css";

import IngredientDetails from "../../components/burger-ingredients/components/ingredient-detail/ingredientDetails";

import { IIngredient } from "../../utils/types";
import { useAppSelector } from "../../services/hooks/hooks";

const IngredientPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
