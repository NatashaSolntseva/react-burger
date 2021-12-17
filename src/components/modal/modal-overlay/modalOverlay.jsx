import React, { Children } from "react";
import { isPropertySignature } from "typescript";

import styles from './modalOverlay.module.css'

const ModalOverlay = ({children, onClick}) => {

  return (
    <div className = {styles.overlay} onClick = {onClick}>
      {children}
    </div>
  );
}

export default ModalOverlay;