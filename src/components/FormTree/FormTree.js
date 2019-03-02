import React, { Fragment } from 'react';
import _random from 'lodash.random';
import { Form } from '../Form/Form';
import { AddButton } from '../Buttons/Buttons';
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
            id: _random(MIN_RANGE, MAX_RANGE),
            type: 'radio',
            subForms: [],
        };
        this.setState({
            data: {
                ...data,
                sequence: [...data.sequence, newForm.id],
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
        }, () => {console.log('state', newForm); });
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
        dataCopy.sequence = dataCopy.sequence.filter(id => id !== clickedFormID);
        this.setState({
            data: dataCopy,
        });
    }

    sumNestedForms = (id) => {
        const { data } = this.state;
        const { subForms } = data[id];
        return [...subForms, ...subForms.map(this.sumNestedForms).flat()];
    }

    setConditions = (id, conditions) => {
        const { data } = this.state;
        console.log("data[id.subForms]", data[data[id].subForms[0]])
        this.setState({
            data: {
                ...data,
                [id]: {
                    ...data[id],
                    conditions: [...data[id].conditions, conditions],
                },
            },
        }, () => {console.log('stateAftersetConditions', this.state.data); });
    }

    setChange = (id, handledValueObject) => {
        const key = Object.keys(handledValueObject);
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                [id]: {
                    ...data[id],
                    [key]: handledValueObject[key],
                },
            },
        }, () => {console.log('state', this.state.data); });
    }

    constructForm = (dataKey) => {
        const { data } = this.state;
        const form = data[dataKey];
        const parentType = form.parentID && data[form.parentID].type;

        return (
            <Fragment key={dataKey}>
                <Form
                    formID={form.id}
                    formType={form.type}
                    parentType={parentType}
                    question={form.question}
                    addSubForm={this.addSubForm}
                    deleteSubForm={this.deleteSubForm}
                    handleChange={this.setChange}
                    setConditions={this.setConditions}
                />
                <ol className={styles.subTree}>
                    {form.subForms.map(this.constructForm)}
                </ol>
            </Fragment>
        );
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                {data.sequence.map(this.constructForm)}
                <AddButton
                    onClick={this.addForm}
                    text="Add Input"
                    type="button"
                />
            </div>
        );
    }
}
