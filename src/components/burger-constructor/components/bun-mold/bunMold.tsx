import { FC } from "react";
import styles from "./bunMoldStyles.module.css";

import { IBunMold } from "../../../../utils/types";

const BunMold: FC<IBunMold> = ({ children, position }) => {
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
