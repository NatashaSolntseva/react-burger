import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./formCaptionStyles.module.css";

import { IFormCaption } from "../../utils/types";

const FormCaption: FC<IFormCaption> = ({ children, linkCaption, link }) => {
  return (
    <p
      className={`text text_type_main-defaut text_color_inactive ${styles.caption}`}
    >
      {`${children}`}
      <Link to={link} className={`text text_type_main-default ${styles.link}`}>
        {linkCaption}
      </Link>
    </p>
  );
};

export default FormCaption;
