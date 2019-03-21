import { conditionOption, radioOptions } from './selectOptions';

export const getInitialConditions = (formType) => {
    const defaultConditon = conditionOption[formType][0].value;
    if (formType === 'radio') {
        return {
            condition: defaultConditon,
            comparisonValue: radioOptions[0].value,
        };
    }
    return {
        condition: defaultConditon,
        comparisonValue: '',
    };
};
