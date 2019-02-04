import React from 'react';
import styles from './Form.css';

const Form = ({ formId }) => {
    console.log('TCL: Form -> Formid -> formId', formId)
    return (
        <li className={styles.formBox}>{formId}</li>
    );
};

export default Form;


const addSubForm = () => {
    console.log("tjijis");
    return
}

const onButtonClick = () => {
}

/* <form className={styles.searchForm} onSubmit={this.handleSubmit}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Type here"
            />

            <button onClick={this.onButtonClick} type="submit" className={styles.searchButton}>Add New</button>
    </form>
*/
