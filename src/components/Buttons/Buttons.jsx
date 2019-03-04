import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Buttons.css';

const Button = ({ onClick, className, text }) => (
    <button
        type="button"
        onClick={onClick}
        className={classnames(styles.formButton, className)}
    >
        {text}
    </button>
);

const AddButton = props => <Button className={styles.addButton} {...props} />;
const DeleteButton = props => <Button className={styles.deleteButton} {...props} />;

export {
    Button,
    AddButton,
    DeleteButton,
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    className: PropTypes.string,
};
