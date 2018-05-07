const helper = require('../helper');

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

test('join joings two strings', () => {
  const string1 = 'string1';
  const string2 = 'string2';
  const test1 = helper.join(string1, string2);
  expect(test1)
    .toEqual('string1string2');
});