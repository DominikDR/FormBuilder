import React from 'react';
import styles from './Form.css';

export default class Form extends React.PureComponent {
    addSubForm = () => {
        return 
    }

    render() {
        const { formObject } = this.props;
        console.log('TCL: Form -> Formid -> formId', formObject);
        return (
            <li className={styles.formBox}>
                {formObject.id}
                <button onClick={this.addSubForm} type="submit" className={styles.addSubFormButton}>Add New</button>
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
