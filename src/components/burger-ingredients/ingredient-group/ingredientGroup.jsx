import React from "react";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../../utils/dataTypes";

import styles from "./ingredientGroupStyles.module.css";
import IngredientElement from "../ingredient-element/ingredientElement";

const IngredientGroup = React.forwardRef(
  ({ groupName, groupElement, openModal }, ref) => {
    return (
      <div>
        <div className="mt-10 mb-6">
          <p className="text text_type_main-medium" ref={ref}>
            {groupName}
          </p>
        </div>
        <div className={`${styles.content}`}>
          {groupElement.map((burgerItem) => (
            <IngredientElement
              key={burgerItem._id}
              id={burgerItem._id}
              image={burgerItem.image}
              name={burgerItem.name}
              price={burgerItem.price}
              openModal={openModal}
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
