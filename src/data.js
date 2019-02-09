const data = {
    a1: {
        id: 'a1',
        subInputs: ['b3'],
    },
    a2: {
        id: 'a2',
        subInputs: ['j9'],
    },
    b2: {
        id: 'b2',
        parentID: 'b3',
        subInputs: [],
    },
    b3: {
        id: 'b3',
        parentID: 'a1',
        subInputs: ['b2', 'j8'],
    },
    j8: {
        id: 'j8',
        parentID: 'b3',
        subInputs: [],
    },
    j9: {
        id: 'j9',
        parentID: 'a2',
        subInputs: [],
    },
};

export default data;
