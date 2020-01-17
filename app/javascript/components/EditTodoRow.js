import { Button, ButtonGroup, Grid, TableCell, TableRow, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';

// Renders a table row that contains a form with fields to edit a to-do's title,
// details, and/or tag.
const EditTodoRow = (props) => {
    // TODO: clean up database - delete Tag if nothing else is pointing to it
    // If original tag id !== new_tag_id, check whether orig_tag_id is linked to other todos
    // If not, destroy original tag

    // Sends HTTP requests with CSRF verification using the given URL, HTTP
    // method, and (optional) payload.
    function sendRequest(url, method, payload) {
        const csrfToken = document.querySelector('meta[name=csrf-token]').content;
        return fetch(url, {
            method: method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'X-CSRF-Token': csrfToken
            },
            body: payload ? JSON.stringify({ data: payload }) : null
        });
    }

    // Sends the given data to the To-Dos API and checks for a successful response.
    async function handleSubmit(values) {
        const index = values.id;

        const putUpdatedTodo = async () => {
            const response = await sendRequest(`/api/todos/${index}`, 'PUT', values);
            switch (response.status) {
                case 200: // OK
                // fallthrough
                case 204: // No Content
                    props.toggleBeingEditedStatus(index);
                    props.refreshTodos(); // TODO: update state array instead of fetching everything again?
                    break;
                // TODO: case 201: // Resource created
                // TODO: case 202: // Accepted (action has been queued)
                case 422: // Unprocessable Entity
                    alert(`To-Do #${index} could not be edited. Did you leave the title blank?`);
                    break;
                case 400: // Bad Request
                // fallthrough
                case 404: // Not Found
                // fallthrough
                default:
                    alert(`To-Do #${index} could not be edited. Please try again later.`);
                    break;
            }
        };

        putUpdatedTodo();
    }

    const initialValues = {
        id: props.id,
        type: 'todos',
        attributes: {
            title: props.title,
            details: props.details,
            tag: props.tag
        }
    };

    const validateTitle = (str) => (str && str.length !== 0 ? undefined : 'Title cannot be empty');
    const validateTagName = (str) =>
        str && str.length !== 0
            ? str.match(/[\W_]/g) ? 'Tag name should only contain alphanumeric characters' : undefined
            : 'Tag cannot be empty';

    return (
        <TableRow>
            <TableCell colSpan='4'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <Grid container spacing={2} justify='space-between'>
                                <Grid item xs>
                                    <Field
                                        as={TextField}
                                        type='text'
                                        name='attributes.title'
                                        placeholder='Title'
                                        validate={validateTitle}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Field
                                        as={TextField}
                                        type='text'
                                        name='attributes.details'
                                        placeholder='Details'
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <Field
                                        as={TextField}
                                        type='text'
                                        name='attributes.tag'
                                        placeholder='Tag'
                                        validate={validateTagName}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <ButtonGroup>
                                        <Button type='submit' color='primary'>
                                            Confirm
                                        </Button>
                                        <Button type='button' onClick={props.toggleBeingEditedStatus}>
                                            Cancel
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>

                            {/* TODO: Use Yup instead of field-level validation */}
                            <div>
                                <ErrorMessage name='attributes.title' />
                                <ErrorMessage name='attributes.tag' />
                            </div>
                        </Form>
                    )}
                </Formik>
            </TableCell>
        </TableRow>
    );
};

export default EditTodoRow;