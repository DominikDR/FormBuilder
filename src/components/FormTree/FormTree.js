import React, { Fragment } from 'react';
import Form from '../Form/Form';
import data from '../../data';
import generateUniqueID from '../../generateUniqueID';

import styles from './FormTree.css';

export default class FormTree extends React.Component {
    state = {
        data,
    }

    addForm = () => {
        const { data } = this.state;
        const newForm = {
            id: generateUniqueID(),
            subForms: [],
        };
        this.setState({
            data: {
                ...data,
                [newForm.id]: newForm,
            },
        });
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
        sumNestedForms.forEach((id) => { delete dataCopy[id]; });

        const { parentID } = dataCopy[clickedFormID];
        if (dataCopy[parentID]) {
            dataCopy[parentID].subForms = dataCopy[parentID].subForms.filter(id => id !== clickedFormID);
        }

        delete dataCopy[clickedFormID];
        this.setState({
            data: dataCopy,
        });
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
                <ol className={styles.subTree}>
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
                <button
                    onClick={this.addForm}
                    type="button"
                    className={styles.addFormButton}
                >
                    Add Input
                </button>
            </div>
        );
    }
}
