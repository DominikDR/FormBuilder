import React, { Fragment } from 'react';
import styles from './FormList.css';
import Form from './Form/Form';
import data from '../../data';

export default class FormList extends React.Component {
    state = {
        data,
    }

    constructForm = (dataKey) => {
		console.log('TCL: FormList -> constructForm -> dataKey', dataKey)
        const { data } = this.state;
        return (
            <Fragment key={dataKey}>
                <Form formObject={data[dataKey]} />
                <ol>
                    {data[dataKey].subForms.map(this.constructForm)}
                </ol>
            </Fragment>
        );
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                {Object.keys(data).filter(dataKey => !data[dataKey].parentID).map(this.constructForm)}
            </div>
        );
    }
}
