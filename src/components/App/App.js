import React from 'react';
import styles from './App.css';
import FormList from '../FormList/FormList';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
    render() {
        return (
            <div className={styles.mainPage}>
                <FormList />
            </div>
        );
    }
}
