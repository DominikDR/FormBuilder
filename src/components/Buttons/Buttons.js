import React from 'react';
import classnames from 'classnames';

import styles from './Buttons.css';

const Button = ({ type, onClick, className, text}) => (
    <button
        type={type}
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
