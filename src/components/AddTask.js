import React, { useState, useContext } from "react";
import ListsContext from "../context/Lists";

const AddTask = () => {
  const [task, setTask] = useState("");
  const { addTodo } = useContext(ListsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      // check if task is not empty
      addTodo(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTask;
