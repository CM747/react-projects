import { useState } from "react";
import styles from "./TodoTasks.module.css";

export default function TodoTasks({ todo, deleteTodo, addTask, deleteTask }) {
  const [taskDesc, setTaskDesc] = useState("");

  const handleNewTask = () => {
    addTask(taskDesc);
    setTaskDesc("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.metadata}>
        <div className={styles.header}>
          <h2 className={styles.title}>{todo.name}</h2>
          <button className={styles.deleteTodoButton} onClick={deleteTodo}>
            Delete Todo
          </button>
        </div>

        <p className={styles.description}>{todo.description}</p>
      </div>

      <div className={styles.tasksContainer}>
        <div className={styles.newTask}>
          <input
            type="text"
            placeholder="Task description"
            value={taskDesc}
            onChange={(event) => setTaskDesc(event.target.value)}
            className={styles.input}
          />
          <button className={styles.addTaskButton} onClick={handleNewTask}>
            Add Task
          </button>
        </div>

        <ul className={styles.taskList}>
          {todo.tasks.map((task, index) => (
            <li key={index} className={styles.taskItem}>
              <p className={styles.taskText}>{task}</p>
              <button
                className={styles.deleteTaskButton}
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
