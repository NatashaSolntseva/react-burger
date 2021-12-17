import React, { Children } from "react";
import { ReactDOM } from "react-dom";
import { createPortal } from "react-dom";

import styles from './modal.module.css';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from './modal-overlay/modalOverlay'
import { isPropertySignature } from "typescript";

const modalRoot = document.getElementById('modal-root');

const Modal = (props) => {
  function onEscPress(evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      props.closeModal();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", onEscPress);
    return () => {
      document.removeEventListener("keydown", onEscPress);
    };
  }, []);
  
  function onOverlayClick() {
    props.closeModal();
  }

  return createPortal(
    <>
    <ModalOverlay onClick = {onOverlayClick}>
      <div className = {styles.modal}>
        <div className = {styles.modal_closebtn}>          
          <CloseIcon type = "primary" onClick = {props.closeModal}/>
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  </>,
  modalRoot     
  );
};

export default Modal;




/*

  return ReactDOM.createPortal (    
      <>
        <div className = {styles.modal}>
          <div>
            <h2>заголовок</h2>
            <CloseIcon />
          </div>
        </div>
      </>,
      modalRoot      
  );
*/