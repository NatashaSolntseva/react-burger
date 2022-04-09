import { FC } from "react";

import styles from "./ingredientDetails.module.css";

import { useAppSelector } from "../../../../services/hooks/hooks";

const IngredientDetails: FC = () => {
  let ingredient = useAppSelector((store) => store.modal.modalIngredientData);

  return (
    <div className={`${styles.container} p-10`}>
      <p className={`${styles.header} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img
        className={`${styles.icon}`}
        alt="изображение ингредиента"
        src={ingredient?.image}
      />
      <p className="text text_type_main-medium">{ingredient?.name}</p>
      <div className={`${styles.captioncontainer} mt-8 text_color_inactive`}>
        <div className={`${styles.element} mr-5`}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">
            {ingredient?.calories}
          </p>
        </div>
        <div className={`${styles.element} mr-5`}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">
            {ingredient?.proteins}
          </p>
        </div>
        <div className={`${styles.element} mr-5`}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient?.fat}</p>
        </div>
        <div className={`${styles.element} mr-5`}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">
            {ingredient?.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
