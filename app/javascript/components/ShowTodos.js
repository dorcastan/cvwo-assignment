import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

const ShowTodos = () => {
    const [todos, setTodos] = useState([]);

    function editTodo(id) {
        const zeroBasedIndex = id - 1;
        navigate(`/${zeroBasedIndex}`);
    }

    function deleteTodo(id) {
        const zeroBasedIndex = id - 1;

        // TODO: figure out how to link to JSON API
        // link to /delete/:TodoId using Reach Router (?)
    }

    useEffect(() => {
        const requestTodos = async () => {
            const response = await fetch("api/todos");
            const { data } = await response.json();
            setTodos(data);
        };
        requestTodos();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    // TODO: make a better key to use
                    <tr key={todo.id}>
                        <td>{todo.attributes.title}</td>
                        <td>{todo.attributes.body}</td>
                        <td>
                            {/* <button onClick={() => editTodo(todo.id)} >
                                Edit
                            </button> */}
                            {/* <button onClick={() => deleteTodo(todo.id)} >
                                Delete
                            </button> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ShowTodos;
