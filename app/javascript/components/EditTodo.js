import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';

const EditTodo = (props) => {
    // TAGGING
    // TODO: clean up database - delete Tag if nothing else is pointing to it

    async function handleSubmit(values) {
        const index = values.id;
        const tagName = values.attributes.tag ? values.attributes.tag : '';

        const csrfToken = document.querySelector('meta[name=csrf-token]').content;

        // FIXME: this function shouldn't be so long
        const getTagId = async () => {
            async function getExistingTag() {
                const response = await fetch(`api/tags/?filter[name]=${tagName}`, {
                    method: 'GET'
                });
                const { data } = await response.json();
                return data;
            }

            async function createTag(csrfToken) {
                const payload = { type: 'tags', attributes: { name: tagName } };
                const response = await fetch(`/api/tags`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/vnd.api+json',
                        'X-CSRF-Token': csrfToken
                    },
                    body: JSON.stringify({ data: payload })
                });
                const successfulStatusCodes = [ 200, 201, 204 ];
                if (!successfulStatusCodes.includes(response.status)) {
                    throw 'Tag was not created';
                }
                const { data } = await response.json();
                return data;
            }

            let tags = await getExistingTag(tagName); // should only contain 1 item (uniqueness constraint)
            if (tags.length === 0) {
                tags = [ await createTag(csrfToken) ]; // data should be an array
            }
            return tags[0].id;
        };

        const putUpdatedTodo = async () => {
            const response = await fetch(`/api/todos/${index}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ data: actualValues })
            });
            switch (response.status) {
                case 200: // OK
                // fallthrough
                case 204: // No Content
                    props.toggleBeingEditedStatus(index);
                    props.refresh(); // TODO: update state array instead of fetching everything again
                    break;
                // TODO: case 201: // Resource created
                // TODO: case 202: // Accepted (action has been queued)
                case 422: // Unprocessable Entity
                    alert(`To-Do #${index} could not be edited. Did you leave the title blank?`);
                    break;
                case 400: // Bad Request
                // fallthrough
                case 404: // Not Found
                // fallthrough
                default:
                    alert(`To-Do #${index} could not be edited. Please try again later.`);
                    break;
            }
        };

        let tagId;
        try {
            tagId = await getTagId();
        } catch (err) {
            alert(err);
            return;
        }
        const { tag, ...otherAttributes } = values.attributes;
        const actualValues = {
            ...values,
            attributes: {
                ...otherAttributes,
                'tag-id': tagId
            }
        };

        putUpdatedTodo();
    }

    const initialValues = {
        id: props.id,
        type: 'todos',
        attributes: {
            title: props.title,
            details: props.details,
            tag: props.tag
        }
    };

    const validateTitle = (str) => (str && str.length !== 0 ? undefined : 'Title cannot be empty');
    const validateTagName = (str) => (str && str.length !== 0 ? undefined : 'Tag cannot be empty');

    return (
        <tr>
            <td colSpan='3'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <div>
                                <Field
                                    type='text'
                                    name='attributes.title'
                                    placeholder='Title'
                                    validate={validateTitle}
                                />
                                <Field type='text' name='attributes.details' placeholder='Details' />
                                <Field type='text' name='attributes.tag' placeholder='Tag' validate={validateTagName} />

                                <button type='submit'>Confirm</button>
                                <button type='button' onClick={props.toggleBeingEditedStatus}>
                                    Cancel
                                </button>
                            </div>

                            {/* TODO: organise layout and prettify */}
                            <div>
                                <ErrorMessage name='attributes.title' />
                                <ErrorMessage name='attributes.tag' />
                            </div>
                        </Form>
                    )}
                </Formik>
            </td>
        </tr>
    );
};

export default EditTodo;
