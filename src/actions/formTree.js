export const ADD_FORM = 'ADD_FORM';

export const addForm = (newForm => ({
    type: ADD_FORM,
    payload: newForm,
}));
