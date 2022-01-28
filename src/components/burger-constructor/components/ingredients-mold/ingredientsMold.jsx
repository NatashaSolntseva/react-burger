import styles from "./ingredientMoldStyles.module.css";
import PropTypes from "prop-types";

const IngredientsMold = ({ children }) => {
  return <div className={`${styles.container}`}>{children}</div>;
};

export default IngredientsMold;

//IngredientsPlug.propTypes = { children: PropTypes.string };