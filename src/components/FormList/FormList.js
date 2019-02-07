import React, { Fragment } from 'react';
import styles from './FormList.css';
import Form from './Form/Form';
import data from '../../data';

export default class FormList extends React.Component {
    state = {
        data,
    }

    addSubForm = (newForm) => {
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                [newForm.parentID]: {
                    ...data[newForm.parentID],
                    subForms: [...data[newForm.parentID].subForms, newForm.id],
                },
                [newForm.id]: newForm,
            },
        }, () => console.log('TCL: FormList -> data state', this.state.data));
    }

    deleteSubForm = (clickedFormID) => {
        
        // deleteNodeChilds or deleteNestedChilds
        const decreasedData = this.deleteNestedChilds(clickedFormID);
		console.log('TCL: FormList -> deleteSubForm -> decreasedData', decreasedData)
        const { parentID } = decreasedData[clickedFormID];
        const parentSubForms = decreasedData[parentID].subForms;
        decreasedData[parentID].subForms = decreasedData[parentID].subForms.filter(id => id !== clickedFormID);

        delete decreasedData[clickedFormID];
        this.setState({
            data: {
                ...decreasedData,
            },
        }, () => console.log('TCL: FormList -> data', this.state.data));
    }

    deleteNestedChilds = (nodeId) => {
		console.log('TCL: FormList-> nodeId', nodeId)
        const { data } = this.state;
        const dataCopy = JSON.parse(JSON.stringify(data));
		console.log('TCL: FormList -> deleteNestedChilds -> dataCopy', dataCopy)
        dataCopy[nodeId].subForms.forEach((id) => {
			console.log('TCL: FormList -> deleteNestedChilds -> subForm', id)
            if (dataCopy[id].subForms) {
                dataCopy[id].subForms.map(this.deleteNestedChilds);
            }
            delete dataCopy[id];
        });
        return dataCopy;
    };

    constructForm = (dataKey) => {
        const { data } = this.state;
        return (
            <Fragment key={dataKey}>
                <Form formID={data[dataKey].id} addSubForm={this.addSubForm} deleteSubForm={this.deleteSubForm} />
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
