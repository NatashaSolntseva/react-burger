import { FC } from "react";
import styles from "./ingredientMoldStyles.module.css";

import { IIngredientsMold } from "../../../../utils/types";

const IngredientsMold: FC<IIngredientsMold> = ({ children }) => {
  return <div className={`${styles.container}`}>{children}</div>;
};

export default IngredientsMold;
