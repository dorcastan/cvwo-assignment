import { Field, Form, Formik } from 'formik';
import React from 'react';

const EditTodo = (props) => {
    return (
        <tr>
            <td colSpan='3'>
                <Formik
                    initialValues={{
                        id: props.id,
                        type: 'todos',
                        attributes: {
                            title: props.title,
                            body: props.body
                        }
                    }}
                    onSubmit={props.handleSubmit}
                >
                    {() => (
                        <Form>
                            <Field type='text' name='attributes.title' placeholder='Title' />
                            <Field type='text' name='attributes.body' placeholder='Details' />

                            <button type='submit'>Confirm</button>
                            <button type='button' onClick={props.handleCancel}>
                                Cancel
                            </button>
                        </Form>
                    )}
                </Formik>
            </td>
        </tr>
    );
};

export default EditTodo;
