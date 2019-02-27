import React from 'react';
import _random from 'lodash.random';
import { Condition } from '../Condition/Condition';
import { AddButton, DeleteButton } from '../Buttons/Buttons';
import { Select } from '../Select/Select';
import { type } from '../../selectOptions';
import { MIN_RANGE, MAX_RANGE } from '../../../consts';

import styles from './Form.css';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.questionInput = React.createRef();
        this.state = {
            conditions: [],
        };
    }

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
            question: this.questionInput.current.value,
            conditions,
            type: 'radio',
        };
        return newForm;
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    onConditionSelect = (conditions) => {
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
                <form onSubmit={this.handleSubmit}>
                    {parentType
                        && (
                            <Condition
                                formID={formID}
                                type={parentType}
                                onConditionSelect={this.onConditionSelect}
                            />
                        )}
                    <label htmlFor={`${formID}question`}>
                        Question
                        <input
                            type="text"
                            id={`${formID}question`}
                            ref={this.questionInput}
                            defaultValue={question}
                        />
                    </label>
                    <span>Type</span>
                    <Select options={type} onChange={this.handleSelectType} />
                    <AddButton
                        onClick={this.handleAddSubForm}
                        type="submit"
                        text="Add Sub-Input"
                    />
                </form>
                <DeleteButton
                    onClick={this.handleDeleteSubForm}
                    type="button"
                    text="Delete"
                />
            </li>
        );
    }
}
