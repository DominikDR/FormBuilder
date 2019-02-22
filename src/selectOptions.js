const type = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'radio', label: 'Yes / No' },
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

module.exports = {
    type,
    conditionOption,
    radioOptions,
};
