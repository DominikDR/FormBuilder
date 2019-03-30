import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { conditionOption, radioOptions } from '../../selectOptions';
import { Select } from '../Select/Select';
import { Input } from '../Input/Input';
import { setConditions as setConditionsAction } from '../../actions/formTree';

import styles from './Condition.css';

export class ConditionPrimary extends React.PureComponent {
    handleChange = (event) => {
        const { setConditions } = this.props;
        const { target: { name, value } } = event;
        setConditions({ [name]: value });
    }

    render() {
        const { formID, type } = this.props;
        return (
            <div>
                <span>Condition</span>
                <Select
                    options={conditionOption[type]}
                    onChange={this.handleChange}
                    name="condition"
                    className={styles.conditionSelect}
                />
                {type === 'radio'
                    ? (
                        <Select
                            options={radioOptions}
                            onChange={this.handleChange}
                            name="radio"
                            className={styles.radioSelect}
                        />
                    )
                    : (
                        <Input
                            id={`${formID}answer`}
                            type={type}
                            name="answerInput"
                            onChange={this.handleChange}
                            className={styles.input}
                        />
                    )
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { formID } = ownProps;
    return ({
        setConditions: conditionValue => dispatch(setConditionsAction(formID, conditionValue)),
    });
};

const Condition = connect(null, mapDispatchToProps)(ConditionPrimary);
export { Condition };

Condition.propTypes = {
    type: PropTypes.string.isRequired,
    formID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    //onConditionSelect: PropTypes.func.isRequired,
};
