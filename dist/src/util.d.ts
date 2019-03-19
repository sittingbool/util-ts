export declare type ArrayItemSame = (left: any, right: any) => boolean;
export interface ArrayCompareResult {
    onlyInLeft: any[];
    changed: any[];
    same: any[];
    onlyInRight: any[];
}
export declare function stringIsEmpty(string: string | undefined): boolean;
export declare function capitalize(string: string): string;
export declare function pluralize(string: string): string;
export declare function randomString(length: number, chars?: string): string;
export declare function arrayIsEmpty(arr: any[] | undefined): boolean;
export declare function mapIsEmpty(map: any | undefined): boolean;
export declare function loadPackageInfo(filePath: string, key?: string): any;
export declare function compareArrays(left: any[], right: any[], comp?: ArrayItemSame, fullComp?: ArrayItemSame): ArrayCompareResult;
