import React from 'react';

const box = {
    height: '100px',
    width: '250px',
    border: '1px solid #000',
    marginBottom: '20px',
    listStyleType: 'none',
};

const Form = ({ formId }) => {
    console.log('TCL: Form -> Formid -> formId', formId)
    return (
        <li style={box}>{formId}</li>
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
