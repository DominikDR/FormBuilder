import React, { Fragment } from 'react';
import { conditionOption, radioOptions } from '../../selectOptions';
import { Select } from '../Select/Select';

const Condition = ({ type }) => {
	console.log('TCL: Condition -> type', type)
    /* switch (type) {
        case 'text':
            return (
                <>
                    <span>Condition</span>
                    <Select options={conditionOption[type]} />
                    <label htmlFor="answer">
                        <input type={type} id="answer" />
                    </label>
                </>
            );
        case 'number':
            return (
                <>
                    <span>Condition</span>
                    <Select options={conditionOption[type]} />
                    <label htmlFor="answer">
                        <input type={type} id="answer" />
                    </label>
                </>
            );
        case 'radio':
            return (
                <>
                    <span>Condition</span>
                    <Select options={conditionOption[type]} />
                    <Select options={radioOptions} />
                </>
            );
        default:
            return null;
    } */
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
