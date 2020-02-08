import { Box, Container, Link, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AppHeader from './AppHeader';
import TodosTable from './TodosTable';
import Welcome from './Welcome';

const TodoListHome = (props) => {
    const [ todos, setTodos ] = useState([]);

    // Updates the to-dos array by pulling from the application API.
    const updateTodos = () => {
        const requestTodos = async () => {
            const response = await fetch(`api/todos?filter[user_id]=${props.userId}`);
            const { data } = await response.json();
            setTodos(data.map((todo) => ({ ...todo, isBeingEdited: false })));
        };
        requestTodos();
    };

    useEffect(updateTodos, [ props.userId ]);

    return (
        <Container>
            <AppHeader
                handleLogout={props.handleLogout}
                loggedInStatus={props.loggedInStatus}
                username={props.username}
            />

            <Typography variant='h3'>Home</Typography>

            {props.loggedInStatus ? (
                <Box my={2}>
                    <Typography variant='body1' component='div' paragraph>
                        Welcome,{' '}
                        <Typography display='inline' color='primary'>
                            {props.username}
                        </Typography>! Here are your tasks:
                    </Typography>

                    <Paper elevation={1}>
                        <TodosTable todos={todos} setTodos={setTodos} updateTodos={updateTodos} />
                    </Paper>

                    <Box py={2}>
                        <Typography component='div' variant='body2'>
                            A user guide is available at{' '}
                            <Link href='https://dorcastan.github.io/cvwo-assignment/#user-guide'>this link.</Link> If
                            you have other difficulties, you can also file a report in the{' '}
                            <Link href='https://github.com/dorcastan/cvwo-assignment/issues'>issue tracker</Link> on
                            GitHub.
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Welcome />
            )}
        </Container>
    );
};

export default TodoListHome;
