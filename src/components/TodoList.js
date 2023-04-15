import React, { useContext } from "react";
import ListsContext from "../context/Lists";

function ToDoList() {
  const { todos, handleToggleTodo } = useContext(ListsContext);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h2>To Do</h2>
        <hr />
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
