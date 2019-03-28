const sumNestedForms = (state, id) => {
    const { subForms } = state[id];
    return [...subForms, ...subForms.map(subformID => sumNestedForms(state, subformID)).flat()];
};

export const deleteForm = (state, clickedFormID) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    const nestedForms = sumNestedForms(stateCopy, clickedFormID);
    nestedForms.forEach((id) => { delete stateCopy[id]; });

    const { parentID } = stateCopy[clickedFormID];
    if (stateCopy[parentID]) {
        stateCopy[parentID].subForms = stateCopy[parentID].subForms.filter(id => id !== clickedFormID);
    }

    delete stateCopy[clickedFormID];
    stateCopy.formsInSequence = stateCopy.formsInSequence.filter(id => id !== clickedFormID);
    return stateCopy;
};
