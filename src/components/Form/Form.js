import React from 'react';
import classnames from 'classnames';
import generateUniqueID from '../../generateUniqueID';

import styles from './Form.css';

export default class Form extends React.PureComponent {
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
        const newFormID = generateUniqueID();
        const newForm = {
            id: newFormID,
            parentID: clickedFormID,
            subForms: [],
        };
        return newForm;
    }

    render() {
        return (
            <li className={styles.formBox}>
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
