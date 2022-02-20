import { FC } from "react";

import styles from "./modalOverlay.module.css";

import { TOverlayCloseModal } from "../../../utils/types";

const ModalOverlay: FC<TOverlayCloseModal> = ({ closeModal, children }) => {
  return (
    <div className={styles.overlay} onClick={closeModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;
