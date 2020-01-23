import { Avatar, Box, Button, Grid, Paper, TextField, Tooltip, Typography } from '@material-ui/core';
import { Link as RouterLink, navigate } from '@reach/router';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import HomeButton from './HomeButton';

// Adapted from: https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2
const Login = (props) => {
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = (values) => {
        const postUserDetails = async () => {
            const csrfToken = document.querySelector('meta[name=csrf-token]').content;
            const response = await fetch('/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ user: values })
            });
            const data = await response.json();
            if (data.logged_in) {
                props.handleLogin(data);
                setErrors([]);
                navigate('/');
            } else {
                setErrors(data.errors);
            }
        };
        postUserDetails();
    };

    const hasError = () => errors.length !== 0;

    return (
        <Box border={1} borderRadius='borderRadius'>
            <Paper elevation={1}>
                <Box textAlign='center' bgcolor='primary.main' color='primary.contrastText' pt={2}>
                    <Typography variant='h2' color='inherit'>
                        To Do List
                    </Typography>
                    <Typography variant='h5' component='h3' color='inherit'>
                        Log In
                    </Typography>
                </Box>

                <Box bgcolor='primary.main' color='primary.contrastText' pb={2} px={2}>
                    {props.loggedInStatus &&
                    props.username && (
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Tooltip title={props.username} aria-label={props.username}>
                                    <Avatar>{props.username.charAt(0).toUpperCase()}</Avatar>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Button onClick={props.handleLogout} color='inherit'>
                                    Log Out
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Paper>

            <Box p={2}>
                <HomeButton />
            </Box>

            <Box textAlign='center' mb={3}>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Field
                            as={TextField}
                            type='text'
                            name='username'
                            label='Username'
                            required
                            error={hasError()}
                            helperText={errors[0]}
                            variant='outlined'
                            margin='normal'
                        />
                        <br />
                        <Field
                            as={TextField}
                            type='password'
                            name='password'
                            label='Password'
                            required
                            error={hasError()}
                            helperText={errors[0]}
                            variant='outlined'
                            margin='normal'
                        />

                        <Box m={2}>
                            <Grid container justify='center' alignItems='center' spacing={1}>
                                <Grid item>
                                    <Button type='submit' variant='contained' color='primary'>
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body1' display='inline'>
                                        or
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button component={RouterLink} to='/signup' color='primary'>
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
};

export default Login;
