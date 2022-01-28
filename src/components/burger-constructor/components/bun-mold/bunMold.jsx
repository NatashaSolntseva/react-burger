import styles from "./bunMoldStyles.module.css";
import PropTypes from "prop-types";

const BunMold = ({ children, position }) => {
  return (
    <div
      className={
        position === "top"
          ? `${styles.mold} ${styles.mold_position_top}`
          : position === "bottom"
          ? `${styles.mold} ${styles.mold_position_bottom}`
          : `${styles.mold}`
      }
    >
      {children}
    </div>
  );
};

export default BunMold;

const BunMoldPropTypes = PropTypes.shape({
  podition: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
});

BunMold.propTypes = BunMoldPropTypes.isRequired;
