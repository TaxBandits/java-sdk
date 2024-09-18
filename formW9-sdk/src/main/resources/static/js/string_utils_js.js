// Check whether the string value is valid or not
function isValidString(value) {
    return  value !== null && value !== "" && value !== undefined && value.length > 0 && value !== "null";
}

// Check whether the string value is valid or not and return the string or '-'
function stringOrHyphen(value) {
    if(isValidString(value))
        return value.trim();
    else return '-';
}

// Check whether the long value is valid or not and return the long or '-'
function longOrHyphen(value) {
    if(isValidLong(value))
        return value;
    else return '-';
}

// Check whether the long value is valid or not
function isValidLong(value) {
    return  value !== null;
}
