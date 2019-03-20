import { data } from '../data';
import { ADD_FORM } from '../actions/formTree';

const formTreeReducer = (state = data, action) => {
    switch (action.type) {
        case ADD_FORM: {
            const newForm = action.payload;
            return {
                ...state,
                formsInSequence: [...state.formsInSequence, newForm.id],
                [newForm.id]: newForm,
            };
        }
        default:
            return state;
    }
};

export { formTreeReducer };
