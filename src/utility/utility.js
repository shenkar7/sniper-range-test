import * as c from './constants';

export const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject,
        ...updatedProperties
    };
};

export const calculateScore = (ranges, guesses) => {

    if(ranges.length === 0 || guesses.length === 0)
        return "None";

    const allRangesQuantity = (c.MAX_RANGE - c.MIN_RANGE) / c.RANGES_STEPS + 1;
    const length = guesses.length;
    let score = 0;

    for(let i = 0; i < length; i++){
        let gap = Math.abs(guesses[i] / c.RANGES_STEPS - ranges[i] / c.RANGES_STEPS);
        score += gap / length;
    }

    score = Math.round((1 - score/allRangesQuantity) * 100);

    return score;
};

export const filterRangesByVision = (ranges, fields, vision) => {
    let finalRanges = [];
    for(let i=0; i<ranges.length; i++){
        if(fields[i].substring(fields[i].length - 1) === vision)
            finalRanges.push(ranges[i]);
    }
    return finalRanges;
}

export const creatingRandomRangesArray = () => {
    const ranges = [];
    const allRangesQuantity = (c.MAX_RANGE - c.MIN_RANGE) / c.RANGES_STEPS + 1;
    for(let i = 0; i < c.TARGETS_QUANTITY; i++){
        ranges.push(Math.floor(Math.random() * allRangesQuantity) * c.RANGES_STEPS + c.MIN_RANGE);
    }
    return ranges;
}

// 
export const creatingRandomFieldsArray = ranges => {
    const fields = [];
    const visionArray = ['d', 'n', 't']; // day, night, thermal
    let vision;

    for(let i = 0; i < c.TARGETS_QUANTITY; i++){
        vision = visionArray[Math.floor(Math.random() * visionArray.length)];

        if(ranges[i] > c.MEDIUM_RANGE_LIMIT)
            fields.push(`field2${vision}`);
        else if(ranges[i] <= c.CLOSE_RANGE_LIMIT)
            fields.push(`field0${vision}`);
        else
            fields.push(`field1${vision}`);
    }
    return fields;
}