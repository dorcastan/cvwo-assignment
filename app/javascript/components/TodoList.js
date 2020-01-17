import { Button, Container, Paper, Typography } from '@material-ui/core';
import { Link as RouterLink } from '@reach/router';
import React, { useEffect, useState } from 'react';
import TodosTable from './TodosTable';

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
        <Container>
            <Typography variant='h2' component='h1'>
                To-Dos
            </Typography>

            <Button component={RouterLink} to='/add' variant='contained' color='primary'>
                Add a new to-do
            </Button>
            <Button component={RouterLink} to='/search' variant='contained' color='secondary'>
                Search for to-dos
            </Button>

            <Paper>
                <TodosTable todos={todos} setTodos={setTodos} updateTodos={updateTodos} />
            </Paper>
        </Container>
    );
};

export default TodoList;
