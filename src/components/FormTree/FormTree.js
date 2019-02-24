import React, { Fragment } from 'react';
import { random } from 'lodash.random';
import { Form } from '../Form/Form';
import { data } from '../../data';
import { MIN_RANGE, MAX_RANGE } from '../../../consts';

import styles from './FormTree.css';

export class FormTree extends React.Component {
    state = {
        data,
    }

    addForm = () => {
        const { data } = this.state;
        const newForm = {
            id: random(MIN_RANGE, MAX_RANGE),
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

    setConditionType = (id, value) => {
        console.log('TCL: FormTree -> setConditionType -> id, event', id, value)
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                [id]: {
                    ...data[id],
                    type: value,
                },
            },
        }, () => {console.log('state', this.state.data); });
    }

    constructForm = (dataKey) => {
        const { data } = this.state;
        return (
            <Fragment key={dataKey}>
                <Form
                    formID={data[dataKey].id}
                    parent={data[data[dataKey].parentID]}
                    question={data[dataKey].question}
                    addSubForm={this.addSubForm}
                    deleteSubForm={this.deleteSubForm}
                    onSelect={this.setConditionType}
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
