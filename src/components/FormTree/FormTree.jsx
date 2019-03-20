import React, { Fragment } from 'react';
import _random from 'lodash.random';
import { connect } from 'react-redux';
import { addForm as addFormAction } from '../../actions/formTree';
import { Form } from '../Form/Form';
import { AddButton } from '../Buttons/Buttons';
import { MIN_RANGE, MAX_RANGE } from '../../../consts';
import { getInitialConditions } from '../../../getInitialConditions';

import styles from './FormTree.css';

class FormTreePrimary extends React.Component {
    addForm = () => {
        const newForm = {
            id: _random(MIN_RANGE, MAX_RANGE),
            type: 'radio',
            subForms: [],
        };
        addFormAction(newForm);
    }

    addSubForm = (newForm) => {
        const { data } = this.props;
        this.setState({
            data: {
                ...data,
                [newForm.parentID]: {
                    ...data[newForm.parentID],
                    subForms: [...data[newForm.parentID].subForms, newForm.id],
                },
                [newForm.id]: newForm,
            },
        });
    }

    deleteSubForm = (clickedFormID) => {
        const { data } = this.props;
        const dataCopy = JSON.parse(JSON.stringify(data));
        const sumNestedForms = this.sumNestedForms(clickedFormID);
        sumNestedForms.forEach((id) => { delete dataCopy[id]; });

        const { parentID } = dataCopy[clickedFormID];
        if (dataCopy[parentID]) {
            dataCopy[parentID].subForms = dataCopy[parentID].subForms.filter(id => id !== clickedFormID);
        }

        delete dataCopy[clickedFormID];
        dataCopy.formsInSequence = dataCopy.formsInSequence.filter(id => id !== clickedFormID);
        this.setState({
            data: dataCopy,
        });
    }

    sumNestedForms = (id) => {
        const { data } = this.props;
        const { subForms } = data[id];
        return [...subForms, ...subForms.map(this.sumNestedForms).flat()];
    }

    setConditions = (id, conditions) => {
        const { data } = this.props;
        const { condition, radio, answerInput } = conditions;
        const previousValue = data[id].conditions;
        this.setState({
            data: {
                ...data,
                [id]: {
                    ...data[id],
                    conditions: {
                        condition: condition || previousValue.condition,
                        comparisonValue: radio || answerInput || previousValue.comparisonValue,
                    },
                },
            },
        });
    }

    setChange = (id, handledValueObject) => {
        const { data } = this.props;
        const dataCopy = JSON.parse(JSON.stringify(data));
        const { type } = handledValueObject;
        const { subForms } = dataCopy[id];
        if (type && subForms.length) {
            subForms.forEach((subFormID) => {
                dataCopy[subFormID].conditions = getInitialConditions(type);
            });
        }
        dataCopy[id] = { ...dataCopy[id], ...handledValueObject };
        this.setState({
            data: dataCopy,
        });
    }

    render() {
        const { form, subForms, parentType } = this.props;
        return (
            <div>
                <Form
                    formID={form.id}
                    formType={form.type}
                    parentType={parentType}
                    question={form.question}
                    addSubForm={this.addSubForm}
                    deleteSubForm={this.deleteSubForm}
                    handleChange={this.setChange}
                    setConditions={this.setConditions}
                />
                <ol className={styles.subTree}>
                    {subForms.map(id => <FormTree key={id} id={id} />)}
                </ol>
                <AddButton
                    onClick={this.addForm}
                    text="Add Input"
                    type="button"
                />
            </div>
        );
    }
}

const mapStateToProps = ({ data }, ownProps) => {
    console.log("ownProps", ownProps);
    const form = data[ownProps.id];
    return ({
        form,
        subForms: form.subForms,
        parentType: form.parentID && data[form.parentID].type,
        data,
    });
};

const mapDispatchToProps = (dispatch) => {

};

const FormTree = connect(mapStateToProps)(FormTreePrimary);
export { FormTree };
