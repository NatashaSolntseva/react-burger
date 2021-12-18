import React, { Children } from "react";
import PropTypes from "prop-types";
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

const modalOverlayPropsTypes = PropTypes.shape({
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
});

ModalOverlay.propTypes = modalOverlayPropsTypes.isRequired;