import React from 'react';
import { conditionOption, radioOptions } from '../../selectOptions';
import { Select } from '../Select/Select';

export class Condition extends React.PureComponent {
    state = {
        selectedValue: 'equals',
        radio: 'yes',
        answerInput: '',
    };

    onChange = () => {
        const { onConditionSelect } = this.props;
        const { radio, answerInput, selectedValue } = this.state;
        const conditions = [selectedValue, answerInput || radio];
		console.log('TCL: Condition -> onChange -> conditions', conditions)
        onConditionSelect(conditions);
    }

    handleChange = (event) => {
		console.log('TCL: Condition -> handleChange -> event', event)
        const { target: { name, value } } = event;
        /* const target = event.target;
        const name = target.name;
        const value = target.value; */
        this.setState({
            [name]: value,
        });
    }
    /* handleRadioOption = (event) => {
        this.setState({
            radio: event.target.value,
        });
    }

    handleAnswerInput = (event) => {
        this.setState({
            answerInput: event.target.value,
        });
    } */

    render() {
        const { formID, type } = this.props;
        return (
            <>
                <span>Condition</span>
                <Select options={conditionOption[type]} onChange={this.handleSelectedCondition} name="selectedValue" />
                {type === 'radio'
                    ? <Select options={radioOptions} onChange={this.handleRadioOption} name="radio" />
                    : (
                        <label htmlFor={`${formID}answer`}>
                            answer
                            <input
                                type={type}
                                id={`${formID}answer`}
                                name="answerInput"
                                onChange={this.handleAnswerInput}
                            />
                        </label>
                    )
                }
            </>
        );
    }
}
