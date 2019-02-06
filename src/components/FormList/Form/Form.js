import React from 'react';
import styles from './Form.css';

export default class Form extends React.PureComponent {
    handleAddSubForm = (clickedFormId) => {
        const { addSubForm } = this.props;
        const newForm = this.createForm(clickedFormId);
        return addSubForm(newForm);
    }

    createForm = (clickedFormId) => {
        const newFormID = this.generateUniqueID();
        const newForm = {
            id: newFormID,
            parentID: clickedFormId,
            subForms: [],
        };
        return newForm;
    }

    generateUniqueID = () => {
        const ASCII_CODE_SMALL_A = 97;
        const ASCII_CODE_SMALL_Z = 122;
        const STRING_LENGTH = 1;
        let uniqueID = '';

        for (let i = 0; i < STRING_LENGTH; i++) {
            const randomNum = Math.random() * (ASCII_CODE_SMALL_Z - ASCII_CODE_SMALL_A) + ASCII_CODE_SMALL_A;
            const randomASCII = Math.ceil(randomNum);
            uniqueID += String.fromCharCode(randomASCII);
        }
        const RANDOM_NUM_LENGTH = 6;
        for (let i = 0; i < RANDOM_NUM_LENGTH; i++) {
            const randomNum = Math.floor(Math.random() * 10);
            uniqueID += randomNum;
        }
        return uniqueID;
    }

    render() {
        const { formObject } = this.props;
        console.log('TCL: Form -> formObject', formObject);
        return (
            <li className={styles.formBox}>
                {formObject.id}
                <button
                    onClick={this.handleAddSubForm.bind(null, formObject.id)}
                    type="submit"
                    className={styles.addSubFormButton}
                >
                    Add New
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
