/// <reference types="node" />
import { IMap, IMapAny } from "./types";
export declare type WriteFileOptions = {
    encoding?: string | null | undefined;
    mode?: number | string | undefined;
    flag?: string | undefined;
} | string | null;
export declare function isBrowser(): boolean;
export declare type ArrayItemSame = (left: any, right: any) => boolean;
export interface ArrayCompareResult {
    onlyInLeft: any[];
    changed: any[];
    same: any[];
    onlyInRight: any[];
}
export declare function setupSbUtil(options?: {
    fs: any;
    path: any;
    util?: any;
}): void;
export declare function stringIsEmpty(string: string | undefined): boolean;
export declare function capitalize(string: string): string;
export declare function deCapitalize(string: string): string;
export declare function pluralize(string: string): string;
export declare function randomString(length: number, chars?: string): string;
export declare function stripString(value: string, allowedChars: string | string[], caseSensitive?: boolean): string;
export declare function arrayIsEmpty(arr: any[] | undefined): boolean;
export declare function mapIsEmpty(map: any | undefined): boolean;
export declare function loadJSONFromFile(filePath: string, nodejs?: {
    fs: any;
    util: any;
}): Promise<any>;
export declare function loadJSONFromFileSync(filePath: string, fs?: any): any;
export declare function loadPackageInfo(filePath: string, key?: string, nodejs?: {
    fs: any;
    path: any;
}): any;
export declare function compareArrays(left: any[], right: any[], comp?: ArrayItemSame, fullComp?: ArrayItemSame): ArrayCompareResult;
export declare function boolFromString(value: string, trim?: boolean): boolean | undefined;
export declare function randomNumberForRange(min: number, max: number): number;
export declare function sleep(milliseconds: number): Promise<void>;
export declare function numberOfMatches(value: string, expression: RegExp | string, caseSensitive?: boolean): number;
export declare function clone<T = any>(data: T, deep?: number): T;
export declare function prefixObjectKeys(data: any, prefix: string): any;
export declare function envVariable(varName: string, defaultValue: any, type?: 'string' | 'boolean' | 'int' | 'float'): string | boolean | number;
export declare function readFileAsync(path: any, options: {
    encoding?: null | undefined;
    flag?: string | undefined;
} | string | undefined | null, nodejs?: {
    fs: any;
    util: any;
}): Promise<string | Buffer>;
export declare function writeFileAsync(path: any, data: any, options: WriteFileOptions, nodejs?: {
    fs: any;
    util: any;
}): Promise<string | Buffer>;
export { IMap, IMapAny };
