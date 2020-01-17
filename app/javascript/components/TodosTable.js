import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import React from 'react';
import EditTodoRow from './EditTodoRow';

// Renders a table row with details from props. Used in TodosTable.
const TodoRow = (props) => {
    return (
        <TableRow>
            <TableCell>{props.title}</TableCell>
            <TableCell>{props.details}</TableCell>
            <TableCell>{props.tag}</TableCell>
            <TableCell>
                <ButtonGroup size='small'>
                    <Button onClick={props.handleEdit} color='primary' startIcon={<EditOutlined />}>
                        Edit
                    </Button>
                    <Button onClick={props.handleDelete} color='secondary' startIcon={<DeleteOutlined />}>
                        Delete
                    </Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    );
};

// Renders a table of to-dos. Each table row displays either the to-do information
// or a form to edit the to-do.
const TodosTable = (props) => {
    // Toggles the isBeingEdited property of the todo with the given id.
    function toggleTodoBeingEditedStatus(id) {
        const todos = props.todos;
        const arrayIndex = todos.findIndex((todo) => todo.id === id);
        const oldTodo = todos[arrayIndex];
        const newTodo = {
            ...oldTodo,
            isBeingEdited: !oldTodo.isBeingEdited
        };
        const newTodos = [ ...todos ]; // make a copy so it will be re-rendered after setTodos
        newTodos.splice(arrayIndex, 1, newTodo);
        props.setTodos(newTodos);
    }

    // Sends a request to the API to delete the specified to-do.
    function deleteTodo(id) {
        const sendDeleteRequest = async () => {
            const csrfToken = document.querySelector('meta[name=csrf-token]').content;
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'X-CSRF-Token': csrfToken
                }
            });
            switch (response.status) {
                case 200: // OK
                // fallthrough
                case 204: // No Content (i.e. successfully deleted)
                    props.updateTodos();
                    break;
                // TODO: case 202: // Accepted (action has been queued)
                case 404: // Not Found
                // fallthrough
                default:
                    alert(`To-Do #${id} could not be deleted. Please try again later.`);
                    break;
            }
        };
        sendDeleteRequest();
    }

    const tableHeaders = [ 'Title', 'Details', 'Tag', 'Actions' ];

    return (
        <Table>
            <TableHead>
                <TableRow color='primary'>
                    {tableHeaders.map((header, id) => (
                        <TableCell key={id}>
                            <Typography variant='subtitle1'>{header}</Typography>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.todos.length ? (
                    props.todos.map(
                        (todo) =>
                            todo.isBeingEdited ? (
                                <EditTodoRow
                                    key={todo.id}
                                    id={todo.id}
                                    title={todo.attributes.title}
                                    details={todo.attributes.details}
                                    tag={todo.attributes.tag}
                                    toggleBeingEditedStatus={() => toggleTodoBeingEditedStatus(todo.id)}
                                    refreshTodos={props.updateTodos}
                                />
                            ) : (
                                <TodoRow
                                    key={todo.id}
                                    title={todo.attributes.title}
                                    details={todo.attributes.details}
                                    tag={todo.attributes.tag}
                                    handleEdit={() => toggleTodoBeingEditedStatus(todo.id)}
                                    handleDelete={() => deleteTodo(todo.id)}
                                />
                            )
                    )
                ) : (
                    <TableRow>
                        <TableCell colSpan='4'>No To-Dos were found!</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default TodosTable;
