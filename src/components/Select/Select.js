import React from 'react';
import styles from './Select.css';

const Select = ({ options, onChange, name }) => {
    return (
        // eslint-disable-next-line jsx-a11y/no-onchange
        <select
            id="conditionType"
            name={name}
            type="typeSelect"
            defaultValue={options[0].value}
            required
            onChange={onChange}
        >
            {options.map((option, index) => (
                <option key={`${option.label}${index}`} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export { Select };
