import React from 'react';
import { connect } from 'react-redux';
import { Form } from '../Form/Form';
import { getInitialConditions } from '../../getInitialConditions';

import styles from './FormTree.css';

class FormTreePrimary extends React.Component {
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
                    handleChange={this.setChange}
                    //setConditions={this.setConditions}
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

const FormTree = connect(mapStateToProps, null)(FormTreePrimary);
export { FormTree };
