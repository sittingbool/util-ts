import { suite, test} from "mocha-typescript";
import {arrayIsEmpty, capitalize, mapIsEmpty, pluralize, randomString, stringIsEmpty} from "../src/util";
import * as should from 'should';

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
        should(mapIsEmpty({ key: '' })).be.false();
        should(mapIsEmpty({ key: true })).be.false();
        should(mapIsEmpty({ key: 1 })).be.false();
        should(mapIsEmpty({ key: null })).be.false();
    }
}