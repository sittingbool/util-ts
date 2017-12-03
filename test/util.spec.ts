import { suite, test} from "mocha-typescript";
import {arrayIsEmpty, capitalize, mapIsEmpty, pluralize, stringIsEmpty} from "../src/util";
import * as should from 'should';

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


    @test("should find empty string")
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