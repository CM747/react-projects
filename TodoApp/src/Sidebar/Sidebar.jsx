import styles from "./Sidebar.module.css";

export default function Sidebar({
  todoList,
  selectedTodoIdx,
  setSelectedTodo,
  handleNewTodo,
}) {
  return (
    <div className={styles.sidebar}>
      <button className={styles.newTodoButton} onClick={handleNewTodo}>
        + New Todo
      </button>
      <ol className={styles.todoList}>
        {todoList.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            <button
              className={`${styles.todoButton} ${
                selectedTodoIdx === index ? styles.active : ""
              }`}
              onClick={() => setSelectedTodo(index)}
            >
              {todo.name}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
