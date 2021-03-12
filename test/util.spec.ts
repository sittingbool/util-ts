import {suite, test} from "mocha-typescript";
import {
    arrayIsEmpty,
    ArrayItemSame,
    boolFromString,
    capitalize,
    compareArrays, loadJSONFromFile, loadPackageInfo,
    mapIsEmpty, numberOfMatches,
    pluralize, randomNumberForRange,
    randomString, sleep, clone,
    stringIsEmpty, prefixObjectKeys, stripString,
    envVariable
} from "../src/util";
import * as should from 'should';
import * as dotenv from 'dotenv';
import * as path from 'path';

const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

@suite
class UtilTest {
    @test("should find empty string")
    assert_stringIsEmpty() {
        let test;

        should(stringIsEmpty(test)).be.true();
        should(stringIsEmpty('')).be.true();
        should(stringIsEmpty(' ')).be.false();
        should(stringIsEmpty('test')).be.false();
    }


    @test("should find empty array")
    assert_arrayIsEmpty() {
        let test;

        should(arrayIsEmpty(test)).be.true();
        should(arrayIsEmpty([])).be.true();
        should(arrayIsEmpty([null])).be.false();
        should(arrayIsEmpty([{}])).be.false();
    }

    @test("should create capital first char in string")
    assert_capitalize() {

        should(capitalize('test')).be.equal('Test');
        should(capitalize('Test')).be.equal('Test');
    }

    @test("should create plural word from string")
    assert_pluralize() {

        should(pluralize('test')).be.equal('tests');
        should(pluralize('index')).be.equal('indexes');
        should(pluralize('house')).be.equal('houses');
        should(pluralize('entity')).be.equal('entities');
    }

    @test("should create a random string with given length")
    assert_randomString() {

        let allChars = RANDOMIZE_CHARSET_DEFAULT.split('');
        let random = randomString(10);
        should(random).be.a.String();
        should(random.length).be.exactly(10);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);

