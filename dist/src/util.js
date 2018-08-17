"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isBrowser() {
    return (typeof window !== 'undefined');
}
let _fs;
let _path;
if (!isBrowser()) {
    _fs = require('fs');
    _path = require('path');
}
else {
    _fs = null;
    _path = null;
}
const fs = _fs;
const path = _path;
const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function stringIsEmpty(string) {
    return (typeof string !== 'string' || !string);
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
        case 'x':
            pluralChar = 'es';
            break;
        case 'y':
            string = string.substring(0, string.length - 1);
            pluralChar = 'ies';
            break;
        default:
            break;
    }
    return string + pluralChar;
}
exports.pluralize = pluralize;
function randomString(length, chars = RANDOMIZE_CHARSET_DEFAULT) {
    let result = '', i;
    for (i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
exports.randomString = randomString;
function arrayIsEmpty(arr) {
    return !Array.isArray(arr) || arr.length < 1;
}
exports.arrayIsEmpty = arrayIsEmpty;
function mapIsEmpty(map) {
    return !map || typeof map !== 'object' || Object.keys(map).length < 1;
}
exports.mapIsEmpty = mapIsEmpty;
function loadPackageInfo(fpath, key) {
    let content;
    let data = {};
    if (!fs || !path) {
        console.log('loadPackageInfo only works if you can require node.js module `fs`');
        return null;
    }
    try {
        content = fs.readFileSync(path.join(fpath, 'package.json'), 'utf8');
        data = JSON.parse(content);
    }
    catch (err) {
        console.error(err);
        return data || {};
    }
    if (!stringIsEmpty(key)) {
        return data[key];
    }
    return data;
}
exports.loadPackageInfo = loadPackageInfo;
//# sourceMappingURL=util.js.map