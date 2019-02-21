import React from 'react';
import styles from './Select.css';

const Select = ({ options }) => {
    console.log('TCL: Select -> options', options);
    return (
        <select
            id="questionType"
            type="typeSelect"
            defaultValue="default"
            required
        >
            <option value="default" disabled>
                Select a value ...
            </option>
            {options.map((option, index) => (
                <option key={`${option.label}${index}`} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export { Select };
