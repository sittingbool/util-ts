/**
 * Determines if a string is empty or not a string at all.
 * @param string - string to be checked
 * @return {boolean} - true if not a string or empty (zero length of characters; ' ' will return false)
 */
//-----------------------------------------------------------------------------------------------------
export function stringIsEmpty( string: string)
//-----------------------------------------------------------------------------------------------------
{
    return ( typeof string !== 'string' || string.length < 1 );
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
            pluralChar = 'es';
            break;

        case 'y':
            string = string.substring(0, string.length -1);
            pluralChar = 'ies';
            break;

        case 'x':
            if ( string.charAt( string.length-2) === 'e' ) { // e before x becomes i
                string = string.substring(0, string.length -2) + 'i';
            } else {
                string = string.substring(0, string.length - 1);
            }
            pluralChar = 'ces';
            break;

        default:
            break;
    }

    return string + pluralChar;
}


//------------------------------------------------------------------------------------------------------
export function arrayIsEmpty(arr): boolean
//------------------------------------------------------------------------------------------------------
{
    return ! arr || !Array.isArray(arr) || arr.length < 1;
}