import _random from 'lodash.random';
import { MIN_RANGE, MAX_RANGE } from './consts';
import { getInitialConditions } from './getInitialConditions';

export const createForm = (parentID, formType) => {
    const newForm = {
        id: _random(MIN_RANGE, MAX_RANGE),
        parentID,
        conditions: formType ? getInitialConditions(formType) : formType,
        type: 'radio',
        subForms: [],
    };
    return newForm;
};
