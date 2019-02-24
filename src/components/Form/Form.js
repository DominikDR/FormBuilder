import React from 'react';
import classnames from 'classnames';
import _random from 'lodash.random';
import { Condition } from '../Condition/Condition';
import { Select } from '../Select/Select';
import { type } from '../../selectOptions';
import { MIN_RANGE, MAX_RANGE } from '../../../consts';

import styles from './Form.css';

export class Form extends React.Component {
    handleAddSubForm = () => {
        const { addSubForm, formID } = this.props;
        const newForm = this.createForm(formID);
        addSubForm(newForm);
    }

    handleDeleteSubForm = () => {
        const { deleteSubForm, formID } = this.props;
        deleteSubForm(formID);
    }

    createForm = (clickedForm) => {
        const newForm = {
            id: _random(MIN_RANGE, MAX_RANGE),
            parentID: clickedForm,
            subForms: [],
            type: 'radio',
        };
        return newForm;
    }

    constructForm = () => {
    }

    handleSelect = (event) => {
        const { formID, onSelect } = this.props;
        onSelect(formID, event.target.value);
    }

    render() {
        const { formID, parentType, question, onSelect } = this.props;
		console.log('TCL: Form -> parentType', formID, parentType)

        return (
            <li className={styles.formBox}>
                <form onSubmit={this.handleSubmit}>
                    {parentType && <Condition type={parentType} onSelect={this.handleSelect} />}
                    <label
                        htmlFor="question"
                    >
                        Question
                        <input
                            type="text"
                            id="question"
                            defaultValue={question}
                        />
                    </label>
                    <span>Type</span>
                    <Select options={type} onChange={this.handleSelect} />
                </form>
                <button
                    onClick={this.handleAddSubForm}
                    type="button"
                    className={classnames(styles.formButton, styles.addButton)}
                >
                    Add Sub-Input
                </button>
                <button
                    onClick={this.handleDeleteSubForm}
                    type="button"
                    className={classnames(styles.formButton, styles.deleteButton)}
                >
                    Delete
                </button>
            </li>
        );
    }
}
