import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Condition } from '../Condition/Condition';
import { AddButton, DeleteButton } from '../Buttons/Buttons';
import { Select } from '../Select/Select';
import { Input } from '../Input/Input';
import { type } from '../../selectOptions';
import { addSubForm as addSubFormAction } from '../../actions/formTree';
import { createForm } from '../../createForm';

import styles from './Form.css';

export class FormPrimary extends React.Component {
    handleAddSubForm = () => {
        const { formID, formType, addSubForm } = this.props;
        addSubForm(createForm(formID, formType));
    }

    handleDeleteSubForm = () => {
        const { deleteSubForm, formID } = this.props;
        deleteSubForm(formID);
    }

    onConditionSelect = (conditionValue) => {
        const { formID, setConditions } = this.props;
        setConditions(formID, conditionValue);
    }

    getChange = (event) => {
        const { formID, handleChange } = this.props;
        const { target: { name, value } } = event;
        handleChange(formID, { [name]: value });
    }

    render() {
        const { formID, parentType, question } = this.props;

        return (
            <li className={styles.container}>
                <form className={styles.formBox}>
                    {parentType
                        && (
                            <Condition
                                type={parentType}
                                formID={formID}
                                onConditionSelect={this.onConditionSelect}
                            />
                        )}
                    <Input
                        id={formID}
                        labelText="Question"
                        type="text"
                        name="question"
                        onChange={this.getChange}
                        defaultValue={question}
                        className={styles.input}
                    />
                    <div className={styles.type}>
                        <span className={styles.label}>Type</span>
                        <Select
                            name="type"
                            options={type}
                            onChange={this.getChange}
                        />
                    </div>
                </form>
                <AddButton
                    type="button"
                    onClick={this.handleAddSubForm}
                    text="Add Sub-Input"
                />
                <DeleteButton
                    type="button"
                    onClick={this.handleDeleteSubForm}
                    text="Delete"
                />
            </li>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    const { formID, formType } = ownProps;
    return ({
        addSubForm: () => dispatch(addSubFormAction(createForm(formID, formType))),
    });
};

const Form = connect(mapStateToProps, mapDispatchToProps)(FormPrimary);
export { Form };


Form.propTypes = {
    formID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    formType: PropTypes.string.isRequired,
    parentType: PropTypes.string,
    question: PropTypes.string,
    // addSubForm: PropTypes.func.isRequired,
    deleteSubForm: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setConditions: PropTypes.func.isRequired,
};
