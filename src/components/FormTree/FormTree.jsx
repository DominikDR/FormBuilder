import React from 'react';
import { connect } from 'react-redux';
import { Form } from '../Form/Form';
import { getInitialConditions } from '../../getInitialConditions';

import styles from './FormTree.css';

class FormTreePrimary extends React.Component {
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
        const {
            formID,
            formType,
            question,
            subForms,
            parentType,
        } = this.props;

        return (
            <div>
                <Form
                    formID={formID}
                    formType={formType}
                    parentType={parentType}
                    question={question}
                    // addSubForm={this.addSubForm}
                    deleteSubForm={this.deleteSubForm}
                    handleChange={this.setChange}
                    setConditions={this.setConditions}
                />
                <ol className={styles.subTree}>
                    {subForms.map(id => <FormTree key={id} formID={id} />)}
                </ol>
            </div>
        );
    }
}

const mapStateToProps = ({ data }, ownProps) => {
    const form = data[ownProps.formID];
    return ({
        formID: form.id,
        parentID: form.parentID,
        formType: form.type,
        question: form.question,
        subForms: form.subForms,
        parentType: form.parentID && data[form.parentID].type,
        data,
    });
};

const mapDispatchToProps = dispatch => ({

});

const FormTree = connect(mapStateToProps, mapDispatchToProps)(FormTreePrimary);
export { FormTree };
