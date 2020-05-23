//-----------------------------------------------------------------------------------------------------
function isBrowser() {
    return (typeof window !== 'undefined');
}

const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export type ArrayItemSame = (left: any, right: any) => boolean;
const defaultArrayItemSame = (left: any, right: any) => {
    return JSON.stringify(left) === JSON.stringify(right);
};

export interface ArrayCompareResult {
    onlyInLeft: any[];
    changed: any[];
    same: any[];
    onlyInRight: any[];
}
//-----------------------------------------------------------------------------------------------------

/**
 * Determines if a string is empty or not a string at all.
 * @param string - string to be checked
 * @return {boolean} - true if not a string or empty (zero length of characters; ' ' will return false)
 */
export function stringIsEmpty( string: string | undefined): boolean {
    return ( typeof string !== 'string' || !string );
}


/**
 * Returns given string with a capital first letter
 * @param string - string to be altered
 * @return {string} - string as given just with capital first letter
 */
export function capitalize( string:string): string {
    let firstChar;

    if ( stringIsEmpty(string) ) {
        return string;
    }

    firstChar = string.charAt(0);

    string = string.substr(1);

    string = firstChar.toUpperCase() + string;

    return string;
}


/**
 * Returns the plurals english word for a given singular word.
 * E.g. House -> Houses, Address -> Addresses, City -> Cities
 * @param string - the singular english word
 * @return {string} - the plural english word
 */
export function pluralize( string:string): string {
    let lastChar, pluralChar = 's';

    if ( stringIsEmpty(string) ) {
        return string;
    }

    lastChar = string.charAt( string.length-1);

    switch ( lastChar ) {
        case 's':
        case 'x':
            pluralChar = 'es';
            break;

        case 'y':
            string = string.substring(0, string.length -1);
            pluralChar = 'ies';
            break;

        default:
            break;
    }

    return string + pluralChar;
}


/**
 * Returns a random string with the defined length and the characters given
 * @param length - the number of characters the random string should have
 * @param chars - (optional) a string containing all chars that should be represented in the random string,
 * defaults to '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
 * @return {string} - the random string
 */
export function randomString(length: number, chars: string = RANDOMIZE_CHARSET_DEFAULT): string {
    let result = '', i;
    for (i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}


export function arrayIsEmpty(arr: any[] | undefined): boolean {
    return !Array.isArray(arr) || arr.length < 1;
}


export function mapIsEmpty(map: any | undefined): boolean { // object with string as keys has no strings or is no object
    return ! map || typeof map !== 'object' || Object.keys(map).length < 1;
}

export function loadPackageInfo(filePath: string, key?:string): any {
    let _fs;
    let _path;
    if (!isBrowser()) {
        _fs = require( 'fs');
        _path = require( 'path');
    } else {
        _fs = null;
        _path = null;
    }
    const fs = _fs;
    const path = _path;

    let content:string;
    let data = {};

    if (!fs || !path) {
        console.log('loadPackageInfo only works if you can require node.js module `fs`');
        return null;
    }

    try {
        content = fs.readFileSync(path.join(filePath, 'package.json'), 'utf8');
        data = JSON.parse(content);
    } catch(err) {
        console.error(err);
        return data || {};
    }

    if ( !stringIsEmpty(key) ) {
        return data[key];
    }

    return data;
}

/**
 * Array comparator for full change detection
 * Compares two arrays for items that are the same, items that have updates, items that only exist in the one ot the other
 * @param left - the one array to be compared with right
 * @param right - the other array to be compared with left
 * @param comp - an optional function that returns true if the two given items are the same in both arrays, ignoring changes (e.g. compared by id), defaults to a comparison using JSON.stringify
 * @param fullComp - an optional function that returns true if the two given items are the same all data, defaults to a comparison using JSON.stringify if comp is a custom function, otherwise ignored
 */
export function compareArrays(left: any[], right: any[], comp?: ArrayItemSame, fullComp?: ArrayItemSame): ArrayCompareResult {
    let result: ArrayCompareResult = { onlyInLeft: [], changed: [], same: [], onlyInRight: [] };
    let sameInRight: any[] = [];
    let changedInRight: any[] = [];
    comp = comp || defaultArrayItemSame;
    fullComp = fullComp || defaultArrayItemSame;
    result.same = left.filter(item => {
        for(let i = 0; i < right.length; i++) {
            if (comp(item, right[i]) && ( comp === fullComp || fullComp(item, right[i]) )) {
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

export function boolFromString(value: string, trim: boolean = true): boolean | undefined {
    if (stringIsEmpty(value)) return;
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

export function randomNumberForRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
