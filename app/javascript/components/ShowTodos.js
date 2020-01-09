import React from 'react';
import EditTodo from './EditTodo';

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

const ShowTodos = (props) => {
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
                    props.updateTodos(); // TODO: update state array instead of fetching everything again
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
