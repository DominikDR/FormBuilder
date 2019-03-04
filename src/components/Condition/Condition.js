import React from 'react';
import PropTypes from 'prop-types';
import { conditionOption, radioOptions } from '../../selectOptions';
import { Select } from '../Select/Select';
import { Input } from '../Input/Input';

import styles from './Condition.css';

export class Condition extends React.PureComponent {
    handleChange = (event) => {
        const { onConditionSelect } = this.props;
        const { target: { name, value } } = event;
        onConditionSelect({ [name]: value });
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

Condition.propTypes = {
    type: PropTypes.string.isRequired,
    formID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    onConditionSelect: PropTypes.func.isRequired,
};
