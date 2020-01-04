import { Link } from '@reach/router';
import React from 'react';
import ShowTodos from './ShowTodos';

const TodoList = () => (
    <div>
        <h1>To-Dos</h1>
        <ShowTodos />
        <Link to='/add'>Add a new to-do</Link>
    </div>
);

export default TodoList;
