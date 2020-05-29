"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let _fs;
let _path;
let _util;
function isBrowser() {
    return (typeof window !== 'undefined');
}
const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const defaultArrayItemSame = (left, right) => {
    return JSON.stringify(left) === JSON.stringify(right);
};
function setupSbUtil(options) {
    _fs = options.fs;
    _path = options.path;
    _util = options.util;
}
exports.setupSbUtil = setupSbUtil;
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
function loadJSONFromFile(filePath, nodejs) {
    return __awaiter(this, void 0, void 0, function* () {
        const fs = _fs || nodejs ? nodejs.fs : null;
        const util = _util || nodejs ? nodejs.util : null;
        if (!fs || !util) {
            console.error('loadJSONFromFile only works if you can require node.js module `fs` and `util`');
            return null;
        }
        const readFile = util.promisify(fs.readFile);
        const content = yield readFile(filePath, 'utf8');
        return JSON.parse(content);
    });
}
exports.loadJSONFromFile = loadJSONFromFile;
function loadJSONFromFileSync(filePath, fs) {
    fs = _fs || fs;
    if (!fs) {
        console.error('loadJSONFromFileSync only works if you can require node.js module `fs`');
        return null;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
}
exports.loadJSONFromFileSync = loadJSONFromFileSync;
function loadPackageInfo(filePath, key, nodejs) {
    const fs = _fs || nodejs ? nodejs.fs : null;
    const path = _path || nodejs ? nodejs.path : null;
    if (!fs || !path) {
        console.error('loadPackageInfo only works if you can require node.js module `fs` and `path`');
        return null;
    }
    let data;
    try {
        data = loadJSONFromFileSync(path.join(filePath, 'package.json'), fs);
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
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
exports.sleep = sleep;
//# sourceMappingURL=util.js.map