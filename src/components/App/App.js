import React from 'react';
import styles from './App.css';
import Form from '../Form/Form';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
    render() {
        return (
            <div className={styles.mainPage}>
                <Form />
            </div>
        );
    }
}
