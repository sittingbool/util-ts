"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringIsEmpty(string) {
    return (typeof string !== 'string' || string.length < 1);
}
exports.stringIsEmpty = stringIsEmpty;
function capitalize(string) {
    let firstChar;
    if (stringIsEmpty(string)) {
        return string;
    }
    firstChar = string.charAt(0);
    string = string.substr(1);
    string = firstChar.toUpperCase() + string;
    return string;
}
exports.capitalize = capitalize;
function pluralize(string) {
    let lastChar, pluralChar = 's';
    if (stringIsEmpty(string)) {
        return string;
    }
    lastChar = string.charAt(string.length - 1);
    switch (lastChar) {
        case 's':
            pluralChar = 'es';
            break;
        case 'y':
            string = string.substring(0, string.length - 1);
            pluralChar = 'ies';
            break;
        case 'x':
            if (string.charAt(string.length - 2) === 'e') {
                string = string.substring(0, string.length - 2) + 'i';
            }
            else {
                string = string.substring(0, string.length - 1);
            }
            pluralChar = 'ces';
            break;
        default:
            break;
    }
    return string + pluralChar;
}
exports.pluralize = pluralize;
function arrayIsEmpty(arr) {
    return !arr || !Array.isArray(arr) || arr.length < 1;
}
exports.arrayIsEmpty = arrayIsEmpty;
//# sourceMappingURL=data.util.js.map