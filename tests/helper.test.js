const path = require('path');
const moment = require('moment');
const helper = require('../helper');

// ////////////////
// STRING HELPERS //
// ////////////////

test('currency', () => {
  expect(helper.toCurrency('$125.50'))
    .toEqual(125.5);
  expect(helper.toCurrency('-135.00'))
    .toEqual(-135);
});

describe('string to dates', () => {
  let currentTime = moment('01/20/1930', 'MM-DD-YYYY');

  test('toDateFrom', () => {
    expect(helper.toDateFromMMDDYYYY(currentTime.format('MM-DD-YYYY')))
      .toBeInstanceOf(moment);
  });

  test('test if date is valid', () => {
    expect(helper.isMMDDYYYY(currentTime.format('M-D-YYYY')))
      .toEqual(true);
    expect(helper.isMMDDYYYY(undefined))
      .toEqual(false);
  });
});

// ////////////////
// ARRAY HELPERS //
// ////////////////

test('splt splits string by character', () => {
  const string = 'one,two,three,four,five';
  const test1 = helper.split(',', string);
  expect(test1)
    .toBeInstanceOf(Array);
  expect(test1).toEqual([
    'one',
    'two',
    'three',
    'four',
    'five',
  ]);
});

test('shift takes an array and returns an array with the first element removed', () => {
  const testArray = ['zero', 'one', 'two', 'three'];
  const test1 = helper.shift(testArray);
  expect(test1)
    .toBeInstanceOf(Array);
  expect(test1)
    .toEqual([
      'one',
      'two',
      'three',
    ]);
});

test('join joings two strings', () => {
  const string1 = 'string1';
  const string2 = 'string2';
  const test1 = helper.join(string1, string2);
  expect(test1)
    .toEqual('string1string2');
});

// //////////////////
// OBJECT HELPERS //
// //////////////////

test('addProperty adds property to object', () => {
  const testObject = { keyOne: 'propOne' };
  const testTuple = ['keyTwo', 'propTwo'];
  const test1 = helper.addProperty(testObject, testTuple);
  expect(test1)
    .toBeInstanceOf(Object);
  expect(test1)
    .toEqual({
      keyOne: 'propOne',
      keyTwo: 'propTwo',
    });
});

test('getKeys returns keys of object', () => {
  const one = {
    keyOne: 'propOne',
    keyTwo: 'propTwo',
  };
  const test1 = helper.getKeys(one);
  expect(test1)
    .toBeInstanceOf(Array);
  expect(test1)
    .toEqual(['keyOne', 'keyTwo']);
});

test('isKeyedTable checkes', () => {
  const gamePath = path.join(__dirname, '../example_data/f_game_mock.json');
  const game = require(gamePath); //eslint-disable-line
  const test1 = helper.isKeyedTable(game['2016122400'].home.stats.receiving);
  expect(test1)
    .toEqual(true);
  const test2 = helper.isKeyedTable(game);
  expect(test2)
    .toEqual(false);
  const test3 = helper.isKeyedTable(game['2016122400'].home);
  expect(test3)
    .toEqual(false);
  const test4 = helper.isKeyedTable(game['2016122400'].home.stats);
  expect(test4)
    .toEqual(false);
});

// /////////////////////
// COLLECTION HELPERS //
// /////////////////////

test('flatKeys takes collection and returns all keys', () => {
  const one = { keyOne: 'propOne' };
  const two = {
    keyOne: 'propOne',
    keyTwo: 'propTwo',
  };
  const collection = [one, two];
  const test1 = helper.flatKeys(collection);
  expect(test1)
    .toBeInstanceOf(Array);
  expect(test1)
    .toEqual(['keyOne', 'keyTwo']);
});
