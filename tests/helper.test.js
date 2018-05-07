const helper = require('../helper');

test('splt splits string by character', () => {
  const string = 'one,two,three,four,five';
  expect(helper.split(',', string)).toEqual([
    'one',
    'two',
    'three',
    'four',
    'five',
  ]);
});

test('shift takes an array and returns an array with the first element removed', () => {
  const testArray = ['zero', 'one', 'two', 'three'];
  expect(helper.shift(testArray))
    .toEqual([
      'one',
      'two',
      'three',
    ]);
});
