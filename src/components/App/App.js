import React from 'react';
import FormList from '../FormList/FormList';

import styles from './App.css';

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
