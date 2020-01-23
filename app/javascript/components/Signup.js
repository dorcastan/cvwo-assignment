import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core';
import { Link as RouterLink, navigate } from '@reach/router';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import HomeButton from './HomeButton';

const ErrorDialog = (props) => (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby='error-dialog-title'>
        <DialogTitle id='error-dialog-title'>Errors</DialogTitle>
        <List>
            {props.errors.map((errorMessage, id) => (
                <ListItem key={id}>
                    <ListItemText primary={errorMessage} color='' />
                </ListItem>
            ))}
        </List>
    </Dialog>
);

// Adapted from: https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2
const Signup = (props) => {
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = (values) => {
        const postUserDetails = async () => {
            const csrfToken = document.querySelector('meta[name=csrf-token]').content;
            const response = await fetch('/users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ user: values })
            });
            const data = await response.json();
            if (data.status === 200) {
                props.handleLogin(data);
                setErrors([]);
                navigate('/');
            } else {
                setErrors(data.errors);
            }
        };
        postUserDetails();
    };

    const open = errors.length !== 0;
    const handleClose = () => {
        setErrors([]);
    };

    return (
        <Box border={1} borderRadius='borderRadius'>
            <Paper elevation={1}>
                <Box textAlign='center' bgcolor='primary.main' color='primary.contrastText' pt={2}>
                    <Typography variant='h2' color='inherit'>
                        To Do List
                    </Typography>
                    <Typography variant='h5' component='h3' color='inherit'>
                        Sign Up
                    </Typography>
                </Box>

                <Box bgcolor='primary.main' color='primary.contrastText' pb={2} px={2}>
                    {props.loggedInStatus &&
                    props.username && (
                        <Grid container justify='flex-end' spacing={1}>
                            <Grid item>
                                <Tooltip title={props.username} aria-label={props.username}>
                                    <Avatar>{props.username.charAt(0).toUpperCase()}</Avatar>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <ButtonGroup>
                                    <Button component={RouterLink} to='/login' color='inherit'>
                                        Log In As Other User
                                    </Button>
                                    <Button onClick={props.handleLogout} color='inherit'>
                                        Log Out
                                    </Button>
                                </ButtonGroup>{' '}
                            </Grid>
                        </Grid>
                    )}
                </Box>

                <Box p={2}>
                    <HomeButton />
                </Box>

                <Box m={2}>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            password_confirmation: ''
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Grid container direction='column' alignItems='center' spacing={3}>
                                <Grid item>
                                    <Field
                                        as={TextField}
                                        type='text'
                                        name='username'
                                        label='Username'
                                        required
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item>
                                    <Field
                                        as={TextField}
                                        type='password'
                                        name='password'
                                        label='Password'
                                        required
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item>
                                    <Field
                                        as={TextField}
                                        type='password'
                                        name='password_confirmation'
                                        label='Password Confirmation'
                                        required
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid container item justify='center' alignItems='center' spacing={1}>
                                    <Grid item>
                                        <Button type='submit' variant='contained' color='primary'>
                                            Sign Up
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1' display='inline'>
                                            or
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button component={RouterLink} to='/login' color='primary'>
                                            Log In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>

                    <ErrorDialog open={open} handleClose={handleClose} errors={errors} />
                </Box>
            </Paper>
        </Box>
    );
};

export default Signup;
