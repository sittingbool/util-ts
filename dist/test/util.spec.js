"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("@testdeck/mocha");
const util_1 = require("../src/util");
const should = require("should");
const dotenv = require("dotenv");
const path = require("path");
const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let UtilTest = class UtilTest {
    assert_stringIsEmpty() {
        let test;
        should((0, util_1.stringIsEmpty)(test)).be.true();
        should((0, util_1.stringIsEmpty)('')).be.true();
        should((0, util_1.stringIsEmpty)(' ')).be.false();
        should((0, util_1.stringIsEmpty)('test')).be.false();
    }
    assert_arrayIsEmpty() {
        let test;
        should((0, util_1.arrayIsEmpty)(test)).be.true();
        should((0, util_1.arrayIsEmpty)([])).be.true();
        should((0, util_1.arrayIsEmpty)([null])).be.false();
        should((0, util_1.arrayIsEmpty)([{}])).be.false();
    }
    assert_capitalize() {
        should((0, util_1.capitalize)('test')).be.equal('Test');
        should((0, util_1.capitalize)('Test')).be.equal('Test');
        should((0, util_1.capitalize)('testString')).be.equal('TestString');
        should((0, util_1.capitalize)('TestString')).be.equal('TestString');
    }
    assert_deCapitalize() {
        should((0, util_1.deCapitalize)('test')).be.equal('test');
        should((0, util_1.deCapitalize)('Test')).be.equal('test');
        should((0, util_1.deCapitalize)('TestString')).be.equal('testString');
        should((0, util_1.deCapitalize)('testString')).be.equal('testString');
    }
    assert_pluralize() {
        should((0, util_1.pluralize)('test')).be.equal('tests');
        should((0, util_1.pluralize)('index')).be.equal('indexes');
        should((0, util_1.pluralize)('house')).be.equal('houses');
        should((0, util_1.pluralize)('entity')).be.equal('entities');
    }
    assert_randomString() {
        let allChars = RANDOMIZE_CHARSET_DEFAULT.split('');
        let random = (0, util_1.randomString)(10);
        should(random).be.a.String();
        should(random.length).be.exactly(10);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);
        random = (0, util_1.randomString)(23);
        should(random).be.a.String();
        should(random.length).be.exactly(23);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);
        let allCharsAllowed = 'lkjhdfas!98';
        allChars = allCharsAllowed.split('');
        random = (0, util_1.randomString)(50, allCharsAllowed);
        should(random).be.a.String();
        should(random.length).be.exactly(50);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);
    }
    assert_mapIsEmpty() {
        let test;
        should((0, util_1.mapIsEmpty)(test)).be.true();
        should((0, util_1.mapIsEmpty)(null)).be.true();
        should((0, util_1.mapIsEmpty)([])).be.true();
        should((0, util_1.mapIsEmpty)({})).be.true();
        should((0, util_1.mapIsEmpty)({ key: '' })).be.false();
        should((0, util_1.mapIsEmpty)({ key: true })).be.false();
        should((0, util_1.mapIsEmpty)({ key: 1 })).be.false();
        should((0, util_1.mapIsEmpty)({ key: null })).be.false();
    }
    assert_loadJson() {
        return __awaiter(this, void 0, void 0, function* () {
            const fs = require('fs');
            const path = require('path');
            const util = require('util');
            const result = yield (0, util_1.loadJSONFromFile)(path.join(__dirname, '..', '..', 'package.json'), { fs, util });
            should(result.name).be.equal('sb-util-ts');
        });
    }
    assert_loadPackageJson() {
        const fs = require('fs');
        const path = require('path');
        const result = (0, util_1.loadPackageInfo)(path.join(__dirname, '..', '..'), 'version', { fs, path });
        should(result).be.equal('2.12.0');
    }
    assert_compareArrays() {
        const result = (0, util_1.compareArrays)([{ a: 1 }, { b: 2 }, 2, 3, 'test1', 'test2', 'test3'], [{ a: 3 }, { b: 2 }, 2, 3, 4, 'test1', 'test2']);
        should(JSON.stringify(result.same)).be.eql(JSON.stringify([{ b: 2 }, 2, 3, 'test1', 'test2']));
        should(result.changed.length).be.exactly(0);
        should(result.onlyInLeft.length).be.exactly(2);
        should(JSON.stringify(result.onlyInLeft)).be.eql(JSON.stringify([{ a: 1 }, 'test3']));
        should(result.onlyInRight.length).be.exactly(2);
        should(JSON.stringify(result.onlyInRight)).be.eql(JSON.stringify([{ a: 3 }, 4]));
    }
    assert_filterAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const isNotFive = (val) => {
                return Promise.resolve(val !== 5);
            };
            let array = [1, 2, 3, 4, 5];
            let result = yield (0, util_1.filterAsync)(array, i => isNotFive(i));
            should(JSON.stringify(result)).be.eql(JSON.stringify([1, 2, 3, 4]));
            array = [5, 10, 15, 20, 25, 30, 35];
            result = yield (0, util_1.filterAsync)(array, i => isNotFive(i));
            should(JSON.stringify(result)).be.eql(JSON.stringify([10, 15, 20, 25, 30, 35]));
        });
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
        const result = (0, util_1.compareArrays)([{ a: 1 }, { b: 2 }, 2, 3, 'test1', 'test2', 'test3'], [{ a: 3 }, { b: 2 }, 2, 3, 4, 'test1', 'test2'], comparator);
        should(JSON.stringify(result.same)).be.eql(JSON.stringify([{ b: 2 }, 2, 3, 'test1', 'test2']));
        should(result.changed.length).be.exactly(1);
        should(JSON.stringify(result.changed)).be.eql(JSON.stringify([{ a: 1 }]));
        should(result.onlyInLeft.length).be.exactly(1);
        should(JSON.stringify(result.onlyInLeft)).be.eql(JSON.stringify(['test3']));
        should(result.onlyInRight.length).be.exactly(1);
        should(JSON.stringify(result.onlyInRight)).be.eql(JSON.stringify([4]));
    }
    assert_boolFromString() {
        should((0, util_1.boolFromString)('Yes')).be.true();
        should((0, util_1.boolFromString)('yes')).be.true();
        should((0, util_1.boolFromString)('YES')).be.true();
        should((0, util_1.boolFromString)('True')).be.true();
        should((0, util_1.boolFromString)('true')).be.true();
        should((0, util_1.boolFromString)('TRUE')).be.true();
        should((0, util_1.boolFromString)('1')).be.true();
        should((0, util_1.boolFromString)('No')).be.false();
        should((0, util_1.boolFromString)('no')).be.false();
        should((0, util_1.boolFromString)('NO')).be.false();
        should((0, util_1.boolFromString)('False')).be.false();
        should((0, util_1.boolFromString)('false')).be.false();
        should((0, util_1.boolFromString)('FALSE')).be.false();
        should((0, util_1.boolFromString)('0')).be.false();
        should(typeof (0, util_1.boolFromString)('Ye')).be.exactly('undefined');
        should(typeof (0, util_1.boolFromString)(undefined)).be.exactly('undefined');
        should(typeof (0, util_1.boolFromString)(null)).be.exactly('undefined');
        should(typeof (0, util_1.boolFromString)('2')).be.exactly('undefined');
        should(typeof (0, util_1.boolFromString)(10)).be.exactly('undefined');
        should(typeof (0, util_1.boolFromString)(2)).be.exactly('undefined');
        should(typeof (0, util_1.boolFromString)('null')).be.exactly('undefined');
        should(typeof (0, util_1.boolFromString)('')).be.exactly('undefined');
        should(typeof (0, util_1.boolFromString)('ajdfhlajhsfj')).be.exactly('undefined');
    }
    assert_randomNumberForRange() {
        const ranges = [[0, 1], [1, 5], [1, 10], [5, 15], [0, 100]];
        const adaptorLimit = 100;
        for (const r of ranges) {
            let min = r[0];
            let max = r[1];
            let adaptor = 0;
            while (adaptor <= adaptorLimit) {
                const minimum = min + adaptor;
                const maximum = max + adaptor;
                const result = (0, util_1.randomNumberForRange)(minimum, maximum);
                should(result).be.aboveOrEqual(minimum);
                should(result).be.belowOrEqual(maximum);
                adaptor++;
            }
        }
    }
    assert_sleep() {
        return __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            yield (0, util_1.sleep)(100);
            const end = Date.now();
            should(end).be.greaterThanOrEqual(start + 100);
        });
    }
    assert_numberOfMatches() {
        should((0, util_1.numberOfMatches)('Annamaria', 'a')).be.exactly(4);
        should((0, util_1.numberOfMatches)('Annamaria', 'a', true)).be.exactly(3);
        should((0, util_1.numberOfMatches)('Annamaria', /a/ig)).be.exactly(4);
        should((0, util_1.numberOfMatches)('Annamaria', /a/g)).be.exactly(3);
        const germanRime = 'Fichers Fritze hat frische Fische. Frische Fische hat Fischers Fritze.';
        should((0, util_1.numberOfMatches)(germanRime, 'frische')).be.exactly(2);
        should((0, util_1.numberOfMatches)(germanRime, 'frische', true)).be.exactly(1);
        should((0, util_1.numberOfMatches)(germanRime, /frische/ig)).be.exactly(2);
        should((0, util_1.numberOfMatches)(germanRime, /frische/g)).be.exactly(1);
    }
    assert_clone() {
        let data = { name: 'Bill', age: 43 };
        let cloned = (0, util_1.clone)(data);
        should(cloned).be.eql(data);
        data.age = 45;
        should(cloned.age).be.exactly(43);
        data = [1, 2, 3];
        cloned = (0, util_1.clone)(data);
        should(cloned).be.eql(data);
        data.push(4);
        should(cloned).be.eql([1, 2, 3]);
        data = [{ name: 'Bill', age: 43 }, { name: 'Jim', age: 56 }];
        cloned = (0, util_1.clone)(data, 1);
        should(cloned).be.eql(data);
        should(cloned[0]).be.eql(data[0]);
        should(cloned[1]).be.eql(data[1]);
        data[1].age = 57;
        should(cloned[1].age).be.exactly(56);
        data = [{ name: 'Bill', meta: { age: 43 } }, { name: 'Jim', meta: { age: 56 } }];
        cloned = (0, util_1.clone)(data, 1);
        should(cloned).be.eql(data);
        should(cloned[0]).be.eql(data[0]);
        should(cloned[1]).be.eql(data[1]);
        data[1].meta.age = 57;
        should(cloned[1].meta.age).be.exactly(data[1].meta.age);
        data[1].meta.age = 56;
        cloned = (0, util_1.clone)(data, 2);
        should(cloned).be.eql(data);
        should(cloned[0]).be.eql(data[0]);
        should(cloned[1]).be.eql(data[1]);
        data[1].meta.age = 57;
        should(cloned[1].meta.age).be.exactly(56);
    }
    assert_prefixObjectKeys() {
        const original = { name: 'Jim', age: 32, hometown: 'Erfurt' };
        const prefix = 'pre_';
        const prefixed = (0, util_1.prefixObjectKeys)(original, prefix);
        for (const key in original) {
            should(prefixed[prefix + key]).be.exactly(original[key]);
        }
    }
    assert_stripString() {
        should((0, util_1.stripString)('Hallo Welt', 'al')).be.exactly('alll');
        should((0, util_1.stripString)('Hello World', 'Helo Word')).be.exactly('Hello World');
        should((0, util_1.stripString)('Hello World', 'helo word', true)).be.exactly('ello orld');
    }
    assert_envVariable() {
        dotenv.config({ path: path.join(__dirname, 'test.env') });
        should((0, util_1.envVariable)('SB_UTIL_TEST_STR', 'not set')).be.exactly('Hallo Welt');
        should((0, util_1.envVariable)('SB_UTIL_TEST_NOT_SET', 'not set')).be.exactly('not set');
        should((0, util_1.envVariable)('SB_UTIL_TEST_BOOL_1', 'not set', 'boolean')).be.exactly(true);
        should(typeof (0, util_1.envVariable)('SB_UTIL_TEST_BOOL_1', 'not set', 'boolean')).be.exactly('boolean');
        should((0, util_1.envVariable)('SB_UTIL_TEST_BOOL_TRUE', 'not set', 'boolean')).be.exactly(true);
        should(typeof (0, util_1.envVariable)('SB_UTIL_TEST_BOOL_TRUE', 'not set', 'boolean')).be.exactly('boolean');
        should((0, util_1.envVariable)('SB_UTIL_TEST_BOOL_TRUE', 'not set', 'boolean')).be.exactly(true);
        should(typeof (0, util_1.envVariable)('SB_UTIL_TEST_BOOL_TRUE', 'not set', 'boolean')).be.exactly('boolean');
        should((0, util_1.envVariable)('SB_UTIL_TEST_BOOL_0', 'not set', 'boolean')).be.exactly(false);
        should(typeof (0, util_1.envVariable)('SB_UTIL_TEST_BOOL_0', 'not set', 'boolean')).be.exactly('boolean');
        should((0, util_1.envVariable)('SB_UTIL_TEST_BOOL_FALSE', 'not set', 'boolean')).be.exactly(false);
        should(typeof (0, util_1.envVariable)('SB_UTIL_TEST_BOOL_FALSE', 'not set', 'boolean')).be.exactly('boolean');
        should((0, util_1.envVariable)('SB_UTIL_TEST_INT_VALID', 'not set', 'int')).be.exactly(123456789);
        should(typeof (0, util_1.envVariable)('SB_UTIL_TEST_INT_VALID', 'not set', 'int')).be.exactly('number');
        should((0, util_1.envVariable)('SB_UTIL_TEST_FLOAT_VALID', 'not set', 'float')).be.exactly(123.456789);
        should(typeof (0, util_1.envVariable)('SB_UTIL_TEST_FLOAT_VALID', 'not set', 'float')).be.exactly('number');
        try {
            (0, util_1.envVariable)('SB_UTIL_TEST_INT_VALID', 'not set', 'int');
        }
        catch (e) {
            should(e.message).be.exactly('Error reading ENV variable SB_UTIL_TEST_INT_VALID as int. Value was parsed to NaN.');
        }
        try {
            (0, util_1.envVariable)('SB_UTIL_TEST_FLOAT_INVALID', 'not set', 'float');
        }
        catch (e) {
            should(e.message).be.exactly('Error reading ENV variable SB_UTIL_TEST_FLOAT_INVALID as float. Value was parsed to NaN.');
        }
    }
    assert_readFileAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield (0, util_1.readFileAsync)(path.join(__dirname, 'test_file.txt'), 'utf8');
            should(content).be.exactly('I am the test content');
        });
    }
    assert_writeFileSync() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = 'I am the write test';
            yield (0, util_1.writeFileAsync)(path.join(__dirname, 'write_text.txt'), data, 'utf8');
            const content = yield (0, util_1.readFileAsync)(path.join(__dirname, 'write_text.txt'), 'utf8');
            should(content).be.exactly(data);
        });
    }
    assert_fileExists() {
        return __awaiter(this, void 0, void 0, function* () {
            let exists = yield (0, util_1.fileExists)(path.join(__dirname, 'test_file.txt'));
            should(exists).be.exactly(true);
            exists = yield (0, util_1.fileExists)(path.join(__dirname, 'not_existing.txt'));
            should(exists).be.exactly(false);
        });
    }
};
__decorate([
    (0, mocha_1.test)("should find empty string")
], UtilTest.prototype, "assert_stringIsEmpty", null);
__decorate([
    (0, mocha_1.test)("should find empty array")
], UtilTest.prototype, "assert_arrayIsEmpty", null);
__decorate([
    (0, mocha_1.test)("should create capital first char in string")
], UtilTest.prototype, "assert_capitalize", null);
__decorate([
    (0, mocha_1.test)("should create lower-case first char in string")
], UtilTest.prototype, "assert_deCapitalize", null);
__decorate([
    (0, mocha_1.test)("should create plural word from string")
], UtilTest.prototype, "assert_pluralize", null);
__decorate([
    (0, mocha_1.test)("should create a random string with given length")
], UtilTest.prototype, "assert_randomString", null);
__decorate([
    (0, mocha_1.test)("should detect empty object map")
], UtilTest.prototype, "assert_mapIsEmpty", null);
__decorate([
    (0, mocha_1.test)("should correctly read json files")
], UtilTest.prototype, "assert_loadJson", null);
__decorate([
    (0, mocha_1.test)("should correctly read the package json version")
], UtilTest.prototype, "assert_loadPackageJson", null);
__decorate([
    (0, mocha_1.test)("should correctly compare two arrays, all changes, default comparison")
], UtilTest.prototype, "assert_compareArrays", null);
__decorate([
    (0, mocha_1.test)("should correctly filter an array with an async method")
], UtilTest.prototype, "assert_filterAsync", null);
__decorate([
    (0, mocha_1.test)("should correctly compare two arrays, all changes, custom comparison")
], UtilTest.prototype, "assert_compareArraysByComparator", null);
__decorate([
    (0, mocha_1.test)("should correctly convert a string to a boolean , only if its a boolean value in the string")
], UtilTest.prototype, "assert_boolFromString", null);
__decorate([
    (0, mocha_1.test)("should correctly return a random number in range")
], UtilTest.prototype, "assert_randomNumberForRange", null);
__decorate([
    (0, mocha_1.test)("should correctly sleep for a bit")
], UtilTest.prototype, "assert_sleep", null);
__decorate([
    (0, mocha_1.test)("should correctly match expressions")
], UtilTest.prototype, "assert_numberOfMatches", null);
__decorate([
    (0, mocha_1.test)("should correctly clone")
], UtilTest.prototype, "assert_clone", null);
__decorate([
    (0, mocha_1.test)("should correctly prefix keys of an object")
], UtilTest.prototype, "assert_prefixObjectKeys", null);
__decorate([
    (0, mocha_1.test)("should correctly strip a string of un allowed chars")
], UtilTest.prototype, "assert_stripString", null);
__decorate([
    (0, mocha_1.test)("should correctly parse env variables")
], UtilTest.prototype, "assert_envVariable", null);
__decorate([
    mocha_1.test
], UtilTest.prototype, "assert_readFileAsync", null);
__decorate([
    mocha_1.test
], UtilTest.prototype, "assert_writeFileSync", null);
__decorate([
    mocha_1.test
], UtilTest.prototype, "assert_fileExists", null);
UtilTest = __decorate([
    mocha_1.suite
], UtilTest);
//# sourceMappingURL=util.spec.js.map