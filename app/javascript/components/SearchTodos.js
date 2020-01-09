import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import ShowTodos from './ShowTodos';

const SearchTodos = () => {
    const [ todos, setTodos ] = useState([]);
    const [ searchString, setSearchString ] = useState('');

    const updateTodos = () => {
        const requestTodos = async () => {
            const response = await fetch(`api/todos/${searchString}`);
            const { data } = await response.json();
            setTodos(data.map((todo) => ({ ...todo, isBeingEdited: false })));
        };
        requestTodos();
    };

    useEffect(updateTodos, [ searchString ]);

    function findTodos(values) {
        setSearchString(`?filter[${values.type}]=${values.query}`);
    }

    function showAllTodos() {
        setSearchString('');
    }

    return (
        <div>
            <h2>Search Your To-Dos</h2>
            <Formik
                initialValues={{
                    query: 'Enter search query',
                    type: 'title'
                }}
                onSubmit={findTodos}
            >
                <Form>
                    <div>
                        <Field type='search' name='query' />
                        <button type='submit'>Search</button>
                    </div>
                    <div>
                        <Field type='radio' name='type' id='title' value='title' />
                        <label htmlFor='title'>Title</label>
                        <Field type='radio' name='type' id='details' value='details' />
                        <label htmlFor='details'>Details</label>
                        {/* <Field type='radio' name='type' id='tag' value='tag' />
                        <label htmlFor='tag'>Tag</label> */}
                    </div>
                </Form>
            </Formik>

            <ShowTodos todos={todos} setTodos={setTodos} updateTodos={updateTodos} query={searchString} />

            <div>
                <button onClick={showAllTodos}>Show all</button>
            </div>
        </div>
    );
};

export default SearchTodos;
