/* eslint-disable no-console */
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
        });
    }

    deleteSubForm = (clickedFormID) => {
        const { data } = this.state;
        const dataCopy = JSON.parse(JSON.stringify(data));
        const sumNestedForms = this.sumNestedForms(clickedFormID);
        console.log('sumNestedForms', sumNestedForms);
        sumNestedForms.forEach((id) => { delete dataCopy[id]; });

        const { parentID } = dataCopy[clickedFormID];
        dataCopy[parentID].subForms = dataCopy[parentID].subForms.filter(id => id !== clickedFormID);

        delete dataCopy[clickedFormID];
        this.setState({
            data: dataCopy,
        }, () => { console.log("data state", this.state.data)});
    }

    sumNestedForms = (id) => {
        const { data } = this.state;
        const { subForms } = data[id];
        return [...subForms, ...subForms.map(this.sumNestedForms).flat()];
    }

    constructForm = (dataKey) => {
        const { data } = this.state;
        return (
            <Fragment key={dataKey}>
                <Form
                    formID={data[dataKey].id}
                    addSubForm={this.addSubForm}
                    deleteSubForm={this.deleteSubForm}
                />
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
