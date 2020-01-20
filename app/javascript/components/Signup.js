import {
    Button,
    ButtonGroup,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    TextField,
    Typography
} from '@material-ui/core';
import { Link as RouterLink } from '@reach/router';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

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
                console.log(data);
                props.handleLogin(data);
                setErrors([]);
                // navigate('/');
            } else {
                setErrors(data.errors);
            }
        };
        postUserDetails();
    };

    return (
        <div>
            <Typography variant='h1'>Sign Up</Typography>

            {props.loggedInStatus ? (
                <div>
                    <Typography variant='body1'>You are logged in as: {props.username}</Typography>
                    <ButtonGroup>
                        <Button component={RouterLink} to='/login'>
                            Log In As Other User
                        </Button>
                        <Button onClick={props.handleLogout}>Log Out</Button>
                    </ButtonGroup>
                </div>
            ) : (
                <Button component={RouterLink} to='/login'>
                    Log In
                </Button>
            )}

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    password_confirmation: ''
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field as={TextField} type='text' name='username' label='Username' />
                    <Field as={TextField} type='password' name='password' label='Password' />
                    <Field as={TextField} type='password' name='password_confirmation' label='Password Confirmation' />
                    <Button type='submit'>Sign Up</Button>
                </Form>
            </Formik>

            {errors.length !== 0 && (
                <List dense>
                    <ListSubheader>Errors: </ListSubheader>
                    {errors.map((errorMessage, id) => (
                        <ListItem key={id}>
                            <ListItemText primary={errorMessage} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default Signup;
