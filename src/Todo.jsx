import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Todo = ({ todo, todoComplete, deleteTodo }) => {
  return (
    <li
      className={`flex justify-between  p-4 my-2 capitalize rounded-lg  ${
        todo.completed ? "bg-sky-200" : "bg-sky-300"
      }`}
    >
      <div
        //   onClick={() => todoComplete(todo)}
        className="flex items-center"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => todoComplete(todo)}
          className="cursor-pointer"
        />
        <p
          //   onClick={() => todoComplete(todo)}
          className={`ml-2 ${todo.completed ? "line-through" : ""}`}
        >
          {todo.text}
        </p>
      </div>
      <button
        className="cursor-pointer flex items-center"
        onClick={() => deleteTodo(todo.id)}
      >
        {<FaRegTrashAlt />}
      </button>
    </li>
  );
};

export default Todo;
