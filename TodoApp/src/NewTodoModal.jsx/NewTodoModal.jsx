import { useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./NewTodoModal.module.css";

const INITIAL_STATE = {
  name: "",
  description: "",
};

export default function NewTodoModal({ ref, addNewTodo }) {
  const dialog = useRef();
  const [todo, setTodo] = useState(INITIAL_STATE);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const handleOnSubmit = () => {
    addNewTodo(todo);
    handleCloseAndReset();
  };

  const handleCloseAndReset = () => {
    dialog.current.close();
    handleReset();
  };

  const handleReset = () => {
    setTodo(INITIAL_STATE);
  };

  return createPortal(
    <dialog ref={dialog} onClose={handleReset} className={styles.dialog}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Create New Todo</h2>

        <input
          className={styles.input}
          type="text"
          placeholder="Todo Name"
          value={todo.name}
          onChange={(event) =>
            setTodo((prev) => ({ ...prev, name: event.target.value }))
          }
        />

        <textarea
          className={styles.input}
          type="text"
          placeholder="Todo Description"
          value={todo.description}
          onChange={(event) =>
            setTodo((prev) => ({ ...prev, description: event.target.value }))
          }
        />

        <div className={styles.buttonGroup}>
          <button onClick={handleOnSubmit} className={styles.createButton}>
            Create Todo
          </button>
          <button onClick={handleCloseAndReset} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
