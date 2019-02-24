import React, { Fragment } from 'react';
import { conditionOption, radioOptions } from '../../selectOptions';
import { Select } from '../Select/Select';

const Condition = ({ type, handleSelect }) => {
    if (type === 'radio') {
        return (
            <>
                <span>Condition</span>
                <Select options={conditionOption[type]} />
                <Select options={radioOptions} />
            </>
        );
    }
    return (
        <>
            <span>Condition</span>
            <Select options={conditionOption[type]} />
            <label htmlFor="answer">
                <input type={type} id="answer" />
            </label>
        </>
    );
};

export { Condition };
