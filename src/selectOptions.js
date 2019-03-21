const type = [
    { value: 'radio', label: 'Yes / No' },
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
];

const conditionOption = {
    text: [{ value: 'equals', label: 'Equals' }],
    number: [{
        value: 'equals', label: 'Equals',
    }, {
        value: 'greater', label: 'Greater than',
    }, {
        value: 'less', label: 'Less than',
    }],
    radio: [{ value: 'equals', label: 'Equals' }],
};

const radioOptions = [{
    value: 'yes', label: 'Yes',
}, {
    value: 'no', label: 'No',
}];

export {
    type,
    conditionOption,
    radioOptions,
};
