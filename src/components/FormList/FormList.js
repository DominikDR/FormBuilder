import React, { Fragment } from 'react';
import styles from './FormList.css';
import Form from './Form/Form';
import data from '../../data';

export default class FormList extends React.Component {
    state = {
        data,
    }

    addSubForm = (newForm) => {
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                [newForm.parentID]: {
                    ...data[newForm.parentID],
                    subForms: [...data[newForm.parentID].subForms, newForm.id],
                },
                [newForm.id]: newForm,
            },
        }, () => console.log('TCL: FormList -> data state', this.state.data));
    }

    constructForm = (dataKey) => {
        const { data } = this.state;
        return (
            <Fragment key={dataKey}>
                <Form formObject={data[dataKey]} addSubForm={this.addSubForm} />
                <ol>
                    {data[dataKey].subForms.map(this.constructForm)}
                </ol>
            </Fragment>
        );
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                {Object.keys(data).filter(dataKey => !data[dataKey].parentID).map(this.constructForm)}
            </div>
        );
    }
}
