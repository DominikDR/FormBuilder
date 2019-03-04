import React from 'react';
import PropTypes from 'prop-types';
import _random from 'lodash.random';
import { Condition } from '../Condition/Condition';
import { AddButton, DeleteButton } from '../Buttons/Buttons';
import { Select } from '../Select/Select';
import { Input } from '../Input/Input';
import { type } from '../../selectOptions';
import { MIN_RANGE, MAX_RANGE } from '../../../consts';
import { getInitialConditions } from '../../../getInitialConditions';

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
            conditions: getInitialConditions(formType),
            type: 'radio',
            subForms: [],
        };
        return newForm;
    }

    onConditionSelect = (conditionValue) => {
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
            <li className={styles.container}>
                <form className={styles.formBox}>
                    {parentType
                        && (
                            <Condition
                                type={parentType}
                                formID={formID}
                                onConditionSelect={this.onConditionSelect}
                            />
                        )}
                    <Input
                        id={formID}
                        labelText="Question"
                        type="text"
                        name="question"
                        onChange={this.getChange}
                        defaultValue={question}
                        className={styles.input}
                    />
                    <div className={styles.type}>
                        <span className={styles.label}>Type</span>
                        <Select
                            name="type"
                            options={type}
                            onChange={this.getChange}
                        />
                    </div>
                </form>
                <AddButton
                    type="button"
                    onClick={this.handleAddSubForm}
                    text="Add Sub-Input"
                />
                <DeleteButton
                    type="button"
                    onClick={this.handleDeleteSubForm}
                    text="Delete"
                />
            </li>
        );
    }
}

Form.propTypes = {
    formID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    formType: PropTypes.string.isRequired,
    parentType: PropTypes.string,
    question: PropTypes.string,
    addSubForm: PropTypes.func.isRequired,
    deleteSubForm: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setConditions: PropTypes.func.isRequired,
};
