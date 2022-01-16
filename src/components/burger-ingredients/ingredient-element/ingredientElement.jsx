import PropTypes from "prop-types";

import styles from "./ingredientElementStyles.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";

const IngredientElement = ({ id, image, name, price, openModal }) => {
  const handleOpenModal = () => {
    openModal({ modalType: "ingredientDetail", itemId: id });
  };

  return (
    <div className={styles.ingredient_element}>
      <div className={styles.ingredient_content} onClick={handleOpenModal}>
        <img
          alt="Изображение игредиента бургера"
          src={image}
          className={styles.element_img}
        />
        <p className={styles.price}>
          {price}
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{name}</p>
      </div>
      <Counter size="default" count={1} />
    </div>
  );
};

export default IngredientElement;

const IngredientElementPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

IngredientElement.propTypes = IngredientElementPropTypes.isRequired;
