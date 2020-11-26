//-----------------------------------------------------------------------------------------------------
let _fs;
let _path;
let _util;

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

export function setupSbUtil(options: {fs: any, path: any, util?: any}) {
    _fs = options.fs;
    _path = options.path;
    _util = options.util;
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


export async function loadJSONFromFile(filePath: string, nodejs?: {fs: any, util: any}): Promise<any> {
    const fs = _fs || nodejs ? nodejs.fs : null;
    const util = _util || nodejs ? nodejs.util : null;

    if (!fs || !util) {
        console.error('loadJSONFromFile only works if you can require node.js module `fs` and `util`');
        return null;
    }

    const readFile = util.promisify(fs.readFile);
    const content = await readFile(filePath, 'utf8');
    return JSON.parse(content);
}


export function loadJSONFromFileSync(filePath: string, fs?: any): any {
    fs = _fs || fs;

    if (!fs) {
        console.error('loadJSONFromFileSync only works if you can require node.js module `fs`');
        return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
}


export function loadPackageInfo(filePath: string, key?:string, nodejs?: {fs: any, path: any}): any {
    const fs = _fs || nodejs ? nodejs.fs : null;
    const path = _path || nodejs ? nodejs.path : null;

    if (!fs || !path) {
        console.error('loadPackageInfo only works if you can require node.js module `fs` and `path`');
        return null;
    }

    let data;
    try {
        data = loadJSONFromFileSync(path.join(filePath, 'package.json'), fs);
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

export function sleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * checks how often an expression can be found in a string
 * @param value - the string to be looking into
 * @param expression - the RegExp or string that should be searched for
 * @param caseSensitive - if expression is a string this can be to true if you need to check case sensitive
 */
export function numberOfMatches(value: string, expression: RegExp | string, caseSensitive = false): number {
    if (stringIsEmpty(value)) return 0;
    if (typeof expression === 'string') {
        expression = new RegExp(expression, caseSensitive ? 'g' : 'ig');
    }
    return (value.match(expression) || []).length;
}


/**
 * clones your data to a new instance
 * @param data - the object, array or string to clone. other types will be returned as is
 * @param deep - should clone contents as well if object or array by level of this number value (1 = next level, 2 = next level and in that one, ...)
 */
export function clone<T = any>(data: T, deep = 1): T {
    switch (typeof data) {
        case "string":
            return <any>('' + data);
        case "object":
            if (data === null) return data;
            if (Array.isArray(data)) {
                if (deep > 0) return <any>data.map(item => clone<any>(item, deep - 1));
                return <any>[].concat(data);
            }
            if (deep > 0) {
                const result: any = {};
                for(const k in data) {
                    result[k] = clone<any>(data[k], deep - 1);
                }
                return result;
            }
            return Object.assign({}, data);
        default: return data;
    }
}
