import React from 'react';
import classname from 'classnames';
import generateUniqueID from '../../generateUniqueID';

import styles from './Input.css';

export default class Form extends React.PureComponent {
    handleAddSubInput = () => {
        const { addSubInput, inputID } = this.props;
        const newForm = this.createForm(inputID);
        addSubInput(newForm);
    }

    handleDeleteSubInput = () => {
        const { deleteSubInput, inputID } = this.props;
        deleteSubInput(inputID);
    }

    createForm = (clickedInputID) => {
        const newInputID = generateUniqueID();
        const newForm = {
            id: newInputID,
            parentID: clickedInputID,
            subInputs: [],
        };
        return newForm;
    }

    render() {
        const { inputID } = this.props;

        return (
            <li className={styles.formBox}>
                {inputID}
                <button
                    onClick={this.handleAddSubInput}
                    type="button"
                    className={classname(styles.formButton, styles.addButton)}
                >
                    Add Sub-Input
                </button>
                <button
                    onClick={this.handleDeleteSubInput}
                    type="button"
                    className={classname(styles.formButton, styles.deleteButton)}
                >
                    Delete
                </button>
            </li>
        );
    }
}

/*
 <form className={styles.searchForm} onSubmit={this.handleSubmit}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Type here"
            />
    </form>
*/
