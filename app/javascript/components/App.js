import { Router } from '@reach/router';
import React from 'react';
import AddTodo from './AddTodo';
import SearchTodos from './SearchTodos';
import TodoList from './TodoList';

function App() {
    return (
        <Router>
            <TodoList path='/' />
            <AddTodo path='/add' />
            <SearchTodos path='/search' />
        </Router>
    );
}

export default App;
