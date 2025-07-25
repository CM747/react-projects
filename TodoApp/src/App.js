import { useRef, useState } from "react";
import NewTodoModal from "./NewTodoModal.jsx/NewTodoModal";
import Sidebar from "./Sidebar/Sidebar";
import "./styles.css";
import TodoTasks from "./TodoTasks/TodoTasks";

export default function App() {
  const newTodoModalRef = useRef();
  const [todoList, setTodoList] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(-1);

  const addNewTodo = (todo) => {
    setTodoList((prev) => [
      ...prev,
      {
        name: todo.name,
        description: todo.description,
        tasks: [],
      },
    ]);
  };

  const copyTodoList = (todoListToCopy) => {
    let newList = [];
    todoListToCopy.forEach((prevTodo) => {
      newList.push({ ...prevTodo, tasks: [...prevTodo.tasks] });
    });
    return newList;
  };

  const handleDeleteTodo = () => {
    setTodoList((prev) => {
      let newList = [...prev];
      newList.splice(selectedTodo, 1);
      return newList;
    });
    setSelectedTodo(-1);
  };

  const handleAddTask = (description) => {
    setTodoList((prevList) => {
      let newList = copyTodoList(prevList);
      newList[selectedTodo].tasks.push(description);
      return newList;
    });
  };

  const handleDeleteTask = (taskIndex) => {
    setTodoList((prev) => {
      let newList = copyTodoList(prev);
      newList[selectedTodo].tasks.splice(taskIndex, 1);
      return newList;
    });
  };

  const handleNewTodo = () => {
    newTodoModalRef.current.open();
  };

  return (
    <div className="App">
      <div className="appHeader">My Todo App</div>
      <NewTodoModal ref={newTodoModalRef} addNewTodo={addNewTodo} />
      <div className="mainLayout">
        <Sidebar
          todoList={todoList}
          selectedTodoIdx={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          handleNewTodo={handleNewTodo}
        />
        <div className="content">
          {selectedTodo !== -1 ? (
            <TodoTasks
              todo={todoList[selectedTodo]}
              deleteTodo={handleDeleteTodo}
              addTask={handleAddTask}
              deleteTask={handleDeleteTask}
            />
          ) : (
            <div className="emptyState">
              <p>No todo is selected.</p>
              <p>Select a todo or create a new todo.</p>
              <button onClick={handleNewTodo} className="primaryButton">
                Create New Todo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
