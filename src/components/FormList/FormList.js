import React from 'react';
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
    constructForm = (data) => {
        if (data.subForms.length) {
            return (
                <ol key={data.id}>
                    {data.subForms.map(this.constructForm)}
                </ol>
            );
        }
        return <Form key={data.id} formId={data.id} />;
    }

    render() {
        return (
            <div>
                {data.map(this.constructForm)}
            </div>
        );
    }
}
