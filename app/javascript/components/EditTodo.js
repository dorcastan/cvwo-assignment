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
                            details: props.details
                        }
                    }}
                    onSubmit={props.handleSubmit}
                >
                    {() => (
                        <Form>
                            <Field type='text' name='attributes.title' placeholder='Title' />
                            <Field type='text' name='attributes.details' placeholder='Details' />

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
