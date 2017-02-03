export const summarizeData = (arr, filterFn)=>{
    if (!arr || !arr.length)
        return;
    return arr.filter(it=>{
        if (filterFn)
            return filterFn(it);
        return it;
    }).slice(0,6);
}

export const convertToLookup = (arr, valField, labelField)=>{
    if (!arr || !arr.length)
        return;
    return arr.map(a=>{
        return {value: a[valField], label: a[labelField]};
    })
}