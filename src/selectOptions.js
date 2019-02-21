const type = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'radio', label: 'Yes / No' },
];

const condition = {
    text: ['Equals'],
    number: ['Equals', 'Greater than', 'Less than'],
    radio: ['Equals'],
};

module.exports = {
    type,
    condition,
};
