import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const Todo = (props) => {
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.body}</td>
            <td>
                <button onClick={props.handleEdit}>Edit</button>
                <button onClick={props.handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

const ShowTodos = () => {
    const [ todos, setTodos ] = useState([]);

    const updateTodos = () => {
        const requestTodos = async () => {
            const response = await fetch('api/todos');
            const { data } = await response.json();
            setTodos(data.map((todo) => ({ ...todo, isBeingEdited: false })));
        };
        requestTodos();
    };

    useEffect(updateTodos, []);

    function toggleTodoBeingEditedStatus(id) {
        const arrayIndex = todos.findIndex((todo) => todo.id === id);
        const oldTodo = todos[arrayIndex];
        const newTodo = {
            ...oldTodo,
            isBeingEdited: !oldTodo.isBeingEdited
        };
        const newTodos = [ ...todos ]; // make a copy so it will be re-rendered after setTodos
        newTodos.splice(arrayIndex, 1, newTodo);
        setTodos(newTodos);
    }

    function deleteTodo(index) {
        const sendDeleteRequest = async () => {
            const csrfToken = document.querySelector('meta[name=csrf-token]').content;
            const response = await fetch(`/api/todos/${index}`, {
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
                    updateTodos(); // TODO: update state array instead of fetching everything again
                    break;
                // TODO: case 202: // Accepted (action has been queued)
                case 404: // Not Found
                // fallthrough
                default:
                    alert(`To-Do #${index} could not be deleted. Please try again later.`);
                    break;
            }
        };
        sendDeleteRequest();
    }

    function handleSubmit(values) {
        const index = values.id;
        const sendPutRequest = async () => {
            const csrfToken = document.querySelector('meta[name=csrf-token]').content;
            const response = await fetch(`/api/todos/${index}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ data: values })
            });
            switch (response.status) {
                case 200: // OK
                // fallthrough
                case 204: // No Content (i.e. successfully deleted)
                    toggleTodoBeingEditedStatus(index);
                    updateTodos(); // TODO: update state array instead of fetching everything again
                    break;
                // TODO: case 201: // Resource created
                // TODO: case 202: // Accepted (action has been queued)
                case 400: // Bad Request
                // fallthrough
                case 404: // Not Found
                // fallthrough
                default:
                    alert(`To-Do #${index} could not be edited. Please try again later.`);
                    break;
            }
        };
        sendPutRequest();
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(
                    (todo) =>
                        todo.isBeingEdited ? (
                            <EditTodo
                                key={todo.id}
                                id={todo.id}
                                title={todo.attributes.title}
                                body={todo.attributes.body}
                                handleSubmit={(values) => handleSubmit(values)}
                                handleCancel={() => toggleTodoBeingEditedStatus(todo.id)}
                            />
                        ) : (
                            <Todo
                                key={todo.id}
                                title={todo.attributes.title}
                                body={todo.attributes.body}
                                handleEdit={() => toggleTodoBeingEditedStatus(todo.id)}
                                handleDelete={() => deleteTodo(todo.id)}
                            />
                        )
                )}
            </tbody>
        </table>
    );
};

export default ShowTodos;
