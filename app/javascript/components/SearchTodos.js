import {
    Button,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import { Link } from '@reach/router';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import TodosTable from './TodosTable';

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
    // partial tag name. Tag name matching is case insensitive and any punctuation
    // is removed before searching.
    function findTagId(partialTagName) {
        const sanitizedTagName = partialTagName.replace(/[\W_]+/g, '');
        const regExp = new RegExp('.*' + sanitizedTagName + '.*', 'i');
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
        <Container>
            {/* <Paper> */}
            <Typography variant='h2'>Search</Typography>
            {/* </Paper> */}

            <div>
                <Formik
                    initialValues={{
                        query: '',
                        type: 'title'
                    }}
                    onSubmit={updateSearchString}
                >
                    <Form>
                        <Grid container alignItems='center' justify='space-between' spacing={2}>
                            <Grid item xs>
                                <Field
                                    as={TextField}
                                    type='search'
                                    name='query'
                                    placeholder='What are you looking for?'
                                    fullWidth
                                    color='secondary'
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button type='submit' variant='contained' color='secondary'>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center' justify='space-between' spacing={2}>
                            {/* <FormLabel component='legend'>Location</FormLabel> */}
                            <Grid item>
                                <RadioGroup row={true}>
                                    <FormControlLabel
                                        value='title'
                                        control={<Field as={Radio} type='radio' name='type' value='title' />}
                                        label='Title'
                                    />
                                    <FormControlLabel
                                        value='details'
                                        control={<Field as={Radio} type='radio' name='type' value='details' />}
                                        label='Details'
                                    />
                                    <FormControlLabel
                                        value='tag'
                                        control={<Field as={Radio} type='radio' name='type' value='tag' />}
                                        label='Tag'
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid item />
                        </Grid>
                    </Form>
                </Formik>
            </div>

            {/* TODO: align to right side of screen */}
            <Button onClick={resetSearchString} variant='outlined'>
                Show all
            </Button>

            <Paper>
                <TodosTable todos={todos} setTodos={setTodos} updateTodos={updateData} query={searchString} />
            </Paper>

            <Button component={Link} to='/' variant='outlined'>
                Home
            </Button>
        </Container>
    );
};

export default SearchTodos;
