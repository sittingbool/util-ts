//-----------------------------------------------------------------------------------------------------
function isBrowser() {
    return (typeof window !== 'undefined');
}

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

const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//-----------------------------------------------------------------------------------------------------

/**
 * Determines if a string is empty or not a string at all.
 * @param string - string to be checked
 * @return {boolean} - true if not a string or empty (zero length of characters; ' ' will return false)
 */
//-----------------------------------------------------------------------------------------------------
export function stringIsEmpty( string: string): boolean
//-----------------------------------------------------------------------------------------------------
{
    return ( typeof string !== 'string' || !string );
}


/**
 * Returns given string with a capital first letter
 * @param string - string to be altered
 * @return {string} - string as given just with capital first letter
 */
//------------------------------------------------------------------------------------------------------
export function capitalize( string:string): string
//------------------------------------------------------------------------------------------------------
{
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
//------------------------------------------------------------------------------------------------------
export function pluralize( string:string): string
//------------------------------------------------------------------------------------------------------
{
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
//------------------------------------------------------------------------------------------------------
export function randomString(length: number, chars: string = RANDOMIZE_CHARSET_DEFAULT): string
//------------------------------------------------------------------------------------------------------
{
    let result = '', i;
    for (i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}


//------------------------------------------------------------------------------------------------------
export function arrayIsEmpty(arr): boolean
//------------------------------------------------------------------------------------------------------
{
    return !Array.isArray(arr) || arr.length < 1;
}


//------------------------------------------------------------------------------------------------------
export function mapIsEmpty(map): boolean // object with string as keys has no strings or is no object
//------------------------------------------------------------------------------------------------------
{
    return ! map || typeof map !== 'object' || Object.keys(map).length < 1;
}


//------------------------------------------------------------------------------------------------------
export function loadPackageInfo(fpath: string, key?:string): any
//------------------------------------------------------------------------------------------------------
{
    let content:string;
    let data = {};

    if (!fs || !path) {
        console.log('loadPackageInfo only works if you can require node.js module `fs`');
        return null;
    }

    try {
        content = fs.readFileSync(path.join(fpath, 'package.json'), 'utf8');
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