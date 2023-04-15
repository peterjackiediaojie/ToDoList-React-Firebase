import { createContext, useState, useCallback } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  writeBatch,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";

const ListsContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const collectionRef = collection(db, "todo");
      const snapshot = await getDocs(collectionRef);
      const array = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const newTasks = array
        .filter((todo) => !todo.done)
        .sort((a, b) => a.text.localeCompare(b.text));
      const newDoneTasks = array
        .filter((todo) => todo.done)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)
        .sort((a, b) => a.text.localeCompare(b.text));
      setTodos(newTasks);
      setDones(newDoneTasks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Add a new todo task
  const addTodo = async (text) => {
    try {
      const existingTodo = todos.find((todo) => todo.text === text);
      if (existingTodo) {
        const result = window.confirm(
          "This thing already exists. Do you want to add it again?"
        );
        if (!result) {
          return;
        }
      }

      const collectionRef = collection(db, "todo");
      const docRef = await addDoc(collectionRef, {
        text,
        done: false,
        date: new Date(),
      });
      const newTodo = { text, done: false, date: new Date(), id: docRef.id };
      const updatedTodos = [...todos, newTodo].sort((a, b) =>
        a.text.localeCompare(b.text)
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const updatedDones = todos.find((todo) => todo.id === id);

    try {
      const todoRef = doc(db, "todo", id);
      await updateDoc(todoRef, { done: true });

      setTodos(updatedTodos);
      setDones((dones) => {
        const newDones = [updatedDones, ...dones];
        return newDones
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)
          .sort((a, b) => a.text.localeCompare(b.text));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleDone = async (id) => {
    const updatedDones = dones.filter((done) => done.id !== id);
    try {
      const todoRef = doc(db, "todo", id);
      await updateDoc(todoRef, { done: false });

      const updatedTodo = await getDoc(todoRef);
      const newTodo = { ...updatedTodo.data(), id: updatedTodo.id };
      setTodos((todos) =>
        [newTodo, ...todos].sort((a, b) => a.text.localeCompare(b.text))
      );

      setDones((dones) => {
        return updatedDones
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)
          .sort((a, b) => a.text.localeCompare(b.text));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm || searchTerm === "") {
      // if the search term is empty or null, display the original lists
      fetchTodos();
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filteredDones = dones
        .filter((done) =>
          done.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);

      setTodos(filteredTodos);
      setDones(filteredDones);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      const collectionRef = collection(db, "todo");
      const snapshot = await getDocs(collectionRef);
      const batch = writeBatch(db);

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      setTodos([]);
      setDones([]);
    } catch (error) {
      console.log(error);
    }
  };

  const valueToshare = {
    todos,
    dones,
    fetchTodos,
    addTodo,
    handleToggleTodo,
    handleToggleDone,
    handleSearch,
    handleDeleteAllTasks,
  };
  return (
    <ListsContext.Provider value={valueToshare}>
      {children}
    </ListsContext.Provider>
  );
}

export { Provider };
export default ListsContext;
