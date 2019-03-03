import React, { Fragment } from 'react';
import _random from 'lodash.random';
import { Form } from '../Form/Form';
import { AddButton } from '../Buttons/Buttons';
import { data } from '../../data';
import { MIN_RANGE, MAX_RANGE } from '../../../consts';
import { getInitialConditions } from '../../../getInitialConditions';

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
        const { condition, radio, answerInput } = conditions;
        const previousValue = data[id].conditions;
        this.setState({
            data: {
                ...data,
                [id]: {
                    ...data[id],
                    conditions: {
                        condition: condition || previousValue.condition,
                        comparisonValue: radio || answerInput || previousValue.comparisonValue,
                    },
                },
            },
        });
    }

    setChange = (id, handledValueObject) => {
        const { data } = this.state;
        let dataCopy = JSON.parse(JSON.stringify(data));
        const { type } = handledValueObject;
        const { subForms } = dataCopy[id];
        if (type && subForms.length) {
            dataCopy = this.replaceSubFormsConditions(dataCopy, id, type);
        }
        dataCopy[id] = { ...dataCopy[id], ...handledValueObject };
        this.setState({
            data: dataCopy,
        });
    }

    replaceSubFormsConditions = (data, id, type) => {
        data[id].subForms.forEach((subFormID) => {
            data[subFormID].conditions = getInitialConditions(type);
        });
        return data;
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
