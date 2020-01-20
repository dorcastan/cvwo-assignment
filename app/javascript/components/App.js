import { Router } from '@reach/router';
import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Login from './Login';
import SearchTodos from './SearchTodos';
import Signup from './Signup';
import TodoList from './TodoList';

function App() {
    const [ loggedInStatus, setLoggedInStatus ] = useState(false);
    const [ user, setUser ] = useState({});

    const checkLoggedInStatus = () => {
        const getStatus = async () => {
            const response = await fetch('/logged_in');
            const data = await response.json();
            if (data.logged_in) {
                handleLogin(data);
            } else {
                handleLogout();
            }
        };
        getStatus();
    };

    const handleLogin = (data) => {
        setLoggedInStatus(true);
        setUser(data.user);
    };

    const handleLogout = () => {
        setLoggedInStatus(false);
        setUser({});
    };

    useEffect(checkLoggedInStatus, []);

    return (
        <Router>
            {/* TODO: need to pass loggedInStatus to other components too */}
            <TodoList path='/' />
            <AddTodo path='/add' />
            <SearchTodos path='/search' />
            <Login
                path='/login'
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
                username={user.username}
            />
            <Signup
                path='/signup'
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
                username={user.username}
            />
        </Router>
    );
}

export default App;
