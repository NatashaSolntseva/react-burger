import React, { Children } from "react";
import PropTypes from "prop-types";
import { ReactDOM } from "react-dom";
import { createPortal } from "react-dom";

import styles from './modal.module.css';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from './modal-overlay/modalOverlay'
import { isPropertySignature } from "typescript";

const modalRoot = document.getElementById('modal-root');

const Modal = ({closeModal, children}) => {
  function onEscPress(evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeModal();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", onEscPress);
    return () => {
      document.removeEventListener("keydown", onEscPress);
    };
  }, []);
  
  function onOverlayClick(evt) {
    if (evt.target === evt.currentTarget) { // закрытие окна оверлэя по клику, но не по модальному окну
    closeModal();
  }
  }

  return createPortal(
    <>
    <ModalOverlay onClick = {onOverlayClick}>
      <div className = {styles.modal}>
        <div className = {styles.modal_closebtn}>          
          <CloseIcon type = "primary" onClick = {closeModal}/>
        </div>
        {children}
      </div>
    </ModalOverlay>
  </>,
  modalRoot     
  );
};

export default Modal;

const modalPropsTypes = PropTypes.shape({
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
});

Modal.propTypes = modalPropsTypes.isRequired;