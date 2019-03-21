import { data } from '../data';
import { ADD_FORM, ADD_SUB_FORM } from '../actions/formTree';

const formTreeReducer = (state = data, action) => {
	console.log('TCL: formTreeReducer -> action', action)
    switch (action.type) {
        case ADD_FORM: {
            const newForm = action.payload;
            return {
                ...state,
                formsInSequence: [...state.formsInSequence, newForm.id],
                [newForm.id]: newForm,
            };
        }
        case ADD_SUB_FORM: {
            const newForm = action.payload;
            return {
                ...state,
                [newForm.parentID]: {
                    ...state[newForm.parentID],
                    subForms: [...state[newForm.parentID].subForms, newForm.id],
                },
                [newForm.id]: newForm,
            };
        }
        default:
            return state;
    }
};

export { formTreeReducer };
