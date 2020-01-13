import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import ShowTodos from './ShowTodos';

const SearchTodos = () => {
    const [ todos, setTodos ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ searchString, setSearchString ] = useState('');

    // Updates to-dos and tags by pulling from the application API.
    // Tag names are saved as lower-case.
    const updateData = () => {
        const requestTodos = async () => {
            const response = await fetch(`api/todos/${searchString}`);
            const { data } = await response.json();
            setTodos(data.map((todo) => ({ ...todo, isBeingEdited: false })));
        };
        const requestTags = async () => {
            const response = await fetch(`api/tags`);
            const { data } = await response.json();
            const lowerCaseTags = data.map((tag) => ({
                id: tag.id,
                name: tag.attributes.name.toLowerCase()
            }));
            setTags(lowerCaseTags);
        };
        requestTodos();
        requestTags();
    };

    useEffect(updateData, [ searchString ]);

    // Finds the id of the tag which has the given tag name (case insensitive).
    function findTagId(tagName) {
        const tag = tags.find((tag) => tag.name === tagName.toLowerCase());
        return tag ? tag.id : 0;
    }

    // Sets the search string which is used for retrieving data.
    function updateSearchString(values) {
        const query = values.type === 'tag' ? findTagId(values.query) : values.query;
        setSearchString(`?filter[${values.type}]=${query}`);
    }

    // Sets the search string to the default value.
    function resetSearchString() {
        setSearchString('');
    }

    return (
        <div>
            <h2>Search your To-Dos</h2>
            <div>
                <Formik
                    initialValues={{
                        query: 'Enter search query',
                        type: 'title'
                    }}
                    onSubmit={updateSearchString}
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
                            <Field type='radio' name='type' id='tag' value='tag' />
                            <label htmlFor='tag'>Tag</label>
                        </div>
                    </Form>
                </Formik>
            </div>

            <div>
                <button onClick={resetSearchString}>Show all</button>
            </div>

            <ShowTodos todos={todos} setTodos={setTodos} updateTodos={updateData} query={searchString} />
        </div>
    );
};

export default SearchTodos;
