# util-ts
Lightweight custom Typescript utility

## offers the following functions

- `stringIsEmpty(value: string): boolean` - returns true is the given value is not a string or empty
- `capitalize(value: string): string` - returns the given string with an upper cased first character
- `pluralize(value: string): string` - returns the given string as plural (like onion -> onions or entity -> entities) with different detection of word endings (like y -> ies)
- `arrayIsEmpty(value: any[]): boolean` - returns true is the given array is not an array or empty
- `mapIsEmpty(value: any): boolean` - returns true is the given object is not an object or has no properties (meaning equals: `{})
- `loadPackageInfo(fpath: string, key?:string): any` - returns the package.json given in `fpath`, optionally you can return a specific key's value by setting `key`

read tests in https://github.com/sittingbool/util-ts/blob/master/test/util.spec.ts

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
