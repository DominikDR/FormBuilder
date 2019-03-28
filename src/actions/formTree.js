export const ADD_FORM = 'ADD_FORM';
export const ADD_SUB_FORM = 'ADD_SUB_FORM';
export const DELETE_FORM = 'DELETE_FORM';

export const addForm = (newForm => ({
    type: ADD_FORM,
    payload: newForm,
}));

export const addSubForm = (newForm => ({
    type: ADD_SUB_FORM,
    payload: newForm,
}));

export const deleteForm = (clickedFormID => ({
    type: DELETE_FORM,
    payload: clickedFormID,
}));
