"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const util_1 = require("../src/util");
const should = require("should");
const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let UtilTest = class UtilTest {
    assert_stringIsEmpty() {
        let test;
        should(util_1.stringIsEmpty(test)).be.true();
        should(util_1.stringIsEmpty('')).be.true();
        should(util_1.stringIsEmpty(' ')).be.false();
        should(util_1.stringIsEmpty('test')).be.false();
    }
    assert_arrayIsEmpty() {
        let test;
        should(util_1.arrayIsEmpty(test)).be.true();
        should(util_1.arrayIsEmpty([])).be.true();
        should(util_1.arrayIsEmpty([null])).be.false();
        should(util_1.arrayIsEmpty([{}])).be.false();
    }
    assert_capitalize() {
        should(util_1.capitalize('test')).be.equal('Test');
        should(util_1.capitalize('Test')).be.equal('Test');
    }
    assert_pluralize() {
        should(util_1.pluralize('test')).be.equal('tests');
        should(util_1.pluralize('index')).be.equal('indexes');
        should(util_1.pluralize('house')).be.equal('houses');
        should(util_1.pluralize('entity')).be.equal('entities');
    }
    assert_randomString() {
        let allChars = RANDOMIZE_CHARSET_DEFAULT.split('');
        let random = util_1.randomString(10);
        should(random).be.a.String();
        should(random.length).be.exactly(10);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);
        random = util_1.randomString(23);
        should(random).be.a.String();
        should(random.length).be.exactly(23);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);
        let allCharsAllowed = 'lkjhdfas!98';
        allChars = allCharsAllowed.split('');
        random = util_1.randomString(50, allCharsAllowed);
        should(random).be.a.String();
        should(random.length).be.exactly(50);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);
    }
    assert_mapIsEmpty() {
        let test;
        should(util_1.mapIsEmpty(test)).be.true();
        should(util_1.mapIsEmpty(null)).be.true();
        should(util_1.mapIsEmpty([])).be.true();
        should(util_1.mapIsEmpty({})).be.true();
        should(util_1.mapIsEmpty({ key: '' })).be.false();
        should(util_1.mapIsEmpty({ key: true })).be.false();
        should(util_1.mapIsEmpty({ key: 1 })).be.false();
        should(util_1.mapIsEmpty({ key: null })).be.false();
    }
    assert_compareArrays() {
        const result = util_1.compareArrays([{ a: 1 }, { b: 2 }, 2, 3, 'test1', 'test2', 'test3'], [{ a: 3 }, { b: 2 }, 2, 3, 4, 'test1', 'test2']);
        should(JSON.stringify(result.same)).be.eql(JSON.stringify([{ b: 2 }, 2, 3, 'test1', 'test2']));
        should(result.changed.length).be.exactly(0);
        should(result.onlyInLeft.length).be.exactly(2);
        should(JSON.stringify(result.onlyInLeft)).be.eql(JSON.stringify([{ a: 1 }, 'test3']));
        should(result.onlyInRight.length).be.exactly(2);
        should(JSON.stringify(result.onlyInRight)).be.eql(JSON.stringify([{ a: 3 }, 4]));
    }
    assert_compareArraysByComparator() {
        const comparator = (left, right) => {
            switch (typeof left) {
                case 'object':
                    if (!left || !right) {
                        return left === right;
                    }
                    const key = Object.keys(left)[0];
                    return left[key] !== undefined && right[key] !== undefined;
                default:
                    return left === right;
            }
        };
        const result = util_1.compareArrays([{ a: 1 }, { b: 2 }, 2, 3, 'test1', 'test2', 'test3'], [{ a: 3 }, { b: 2 }, 2, 3, 4, 'test1', 'test2'], comparator);
        should(JSON.stringify(result.same)).be.eql(JSON.stringify([{ b: 2 }, 2, 3, 'test1', 'test2']));
        should(result.changed.length).be.exactly(1);
        should(JSON.stringify(result.changed)).be.eql(JSON.stringify([{ a: 1 }]));
        should(result.onlyInLeft.length).be.exactly(1);
        should(JSON.stringify(result.onlyInLeft)).be.eql(JSON.stringify(['test3']));
        should(result.onlyInRight.length).be.exactly(1);
        should(JSON.stringify(result.onlyInRight)).be.eql(JSON.stringify([4]));
    }
};
__decorate([
    mocha_typescript_1.test("should find empty string")
], UtilTest.prototype, "assert_stringIsEmpty", null);
__decorate([
    mocha_typescript_1.test("should find empty array")
], UtilTest.prototype, "assert_arrayIsEmpty", null);
__decorate([
    mocha_typescript_1.test("should create capital first char in string")
], UtilTest.prototype, "assert_capitalize", null);
__decorate([
    mocha_typescript_1.test("should create plural word from string")
], UtilTest.prototype, "assert_pluralize", null);
__decorate([
    mocha_typescript_1.test("should create a random string with given length")
], UtilTest.prototype, "assert_randomString", null);
__decorate([
    mocha_typescript_1.test("should detect empty object map")
], UtilTest.prototype, "assert_mapIsEmpty", null);
__decorate([
    mocha_typescript_1.test("should correctly compare two arrays, all changes, default comparison")
], UtilTest.prototype, "assert_compareArrays", null);
__decorate([
    mocha_typescript_1.test("should correctly compare two arrays, all changes, custom comparison")
], UtilTest.prototype, "assert_compareArraysByComparator", null);
UtilTest = __decorate([
    mocha_typescript_1.suite
], UtilTest);
//# sourceMappingURL=util.spec.js.map