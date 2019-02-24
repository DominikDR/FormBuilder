const data = {
    a1: {
        id: 'a1',
        question: 'Do you own car?',
        subForms: ['b3'],
    },
    a2: {
        id: 'a2',
        question: 'What is your company name?',
        subForms: ['j9'],
    },
    b2: {
        id: 'b2',
        parentID: 'b3',
        question: 'What color is your Ford?',
        type: 'text',
        subForms: [],
    },
    b3: {
        id: 'b3',
        parentID: 'a1',
        question: 'What is your car`s model?',
        type: 'text',
        subForms: ['b2', 'j8'],
    },
    j8: {
        id: 'j8',
        parentID: 'b3',
        question: 'How old is your Ford?',
        type: 'number',
        subForms: [],
    },
    j9: {
        id: 'j9',
        parentID: 'a2',
        question: 'How long are working there?',
        type: 'text',
        subForms: [],
    },
};

export { data };
