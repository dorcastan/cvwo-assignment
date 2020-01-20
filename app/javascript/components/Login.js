import { Button, TextField, Typography } from '@material-ui/core';
import { Link as RouterLink } from '@reach/router';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

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
                // navigate('/');
            } else {
                setErrors(data.errors);
            }
        };
        postUserDetails();
    };

    return (
        <div>
            <Typography variant='h1'>Log In</Typography>

            {props.loggedInStatus ? (
                <div>
                    <Typography variant='body1'>You are logged in as: {props.username}</Typography>
                    <Button onClick={props.handleLogout}>Log Out</Button>
                </div>
            ) : (
                <Button component={RouterLink} to='/signup'>
                    Sign Up
                </Button>
            )}

            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field as={TextField} type='text' name='username' label='Username' />
                    <Field as={TextField} type='password' name='password' label='Password' />
                    <Button type='submit'>Login</Button>
                </Form>
            </Formik>

            {errors.length !== 0 && <Typography variant='body1'>Error: {errors[0]}</Typography>}
        </div>
    );
};

export default Login;
