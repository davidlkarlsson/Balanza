import React from "react";
import ReactDOM from "react-dom";
import styles from "~/components/modal/modal.module.css";



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement // 👈 modalen skickas till root.tsx för att hamna överst i!
    );
};


export default Modal;
