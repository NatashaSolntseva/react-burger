import { FC } from "react";
import styles from "./formInputWrapperStyles.module.css";

const FormInputWrapper: FC = ({ children }) => {
  return <div className={`mb-6 ${styles.formwrapper}`}>{children}</div>;
};

export default FormInputWrapper;