        random = randomString(23);
        should(random).be.a.String();
        should(random.length).be.exactly(23);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);

        let allCharsAllowed = 'lkjhdfas!98';
        allChars = allCharsAllowed.split('');
        random = randomString(50, allCharsAllowed);
        should(random).be.a.String();
        should(random.length).be.exactly(50);
        should(random.split('').filter(char => allChars.indexOf(char) < 0).length).lessThan(1);
    }

    @test("should detect empty object map")
    assert_mapIsEmpty() {
        let test;

        should(mapIsEmpty(test)).be.true();
        should(mapIsEmpty(null)).be.true();
        should(mapIsEmpty([])).be.true();
        should(mapIsEmpty({})).be.true();
        should(mapIsEmpty({key: ''})).be.false();
        should(mapIsEmpty({key: true})).be.false();
        should(mapIsEmpty({key: 1})).be.false();
        should(mapIsEmpty({key: null})).be.false();
    }

    @test("should correctly read json files")
    async assert_loadJson() {
        const fs = require('fs');
        const path = require('path');
        const util = require('util');
        const result = await loadJSONFromFile(path.join(__dirname, '..', '..', 'package.json'), {fs, util});
        should(result.name).be.equal('sb-util-ts');
    }

    @test("should correctly read the package json version")
    assert_loadPackageJson() {
        const fs = require('fs');
        const path = require('path');
        const result = loadPackageInfo(path.join(__dirname, '..', '..'), 'version', {fs, path});
        should(result).be.equal('2.8.0');
    }

    @test("should correctly compare two arrays, all changes, default comparison")
    assert_compareArrays() {
        const result = compareArrays([{a: 1}, {b: 2}, 2, 3, 'test1', 'test2', 'test3'], [{a: 3}, {b: 2}, 2, 3, 4, 'test1', 'test2']);
        should(JSON.stringify(result.same)).be.eql(JSON.stringify([{b: 2}, 2, 3, 'test1', 'test2']));
        should(result.changed.length).be.exactly(0);
        should(result.onlyInLeft.length).be.exactly(2);
        should(JSON.stringify(result.onlyInLeft)).be.eql(JSON.stringify([{a: 1}, 'test3']));
        should(result.onlyInRight.length).be.exactly(2);
        should(JSON.stringify(result.onlyInRight)).be.eql(JSON.stringify([{a: 3}, 4]));
    }

    @test("should correctly compare two arrays, all changes, custom comparison")
    assert_compareArraysByComparator() {
        const comparator: ArrayItemSame = (left, right) => {
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
        const result = compareArrays([{a: 1}, {b: 2}, 2, 3, 'test1', 'test2', 'test3'], [{a: 3}, {b: 2}, 2, 3, 4, 'test1', 'test2'], comparator);
        should(JSON.stringify(result.same)).be.eql(JSON.stringify([{b: 2}, 2, 3, 'test1', 'test2']));
        should(result.changed.length).be.exactly(1);
        should(JSON.stringify(result.changed)).be.eql(JSON.stringify([{a: 1}]));
        should(result.onlyInLeft.length).be.exactly(1);
        should(JSON.stringify(result.onlyInLeft)).be.eql(JSON.stringify(['test3']));
        should(result.onlyInRight.length).be.exactly(1);
        should(JSON.stringify(result.onlyInRight)).be.eql(JSON.stringify([4]));
    }

    @test("should correctly convert a string to a boolean , only if its a boolean value in the string")
    assert_boolFromString() {
        should(boolFromString('Yes')).be.true();
        should(boolFromString('yes')).be.true();
        should(boolFromString('YES')).be.true();
        should(boolFromString('True')).be.true();
        should(boolFromString('true')).be.true();
        should(boolFromString('TRUE')).be.true();
        should(boolFromString('1')).be.true();

        should(boolFromString('No')).be.false();
        should(boolFromString('no')).be.false();
        should(boolFromString('NO')).be.false();
        should(boolFromString('False')).be.false();
        should(boolFromString('false')).be.false();
        should(boolFromString('FALSE')).be.false();
        should(boolFromString('0')).be.false();


        should(typeof boolFromString('Ye')).be.exactly('undefined');
        should(typeof boolFromString(undefined)).be.exactly('undefined');
        should(typeof boolFromString(null)).be.exactly('undefined');
        should(typeof boolFromString('2')).be.exactly('undefined');
        should(typeof boolFromString((<any>10))).be.exactly('undefined');
        should(typeof boolFromString((<any>2))).be.exactly('undefined');
        should(typeof boolFromString('null')).be.exactly('undefined');
        should(typeof boolFromString('')).be.exactly('undefined');
        should(typeof boolFromString('ajdfhlajhsfj')).be.exactly('undefined');
    }

    @test("should correctly return a random number in range")
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
                const result = randomNumberForRange(minimum, maximum);
                should(result).be.aboveOrEqual(minimum)
                should(result).be.belowOrEqual(maximum);
                adaptor++;
            }
        }
    }

    @test("should correctly sleep for a bit")
    async assert_sleep() {
        const start = Date.now();
        await sleep(100);
        const end = Date.now();
        should(end).be.greaterThanOrEqual(start + 100);
    }

    @test("should correctly match expressions")
    assert_numberOfMatches() {
        should(numberOfMatches('Annamaria', 'a')).be.exactly(4);
        should(numberOfMatches('Annamaria', 'a', true)).be.exactly(3);
        should(numberOfMatches('Annamaria', /a/ig)).be.exactly(4);
        should(numberOfMatches('Annamaria', /a/g)).be.exactly(3);

        const germanRime = 'Fichers Fritze hat frische Fische. Frische Fische hat Fischers Fritze.';

        should(numberOfMatches(germanRime, 'frische')).be.exactly(2);
        should(numberOfMatches(germanRime, 'frische', true)).be.exactly(1);
        should(numberOfMatches(germanRime, /frische/ig)).be.exactly(2);
        should(numberOfMatches(germanRime, /frische/g)).be.exactly(1);
    }

    @test("should correctly clone")
    assert_clone() {
        let data: any = {name: 'Bill', age: 43};
        let cloned: any = clone(data);
        should(cloned).be.eql(data);
        data.age = 45;
        should(cloned.age).be.exactly(43);

        data = [1, 2, 3];
        cloned = clone(data);
        should(cloned).be.eql(data);
        data.push(4);
        should(cloned).be.eql([1, 2, 3]);

        data = [{name: 'Bill', age: 43}, {name: 'Jim', age: 56}];
        cloned = clone(data, 1);
        should(cloned).be.eql(data);
        should(cloned[0]).be.eql(data[0]);
        should(cloned[1]).be.eql(data[1]);
        data[1].age = 57;
        should(cloned[1].age).be.exactly(56);

        data = [{name: 'Bill', meta: {age: 43}}, {name: 'Jim', meta: {age: 56}}];
        cloned = clone(data, 1);
        should(cloned).be.eql(data);
        should(cloned[0]).be.eql(data[0]);
        should(cloned[1]).be.eql(data[1]);
        data[1].meta.age = 57;
        should(cloned[1].meta.age).be.exactly(data[1].meta.age); // same for deep 1

        data[1].meta.age = 56;
        cloned = clone(data, 2);
        should(cloned).be.eql(data);
        should(cloned[0]).be.eql(data[0]);
        should(cloned[1]).be.eql(data[1]);
        data[1].meta.age = 57;
        should(cloned[1].meta.age).be.exactly(56); // different for deep 2
    }

    @test("should correctly prefix keys of an object")
    assert_prefixObjectKeys() {
        const original = {name: 'Jim', age: 32, hometown: 'Erfurt'};
        const prefix = 'pre_';
        const prefixed = prefixObjectKeys(original, prefix);

        for (const key in original) {
            should(prefixed[prefix + key]).be.exactly(original[key]);
        }
    }

    @test("should correctly strip a string of un allowed chars")
    assert_stripString() {
        should(stripString('Hallo Welt', 'al')).be.exactly('alll');
        should(stripString('Hello World', 'Helo Word')).be.exactly('Hello World');

        // case sensitive
        should(stripString('Hello World', 'helo word', true)).be.exactly('ello orld');
    }

    @test("should correctly parse env variables")
    assert_envVariable() {
        dotenv.config( { path: path.join(__dirname, 'test.env') } );

        should(envVariable('SB_UTIL_TEST_STR', 'not set')).be.exactly('Hallo Welt');
        should(envVariable('SB_UTIL_TEST_NOT_SET', 'not set')).be.exactly('not set');

        should(envVariable('SB_UTIL_TEST_BOOL_1', 'not set', 'boolean')).be.exactly(true);
        should(typeof envVariable('SB_UTIL_TEST_BOOL_1', 'not set', 'boolean')).be.exactly('boolean');
        should(envVariable('SB_UTIL_TEST_BOOL_TRUE', 'not set', 'boolean')).be.exactly(true);
        should(typeof envVariable('SB_UTIL_TEST_BOOL_TRUE', 'not set', 'boolean')).be.exactly('boolean');
        should(envVariable('SB_UTIL_TEST_BOOL_TRUE', 'not set', 'boolean')).be.exactly(true);
        should(typeof envVariable('SB_UTIL_TEST_BOOL_TRUE', 'not set', 'boolean')).be.exactly('boolean');
        should(envVariable('SB_UTIL_TEST_BOOL_0', 'not set', 'boolean')).be.exactly(false);
        should(typeof envVariable('SB_UTIL_TEST_BOOL_0', 'not set', 'boolean')).be.exactly('boolean');
        should(envVariable('SB_UTIL_TEST_BOOL_FALSE', 'not set', 'boolean')).be.exactly(false);
        should(typeof envVariable('SB_UTIL_TEST_BOOL_FALSE', 'not set', 'boolean')).be.exactly('boolean');

        should(envVariable('SB_UTIL_TEST_INT_VALID', 'not set', 'int')).be.exactly(123456789);
        should(typeof envVariable('SB_UTIL_TEST_INT_VALID', 'not set', 'int')).be.exactly('number');

        should(envVariable('SB_UTIL_TEST_FLOAT_VALID', 'not set', 'float')).be.exactly(123.456789);
        should(typeof envVariable('SB_UTIL_TEST_FLOAT_VALID', 'not set', 'float')).be.exactly('number');

        try {
            envVariable('SB_UTIL_TEST_INT_VALID', 'not set', 'int');
        } catch (e) {
            should(e.message).be.exactly('Error reading ENV variable SB_UTIL_TEST_INT_VALID as int. Value was parsed to NaN.')
        }

        try {
            envVariable('SB_UTIL_TEST_FLOAT_INVALID', 'not set', 'float');
        } catch (e) {
            should(e.message).be.exactly('Error reading ENV variable SB_UTIL_TEST_FLOAT_INVALID as float. Value was parsed to NaN.')
        }
    }
}
