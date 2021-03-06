# util-ts
Lightweight Typescript utility for

- checking that a variable is a non-empty string, array or object
- pluralizing english words
- capitalizing words
- loading JSON files and package json parameters
- comparing arrays
- getting a bool value from a string expression (like env var)
- making a random number from range
- ... many more ... just read below:

## offers the following functions

- `stringIsEmpty(value: string): boolean` - returns true is the given value is not a string or empty
- `capitalize(value: string): string` - returns the given string with an upper cased first character
- `pluralize(value: string): string` - returns the given string as plural (like onion -> onions or entity -> entities) with different detection of word endings (like y -> ies)
- `randomString(length: number, chars?: string): string` - returns a random string with the given length. Optionally takes a list of chars that the random string is allowed to contain in form of a string.
- `arrayIsEmpty(value: any[]): boolean` - returns true is the given array is not an array or empty
- `mapIsEmpty(value: any): boolean` - returns true is the given object is not an object or has no properties (meaning equals: `{}`)
- `loadPackageInfo(fpath: string, key?:string, nodejs?: {fs: 'module:fs', path: 'module:path'}): any` 
    - returns the package.json given in `fpath`, optionally you can return a specific key's value by setting `key`
    - ATTENTION: needs fs and path from nodejs either as function parameter or setup like so:
  ```
   import * as fs from 'fs';
   import * as path from 'path';
   //import * as util from 'util'; // optional
  
   setupSbUtil({fs, path});
   //setupSbUtil({fs, path, util}); // optional
  
  // ALTERNATIVE
  const version = loadPackageInfo('.', 'version', {fs, path}) as string;
  ```
- `loadJSONFromFileSync(filePath: string, fs?: any): any` - returns the parsed contents of a json file using the given fs or from setupSbUtil (see above)
- `async loadJSONFromFile(filePath: string, nodejs?: {fs: any, util: any}): Promise<any>` - returns the parsed contents of a json file using the given fs or from setupSbUtil (see above)
- `compareArrays(left: any[], right: any[], comp?: ArrayItemSame, fullComp?: ArrayItemSame): ArrayCompareResult` - Array comparator for full change detection. You can optionally add a compare - function that identifies ignoring changes (e.g. by a single property such as the id of a db object) and also a full comparison callback that returns true if there are no changes. Both default to comparing via JSON.stringify. Please read the comments in the src file. Types meaning:
    - ArrayCompareResult = `{ onlyInLeft: any[], changed: any[], same: any[],onlyInRight: any[] }`
    - ArrayItemSame = `(left: any, right: any) => boolean`
- `boolFromString(value: string, trim: boolean = true): boolean | undefined` - returns true if a string made lower case equals 'yes', 'true' or '1', false if equals 'no', 'false', '0', in all other cases returns undefined
- `randomNumberForRange(min: number, max: number): number` - returns a random number in the range between the given min and max parameters (including min and max)
- `sleep(milliseconds: number): Promise<void>` - promised sleep function for ussage with await. e.g. `await sleep(1500); // continues in next line after 1.5 sek`
- `numberOfMatches(value: string, expression: RegExp | string, caseSensitive = false): number` - checks how often an expression can be found in a string
- `clone<T = any>(data: T, deep = 1): T` - clones an object, array or string including contents by the depth of `deep` to a new instance
- `prefixObjectKeys<T>(data: T, prefix: string): any` - will return a new object by adding the prefix string to every single key. eg { name: 'Jim', age: 12 } plus `prefix` '_' => { _name: 'Jim', _age: 12 }
- `stripString(value: string, allowedChars: string | string[], caseSensitive = false): string` - returns a new string containing all chars that are in value and allowedChars. e.g. `stripString('Hello World', 'ael')` return `'elll'`

For more details:
- read comments in https://github.com/sittingbool/util-ts/blob/master/src/util.ts
- read tests in https://github.com/sittingbool/util-ts/blob/master/test/util.spec.ts

## Custom types

- `interface IMap<T = string> { [key: string]: T }` a key - value map where the key is always a string and the value is string by default but may be changed using the generic. This prevents the use of `any` for plain JS objects.
- `interface IMapAny { [key: string]: any }` a key - value map where the key is always a string and the value is any. This prevents the use of `any` for plain JS objects, even as a generic.

## browser support before version 2.0
- is given since 1.1.1 (checking if `window` exists)
- if you add it to angular 4+ please add this to your package.json to make ng serve possible without error:

```
"browser": {
    "fs": false,
    "path": false,`
    "os": false
}
```

Otherwise you will get a warning that `fs` or `path` cannot be found. Also the `loadPackageInfo` function will not be working without fs and path.
