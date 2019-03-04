import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Input.css';

export const Input = ({ id, labelText, type, name, onChange, defaultValue, className }) => (
    <div className={className}>
        <label htmlFor={id} className={styles.label}>
            <span className={classnames({ [styles.labelText]: labelText })}>{labelText}</span>
            <input
                id={id}
                type={type}
                name={name}
                onChange={onChange}
                defaultValue={defaultValue}
                className={styles.input}
            />
        </label>
    </div>
);

Input.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    labelText: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    className: PropTypes.string,
};
