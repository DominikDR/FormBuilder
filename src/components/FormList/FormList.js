import React, { Fragment } from 'react';
import Input from '../Input/Input';
import data from '../../data';
import generateUniqueID from '../../generateUniqueID';

import styles from './FormList.css';

export default class FormList extends React.Component {
    state = {
        data,
    }

    addInput = () => {
        const { data } = this.state;
        const newInput = {
            id: generateUniqueID(),
            subInputs: [],
        };
        this.setState({
            data: {
                ...data,
                [newInput.id]: newInput,
            },
        });
    }

    addSubInput = (newInput) => {
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                [newInput.parentID]: {
                    ...data[newInput.parentID],
                    subInputs: [...data[newInput.parentID].subInputs, newInput.id],
                },
                [newInput.id]: newInput,
            },
        });
    }

    deleteSubInput = (clickedInputID) => {
        const { data } = this.state;
        const dataCopy = JSON.parse(JSON.stringify(data));
        const sumNestedInputs = this.sumNestedInputs(clickedInputID);
        sumNestedInputs.forEach((id) => { delete dataCopy[id]; });

        const { parentID } = dataCopy[clickedInputID];
        if (dataCopy[parentID]) {
            dataCopy[parentID].subInputs = dataCopy[parentID].subInputs.filter(id => id !== clickedInputID);
        }

        delete dataCopy[clickedInputID];
        this.setState({
            data: dataCopy,
        });
    }

    sumNestedInputs = (id) => {
        const { data } = this.state;
        const { subInputs } = data[id];
        return [...subInputs, ...subInputs.map(this.sumNestedInputs).flat()];
    }

    constructInput = (dataKey) => {
        const { data } = this.state;
        return (
            <Fragment key={dataKey}>
                <Input
                    inputID={data[dataKey].id}
                    addSubInput={this.addSubInput}
                    deleteSubInput={this.deleteSubInput}
                />
                <ol className={styles.subList}>
                    {data[dataKey].subInputs.map(this.constructInput)}
                </ol>
            </Fragment>
        );
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                {Object.keys(data).filter(dataKey => !data[dataKey].parentID).map(this.constructInput)}
                <button
                    onClick={this.addInput}
                    type="button"
                    className={styles.addInputButton}
                >
                    Add Input
                </button>
            </div>
        );
    }
}
