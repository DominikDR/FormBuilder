import React from 'react';

const Condition = ({ type }) => {
    switch (type) {
        case 'text':
            return (
                <form>
                    <span>Condition</span>
                    <select
                        id="conditionType"
                        type={type}
                    >
                        <option>
                            Equals
                        </option>
                    </select>
                    <label htmlFor="answer">
                        <input type="text" id="answer" />
                    </label>
                </form>
            );

        case 'radio':
            return (
                <form>
                    <span>Condition</span>
                    <select
                        id="conditionType"
                        type={type}
                    >
                        <option>
                            Equals
                        </option>
                    </select>
                </form>
            );
        default:
            return null;
    }
};

export { Condition };
