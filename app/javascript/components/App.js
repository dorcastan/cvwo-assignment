import { Router } from '@reach/router';
import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

function App() {
    return (
        <Router>
            <TodoList path='/' />
            <AddTodo path='/add' />
        </Router>
    );
}

export default App;
