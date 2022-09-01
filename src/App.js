import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "./firebase";
import Todo from "./Todo";

function App() {
  const inputRef = useRef();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsubscribe();
  }, []);

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    const input = inputRef.current.value;

    //validate form
    if (input === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    }
    //add todo
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    //reset form
    inputRef.current.value = "";
  };

  // update todo in firebase
  const todoComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete todo of firebase
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mt-5">
        <h3 className="text-orange-600 text-3xl font-bold text-center p-4">
          Todo App
        </h3>
        <form onSubmit={createTodo} className="flex justify-between mt-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add something to do"
            className="border p-2 w-full text-xl rounded-lg pl-4 shadow-sm shadow-gray-400"
          />

          <button className="p-3 ml-2 bg-sky-500 text-slate-100 rounded-lg shadow-sm shadow-sky-900 hover:scale-95 ease-in duration-100">
            <AiOutlinePlus size="30" />
          </button>
        </form>
        {error ? (
          <p className="uppercase bg-red-600 mt-2 text-center text-sm text-white p-2">
            enter something to do
          </p>
        ) : null}
        <ul className="pt-2">
          {todos.map((todo, index) => (
            <Todo
              todo={todo}
              todoComplete={todoComplete}
              deleteTodo={deleteTodo}
              key={index}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className="text-center p-2">{`You have ${todos.length} todo's`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
