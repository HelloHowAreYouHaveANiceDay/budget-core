// TDA - Two dimensional array
// 2D array is used as the middle ground for transforming data

const T = require('../tda');

const testData = {
  tda: [
    ['col1', 'col2', 'col3'],
    ['r1c1', 'r1c2', 'r1c3'],
    ['r2c1', 'r2c2', 'r2c3'],
  ],
  tdaError: [
    ['col1', 'col2'],
    ['r1c1', 'r1c2', 'r1c3'],
    ['r2c1', 'r2c2', 'r2c3'],
  ],
  tdaString: [
    ['dates', 'numbers', 'currency'],
    ['05/07/2017', '11.11', '$11.11'],
    ['10/08/2017', '11.11', '$11.11'],
    ['06/04/2018', '11.11', '$11.11'],
  ],
};

test('isTDA verifies testData.tda as a 2D array capable of being operated on', () => {
  expect(T.isTDA(testData.tda))
    .toEqual(true);
  expect(T.isTDA(testData.tdaError))
    .toEqual(false);
});