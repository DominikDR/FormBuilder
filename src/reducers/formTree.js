import { data } from '../data';
import { ADD_FORM, ADD_SUB_FORM, DELETE_FORM, SET_CONDITIONS } from '../actions/formTree';
import { deleteForm } from '../deleteForm';

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
        case DELETE_FORM: {
            const clickedFormID = action.payload;
            return deleteForm(state, clickedFormID);
        }
        case SET_CONDITIONS: {
            const { id, conditionData: { condition, radio, answerInput } } = action.payload;
            const previousValue = state[id].conditions;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    conditionData: {
                        condition: condition || previousValue.condition,
                        comparisonValue: radio || answerInput || previousValue.comparisonValue,
                    },
                },
            };
        }
        default:
            return state;
    }
};

export { formTreeReducer };
