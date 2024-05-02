import styles from "./Modal.module.scss";

export type ModalProps = {
  isModalOpen: boolean;
  setModalOpen: (param1: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  setModalOpen,
  children,
  className="",
}) => {
  const handleCloseModal = () => {
    setModalOpen(false);
  }
  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.modalContainer}>
      <span className={styles.background} onClick={handleCloseModal} />

      <div className={`${styles.modalContent} ${className}`}>
        {children}
      </div>
    </div>
  )
}