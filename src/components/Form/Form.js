import React from 'react';
import _random from 'lodash.random';
import { Condition } from '../Condition/Condition';
import { AddButton, DeleteButton } from '../Buttons/Buttons';
import { Select } from '../Select/Select';
import { type } from '../../selectOptions';
import { MIN_RANGE, MAX_RANGE } from '../../../consts';

import styles from './Form.css';

export class Form extends React.Component {
    state = {
        conditions: [],
    };

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
        const { conditions } = this.state;
        const newForm = {
            id: _random(MIN_RANGE, MAX_RANGE),
            parentID: clickedForm,
            subForms: [],
            conditions,
            type: 'radio',
        };
        return newForm;
    }

    handleQuestionInput = (event) => {
        const { formID, onChange } = this.props;
        onChange(formID, event.target.value);
    }

    onConditionSelect = (conditions) => {
		console.log('TCL: Form -> onConditionSelect -> conditions', conditions)
        this.setState({
            conditions,
        });
    }

    handleSelectType = (event) => {
        event.preventDefault();
        const { formID, onSelect } = this.props;
        onSelect(formID, event.target.value);
    }

    render() {
        const { formID, parentType, question, onSelect } = this.props;

        return (
            <li className={styles.formBox}>
                <form>
                    {parentType
                        && (
                            <Condition
                                formID={formID}
                                type={parentType}
                                onConditionSelect={this.onConditionSelect}
                            />
                        )}
                    <label htmlFor={`${formID}`}>
                        Question
                        <input
                            type="text"
                            id={`${formID}`}
                            onChange={this.handleQuestionInput}
                            defaultValue={question}
                        />
                    </label>
                    <span>Type</span>
                    <Select options={type} onChange={this.handleSelectType} />
                </form>
                <AddButton
                    onClick={this.handleAddSubForm}
                    type="button"
                    text="Add Sub-Input"
                />
                <DeleteButton
                    onClick={this.handleDeleteSubForm}
                    type="button"
                    text="Delete"
                />
            </li>
        );
    }
}
