import React from 'react';
import { FormEditor } from '../FormEditor/FormEditor';

import styles from './App.css';

// eslint-disable-next-line react/prefer-stateless-function
export class App extends React.Component {
    render() {
        return (
            <div className={styles.mainPage}>
                <FormEditor />
            </div>
        );
    }
}
