# util-ts
Lightweight custom Typescript utility

## offers the following functions

- `stringIsEmpty(value: string): boolean` - returns true is the given value is not a string or empty
- `capitalize(value: string): string` - returns the given string with an upper cased first character
- `pluralize(value: string): string` - returns the given string as plural (like onion -> onions or entity -> entities) with different detection of word endings (like y -> ies)
- `randomString(length: number, chars?: string): string` - returns a random string with the given length. Optionally takes a list of chars that the random string is allowed to contain in form of a string.
- `arrayIsEmpty(value: any[]): boolean` - returns true is the given array is not an array or empty
- `mapIsEmpty(value: any): boolean` - returns true is the given object is not an object or has no properties (meaning equals: `{})
- `loadPackageInfo(fpath: string, key?:string): any` - returns the package.json given in `fpath`, optionally you can return a specific key's value by setting `key`
- `compareArrays(left: any[], right: any[], comp?: ArrayItemSame, fullComp?: ArrayItemSame): ArrayCompareResult` - Array comparator for full change detection. You can optionally add a compare - function that identifies ignoring changes (e.g. by a single property such as the id of a db object) and also a full comparison callback that returns true if there are no changes. Both default to comparing via JSON.stringify. Please read the comments in the src file. Types meaning:
    - ArrayCompareResult = `{ onlyInLeft: any[], changed: any[], same: any[],onlyInRight: any[] }`
    - ArrayItemSame = `(left: any, right: any) => boolean`
- `boolFromString(value: string, trim: boolean = true): boolean | undefined` - returns true if a string made lower case equals 'yes', 'true' or '1', false if equals 'no', 'false', '0', in all other cases returns undefined

For more details:
- read comments in in https://github.com/sittingbool/util-ts/blob/master/src/util.ts
- read tests in https://github.com/sittingbool/util-ts/blob/master/test/util.spec.ts

## browser support
- is now given since 1.1.1 (checking if `window exists)
- if you add it to angular 4+ please add this to your package.json to make ng serve possible without error:

```
"browser": {
    "fs": false,
    "path": false,`
    "os": false
}
```

Otherwise you will get an error that `fs` or `path` cannot be found.
