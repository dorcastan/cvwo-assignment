import { Box, Container, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AppHeader from './AppHeader';
import TodosTable from './TodosTable';

const TodoList = (props) => {
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
        <Container>
            <AppHeader
                handleLogout={props.handleLogout}
                loggedInStatus={props.loggedInStatus}
                username={props.username}
            />

            <Typography variant='h3'>Home</Typography>

            <Box my={2}>
                <Paper elevation={1}>
                    <TodosTable todos={todos} setTodos={setTodos} updateTodos={updateTodos} />
                </Paper>
            </Box>
        </Container>
    );
};

export default TodoList;
