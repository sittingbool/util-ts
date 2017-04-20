import { suite, test} from "mocha-typescript";
import {arrayIsEmpty, capitalize, pluralize, stringIsEmpty} from "../src/util";
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
        let test;

        should(capitalize('test')).be.equal('Test');
        should(capitalize('Test')).be.equal('Test');
    }

    @test("should create plural word from string")
    assert_pluralize() {
        let test;

        should(pluralize('test')).be.equal('tests');
        should(pluralize('index')).be.equal('indexes');
        should(pluralize('house')).be.equal('houses');
        should(pluralize('entity')).be.equal('entities');
    }
}