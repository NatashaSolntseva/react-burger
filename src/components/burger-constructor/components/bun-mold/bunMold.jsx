import styles from "./bunMoldStyles.module.css";

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
