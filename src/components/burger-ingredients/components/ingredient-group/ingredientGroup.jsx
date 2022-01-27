import { forwardRef } from "react";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../../../utils/dataTypes";

import styles from "./ingredientGroupStyles.module.css";
import IngredientElementDndWrapper from "../ingredients-dnd-wrapper/ingredient-dnd-wrapper";

const IngredientGroup = forwardRef(
  ({ groupName, groupElements, openModal, count }, ref) => {
    return (
      <div>
        <div className="mt-10 mb-6">
          <p className="text text_type_main-medium" ref={ref}>
            {groupName}
          </p>
        </div>
        <div className={`${styles.content}`}>
          {groupElements.map((burgerItem) => (
            <IngredientElementDndWrapper
              key={burgerItem._id}
              burgerItem={burgerItem}
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

IngredientGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
};

const IngredientGroupPropTypes = PropTypes.shape({
  groupName: PropTypes.string.isRequired,
  groupElement: ingredientTypes,
  openModal: PropTypes.func.isRequired,
});

IngredientGroup.propTypes = IngredientGroupPropTypes.isRequired;
