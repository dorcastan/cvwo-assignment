import React from "react";
import { Link } from "@reach/router";
import ShowTodos from "./ShowTodos";

const TodoList = () => (
    <div>
        <h1>Your To-Dos</h1>
        <ShowTodos />
        <Link to="/add">Add a new to-do</Link>
    </div>
);

export default TodoList;
