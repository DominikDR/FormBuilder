import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Select.css';

const Select = ({ options, onChange, name, className }) => (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
        id="conditionType"
        name={name}
        type="typeSelect"
        defaultValue={options[0].value}
        onChange={onChange}
        className={classnames(styles.box, className)}
    >
        {options.map((option, index) => (
            <option key={`${option.label}${index}`} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

export { Select };

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};
