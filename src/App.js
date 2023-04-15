import { useEffect, useContext } from "react";
import ListsContext, { Provider } from "./context/Lists";
import ToDoList from "./components/TodoList";
import DoneList from "./components/DoneList";
import AddTask from "./components/AddTask";
import SearchBox from "./components/SearchBox";
import DeleteAll from "./components/DeleteAll";
import "./App.css";

function App() {
  const { fetchTodos } = useContext(ListsContext);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="app">
      <div className="header">
        <h1>Marvelous 2.0</h1>
        <div className="delete-all-wrapper">
          <DeleteAll />
        </div>
      </div>
      <div className="container">
        <div className="actions">
          <AddTask />
          <div className="search-wrapper">
            <SearchBox />
          </div>
        </div>
        <div className="lists">
          <div className="todo-list-wrapper">
            <ToDoList />
          </div>
          <div className="todo-list-wrapper">
            <DoneList />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

export default AppWrapper;
