import React from 'react';
import _random from 'lodash.random';
import { Condition } from '../Condition/Condition';
import { AddButton, DeleteButton } from '../Buttons/Buttons';
import { Select } from '../Select/Select';
import { type, conditionOption, radioOptions } from '../../selectOptions';
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
        const { formType } = this.props;
        const newForm = {
            id: _random(MIN_RANGE, MAX_RANGE),
            parentID: clickedForm,
            conditions: this.setInitialConditions(formType),
            type: 'radio',
            subForms: [],
        };
        return newForm;
    }

    setInitialConditions = (formType) => {
        const defaultSelectValue = conditionOption[formType][0].value;
        if (formType === 'radio') {
            return [defaultSelectValue, radioOptions[0].value];
        }
        return [defaultSelectValue, ''];
    }

    onConditionSelect = (conditionValue) => {
		console.log('TCL: Form -> onConditionSelect -> conditionValue', conditionValue)
        const { formID, setConditions } = this.props;
        setConditions(formID, conditionValue);
    }

    getChange = (event) => {
        const { formID, handleChange } = this.props;
        const { target: { name, value } } = event;
        handleChange(formID, { [name]: value });
    }

    render() {
        const { formID, parentType, question } = this.props;

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
                            name="question"
                            id={`${formID}`}
                            onChange={this.getChange}
                            defaultValue={question}
                        />
                    </label>
                    <span>Type</span>
                    <Select
                        name="type"
                        options={type}
                        onChange={this.getChange}
                    />
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
