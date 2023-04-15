import React, { useContext } from "react";
import ListsContext from "../context/Lists";

const DeleteAll = () => {
  const { handleDeleteAllTasks } = useContext(ListsContext);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      handleDeleteAllTasks();
    }
  };

  return (
    <div className="DeleteAll">
      <a href="#" onClick={handleDelete}>
        Delete all tasks
      </a>
    </div>
  );
};

export default DeleteAll;
