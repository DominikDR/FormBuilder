const data = {
    a1: {
        id: 'a1',
        subForms: ['b3'],
    },
    a2: {
        id: 'a2',
        subForms: ['j9'],
    },
    b2: {
        id: 'b2',
        parentID: 'b3',
        subForms: [],
    },
    b3: {
        id: 'b3',
        parentID: 'a1',
        subForms: ['b2', 'j8'],
    },
    j8: {
        id: 'j8',
        parentID: 'b3',
        subForms: [],
    },
    j9: {
        id: 'j9',
        parentID: 'a2',
        subForms: [],
    },
};

export default data;
