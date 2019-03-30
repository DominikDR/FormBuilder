import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addForm as addFormAction } from '../../actions/formTree';
import { FormTree } from '../FormTree/FormTree';
import { AddButton } from '../Buttons/Buttons';
import { createForm } from '../../createForm';

class FormEditorPrimary extends React.Component {
    handleAddForm = () => {
        const { addForm } = this.props;
        addForm(createForm(null, null));
    };

    render() {
        const { formsInSequence } = this.props;
        return (
            <Fragment>
                {formsInSequence.map(id => <FormTree key={id} formID={id} />)}
                <AddButton
                    onClick={this.handleAddForm}
                    text="Add Input"
                    type="button"
                />
            </Fragment>
        );
    }
}

const mapStateToProps = ({ data }) => ({
    formsInSequence: data.formsInSequence,
});
const mapDispatchToProps = (dispatch) => {
    return ({
        addForm: createForm => dispatch(addFormAction(createForm)),
    });
};

const FormEditor = connect(mapStateToProps, mapDispatchToProps)(FormEditorPrimary);
export { FormEditor };
