"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isBrowser() {
    return (typeof window !== 'undefined');
}
const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const defaultArrayItemSame = (left, right) => {
    return JSON.stringify(left) === JSON.stringify(right);
};
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
function loadPackageInfo(filePath, key) {
    let _fs;
    let _path;
    try {
        if (!isBrowser()) {
            _fs = require('fs');
            _path = require('path');
        }
    }
    catch (err) {
        _fs = null;
        _path = null;
    }
    const fs = _fs;
    const path = _path;
    let content;
    let data = {};
    if (!fs || !path) {
        console.error('loadPackageInfo only works if you can require node.js module `fs`');
        return null;
    }
    try {
        content = fs.readFileSync(path.join(filePath, 'package.json'), 'utf8');
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
function compareArrays(left, right, comp, fullComp) {
    let result = { onlyInLeft: [], changed: [], same: [], onlyInRight: [] };
    let sameInRight = [];
    let changedInRight = [];
    comp = comp || defaultArrayItemSame;
    fullComp = fullComp || defaultArrayItemSame;
    result.same = left.filter(item => {
        for (let i = 0; i < right.length; i++) {
            if (comp(item, right[i]) && (comp === fullComp || fullComp(item, right[i]))) {
                sameInRight.push(right[i]);
                return true;
            }
        }
        return false;
    });
    if (comp !== fullComp) {
        result.changed = left.filter(item => {
            for (let i = 0; i < right.length; i++) {
                if (result.same.indexOf(item) < 0 && comp(item, right[i])) {
                    changedInRight.push(right[i]);
                    return true;
                }
            }
            return false;
        });
    }
    result.onlyInLeft = left.filter(item => result.same.indexOf(item) < 0 && result.changed.indexOf(item) < 0);
    result.onlyInRight = right.filter(item => sameInRight.indexOf(item) < 0 && changedInRight.indexOf(item) < 0);
    return result;
}
exports.compareArrays = compareArrays;
function boolFromString(value, trim = true) {
    if (stringIsEmpty(value))
        return;
    value = trim ? value.trim() : value;
    switch (value.toLowerCase()) {
        case 'no':
        case 'false':
        case '0':
            return false;
        case 'yes':
        case 'true':
        case '1':
            return true;
        default:
            return;
    }
}
exports.boolFromString = boolFromString;
function randomNumberForRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomNumberForRange = randomNumberForRange;
//# sourceMappingURL=util.js.map