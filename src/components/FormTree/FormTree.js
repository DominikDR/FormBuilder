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
            subForms: [],
            type: 'radio',
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
        const form = data[dataKey];
        const parentType = form.parentID && data[form.parentID].type;

        return (
            <Fragment key={dataKey}>
                <Form
                    formID={form.id}
                    parentType={parentType}
                    question={form.question}
                    addSubForm={this.addSubForm}
                    deleteSubForm={this.deleteSubForm}
                    onSelect={this.setConditionType}
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
                {data.sequence.filter(dataKey => !data[dataKey].parentID).map(this.constructForm)}
                <AddButton
                    onClick={this.addForm}
                    text="Add Input"
                    type="button"
                />
            </div>
        );
    }
}
