import React from 'react';
import EditTodo from './EditTodo';

// Renders a table row with details from props. Used in ShowTodos.
const Todo = (props) => {
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.details}</td>
            <td>{props.tag}</td>
            <td>
                <button onClick={props.handleEdit}>Edit</button>
                <button onClick={props.handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

// Renders a table of to-dos. Each table row displays either the to-do information
// or a form to edit the to-do.
const ShowTodos = (props) => {
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

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Tag</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.todos.length ? (
                    props.todos.map(
                        (todo) =>
                            todo.isBeingEdited ? (
                                <EditTodo
                                    key={todo.id}
                                    id={todo.id}
                                    title={todo.attributes.title}
                                    details={todo.attributes.details}
                                    tag={todo.attributes.tag}
                                    toggleBeingEditedStatus={() => toggleTodoBeingEditedStatus(todo.id)}
                                    refreshTodos={props.updateTodos}
                                />
                            ) : (
                                <Todo
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
                    <tr>
                        <td colSpan='4'>No To-Dos were found!</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ShowTodos;
