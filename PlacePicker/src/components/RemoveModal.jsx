import { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import styles from "./RemoveModal.module.css";

export default function RemoveModal({ isOpen, onConfirm, onCancel, timeout }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
      const timer = setTimeout(() => {
        onConfirm();
      }, timeout);

      return () => {
        clearTimeout(timer);
        console.log("CLEARED TIMEOUT");
      };
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  function handleOnCancel() {
    onCancel();
  }

  function handleOnRemove() {
    onConfirm();
  }

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <div className={styles.title}>Are You Sure?</div>
      {isOpen && <ProgressBar timer={timeout} />}
      <div className={styles.buttonGroup}>
        <button
          className={styles.confirmButton}
          onClick={handleOnRemove}
        >
          Yes Remove
        </button>
        <button
          className={styles.cancelButton}
          onClick={handleOnCancel}
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
