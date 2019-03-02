import React from 'react';
import { conditionOption, radioOptions } from '../../selectOptions';
import { Select } from '../Select/Select';

export class Condition extends React.PureComponent {
    handleChange = (event) => {
        const { onConditionSelect } = this.props;
        const { target: { name, value } } = event;
		console.log('TCL: Condition -> { name, value }', { [name]: value })
        onConditionSelect({ [name]: value });
    }

    render() {
        const { formID, type } = this.props;
        return (
            <>
                <span>Condition</span>
                <Select options={conditionOption[type]} onChange={this.handleChange} name="selectedValue" />
                {type === 'radio'
                    ? <Select options={radioOptions} onChange={this.handleChange} name="radio" />
                    : (
                        <label htmlFor={`${formID}answer`}>
                            answer
                            <input
                                type={type}
                                id={`${formID}answer`}
                                name="answerInput"
                                onChange={this.handleChange}
                            />
                        </label>
                    )
                }
            </>
        );
    }
}
