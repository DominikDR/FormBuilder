import React from 'react';
import { connect } from 'react-redux';
import { FormTree } from '../FormTree/FormTree';

import styles from './App.css';

// eslint-disable-next-line react/prefer-stateless-function
export class AppPrimary extends React.Component {
    render() {
        const { formsInSequence } = this.props;
        return (
            <div className={styles.mainPage}>
                {formsInSequence.map(id => <FormTree key={id} id={id} />)}
            </div>
        );
    }
}

const mapStateToProps = ({ data }) => ({
    formsInSequence: data.formsInSequence,
});

const App = connect(mapStateToProps)(AppPrimary);
export { App };
