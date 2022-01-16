import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modalOverlay";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const onEscPress = (evt) => {
      if (evt.key === "Escape") {
        evt.preventDefault();
        closeModal();
      }
    };
    document.addEventListener("keydown", onEscPress);
    return () => {
      document.removeEventListener("keydown", onEscPress);
    };
  }, [closeModal]);

  const onOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      // закрытие окна оверлэя по клику, но не по модальному окну
      closeModal();
    }
  };

  return createPortal(
    <>
      <ModalOverlay onClick={onOverlayClick}>
        <div className={styles.modal}>
          <div className={styles.modal_closebtn}>
            <CloseIcon type="primary" onClick={closeModal} />
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
