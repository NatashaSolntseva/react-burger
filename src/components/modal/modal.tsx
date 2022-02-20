import { FC } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modalOverlay";
import { TCloseModal } from "../../utils/types";

const Modal: FC<TCloseModal> = ({ closeModal, children }) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const onEscPress = (evt: KeyboardEvent) => {
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

  const onOverlayClick = (evt: any) => {
    if (evt.target === evt.currentTarget) {
      // закрытие окна оверлэя по клику, но не по модальному окну
      closeModal();
    }
  };

  return createPortal(
    <>
      <ModalOverlay closeModal={onOverlayClick}>
        <div className={styles.modal}>
          <div className={styles.modal_closebtn}>
            <CloseIcon type="primary" onClick={closeModal} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot!
  );
};

export default Modal;
