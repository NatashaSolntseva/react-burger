import { forwardRef } from "react";

import styles from "./ingredientGroupStyles.module.css";
import IngredientElementDndWrapper from "../ingredients-dnd-wrapper/ingredient-dnd-wrapper";

import { IIngredient } from "../../../../utils/types";

import { IIngredientsGroup } from "../../../../utils/types";

const IngredientGroup = forwardRef<HTMLParagraphElement, IIngredientsGroup>(
  ({ groupName, groupElements, openModal, count }, ref) => {
    return (
      <div>
        <div className="mt-10 mb-6">
          <p className="text text_type_main-medium" ref={ref}>
            {groupName}
          </p>
        </div>
        <div className={`${styles.content}`}>
          {groupElements.map((burgerItem: IIngredient) => (
            <IngredientElementDndWrapper
              key={burgerItem._id}
              ingredient={burgerItem}
              openModal={openModal}
              count={count[burgerItem._id]}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default IngredientGroup;
