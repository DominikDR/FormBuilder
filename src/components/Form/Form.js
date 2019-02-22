import React from 'react';
import classnames from 'classnames';
import _random from 'lodash.random';
import { Condition } from '../Condition/Condition';
import { Select } from '../Select/Select';
import { type } from '../../selectOptions';
import { data } from '../../data';
import { MIN_RANGE, MAX_RANGE } from '../../../consts';

import styles from './Form.css';

export class Form extends React.PureComponent {
    handleAddSubForm = () => {
        const { addSubForm, formID } = this.props;
        const newForm = this.createForm(formID);
        addSubForm(newForm);
    }

    handleDeleteSubForm = () => {
        const { deleteSubForm, formID } = this.props;
        deleteSubForm(formID);
    }

    createForm = (clickedFormID) => {
        const newFormID = _random(MIN_RANGE, MAX_RANGE);
        const newForm = {
            id: newFormID,
            parentID: clickedFormID,
            subForms: [],
        };
        return newForm;
    }

    constructForm = () => {
    }

    render() {
        const { formID } = this.props;
        const parent = data[formID].parentID ? data[data[formID].parentID] : null;

        return (
            <li className={styles.formBox}>
                <form onSubmit={this.handleSubmit}>
                    {parent && <Condition type={parent.type} />}
                </form>
                <label htmlFor="question">
                    Question
                    <input type="text" id="question" />
                </label>
                <span>Type</span>
                <Select options={type} />
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
