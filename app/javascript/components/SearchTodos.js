import { Link } from '@reach/router';
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
            setTags(data);
        };
        requestTodos();
        requestTags();
    };

    useEffect(updateData, [ searchString ]);

    // Returns a string containing the id(s) of tag(s) which contain the given
    // partial tag name. Tag matching is case insensitive.
    function findTagId(partialTagName) {
        const regExp = new RegExp('.*' + partialTagName + '.*', 'i');
        const selectedTags = tags.filter((tag) => tag.attributes.name.match(regExp));
        const tagIds = selectedTags.reduce((accumulator, currentValue) => accumulator + ',' + currentValue.id, '');
        return tagIds ? tagIds : 0;
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
                        type: 'tag'
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

            <p>
                <Link to='/'>Home</Link>
            </p>
        </div>
    );
};

export default SearchTodos;
