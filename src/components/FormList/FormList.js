import React, { Fragment } from 'react';
import styles from './FormList.css';
import Form from './Form/Form';

const data = [{
    id: 'a1',
    subForms: [{
        id: 'a2',
        subForms: [{
            id: 'a3',
            subForms: [],
        }, {
            id: 'b3',
            subForms: [{
                id: 'a4',
                subForms: [],
            }],
        }, {
            id: 'c3',
            subForms: [],
        }],
    }],
}, {
    id: 'b1',
    subForms: [],
}, {
    id: 'c1',
    subForms: [],
}];

export default class FormList extends React.Component {
    constructForm = data => (
        <Fragment key={data.id}>
            <Form formId={data.id} />
            <ol>
                {data.subForms.map(this.constructForm)}
            </ol>
        </Fragment>
    )

    render() {
        return (
            <div>
                {data.map(this.constructForm)}
            </div>
        );
    }
}
