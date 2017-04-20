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
        let test;
        should(util_1.capitalize('test')).be.equal('Test');
        should(util_1.capitalize('Test')).be.equal('Test');
    }
    assert_pluralize() {
        let test;
        should(util_1.pluralize('test')).be.equal('tests');
        should(util_1.pluralize('index')).be.equal('indexes');
        should(util_1.pluralize('house')).be.equal('houses');
        should(util_1.pluralize('entity')).be.equal('entities');
    }
};
__decorate([
    mocha_typescript_1.test("should find empty string")
], UtilTest.prototype, "assert_stringIsEmpty", null);
__decorate([
    mocha_typescript_1.test("should find empty string")
], UtilTest.prototype, "assert_arrayIsEmpty", null);
__decorate([
    mocha_typescript_1.test("should create capital first char in string")
], UtilTest.prototype, "assert_capitalize", null);
__decorate([
    mocha_typescript_1.test("should create plural word from string")
], UtilTest.prototype, "assert_pluralize", null);
UtilTest = __decorate([
    mocha_typescript_1.suite
], UtilTest);
//# sourceMappingURL=util.spec.js.map