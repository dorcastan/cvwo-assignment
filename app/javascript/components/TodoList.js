import { Link } from '@reach/router';
import React, { useEffect, useState } from 'react';
import ShowTodos from './ShowTodos';

const TodoList = () => {
    const [ todos, setTodos ] = useState([]);

    // Updates the to-dos array by pulling from the application API.
    const updateTodos = () => {
        const requestTodos = async () => {
            const response = await fetch('api/todos');
            const { data } = await response.json();
            setTodos(data.map((todo) => ({ ...todo, isBeingEdited: false })));
        };
        requestTodos();
    };

    useEffect(updateTodos, []);

    return (
        <div>
            <h1>To-Dos</h1>
            <ShowTodos todos={todos} setTodos={setTodos} updateTodos={updateTodos} />
            <p>
                <Link to='/add'>Add a new to-do</Link>
            </p>
            <p>
                <Link to='/search'>Search for to-dos</Link>
            </p>
        </div>
    );
};

export default TodoList;
