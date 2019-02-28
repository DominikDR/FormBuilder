import React from 'react';
import { conditionOption, radioOptions } from '../../selectOptions';
import { Select } from '../Select/Select';

export class Condition extends React.PureComponent {
    state = {
        radio: 'yes',
        answerInput: '',
    };

    handleSelectedCondition = (event) => {
        const { onConditionSelect } = this.props;
        const { radio, answerInput } = this.state;
        const conditions = [event.target.value, answerInput || radio];
        onConditionSelect(conditions);
    }

    handleRadioOption = (event) => {
        this.setState({
            radio: event.target.value,
        });
    }

    handleAnswerInput = (event) => {
        this.setState({
            answerInput: event.target.value,
        });
    }

    render() {
        const { formID, type } = this.props;
        return (
            <>
                <span>Condition</span>
                <Select options={conditionOption[type]} onChange={this.handleSelectedCondition} />
                {type === 'radio'
                    ? <Select options={radioOptions} onChange={this.handleRadioOption} />
                    : (
                        <label htmlFor={`${formID}answer`}>
                            answer
                            <input
                                type={type}
                                id={`${formID}answer`}
                                onChange={this.handleAnswerInput}
                            />
                        </label>
                    )
                }
            </>
        );
    }
}
