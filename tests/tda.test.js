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

test('getColByIndex gets column by headerIndex', () => {
  expect(T.getColByIndex(testData.tda, 0))
    .toEqual([
      ['col1'],
      ['r1c1'],
      ['r2c1'],
    ]);
  expect(T.getColByIndex(testData.tda, 2))
    .toEqual([
      ['col3'],
      ['r1c3'],
      ['r2c3'],
    ]);
});

test('getColByName gets column by headerName', () => {
  expect(T.getColByName(testData.tda, 'col1'))
    .toEqual([
      ['col1'],
      ['r1c1'],
      ['r2c1'],
    ]);
  expect(T.getColByName(testData.tda, 'col3'))
    .toEqual([
      ['col3'],
      ['r1c3'],
      ['r2c3'],
    ]);
});

test('getColValues drops header from column', () => {
  expect(T.getColValues([
    ['col3'],
    ['r1c3'],
    ['r2c3'],
  ]))
    .toEqual([
      ['r1c3'],
      ['r2c3'],
    ]);
});

test('renameHeader renames the header of a column', () => {
  expect(T.renameHeader(testData.tda, 'col1', 'colOne'))
    .toEqual([
      ['colOne', 'col2', 'col3'],
      ['r1c1', 'r1c2', 'r1c3'],
      ['r2c1', 'r2c2', 'r2c3'],
    ]);
});

test('isDateColumn determins whether column contains dates', () => {
  expect(T.isDateColumn([
    ['col1'],
    ['01/02/1930'],
    ['01/02/1930'],
  ])).toEqual(true);

  expect(T.isDateColumn([
    ['col1'],
    ['12'],
    ['34'],
  ])).toEqual(false);
});

test('isCurrency determins whether column contains dates', () => {
  expect(T.isCurrencyColumn([
    ['col1'],
    ['$126.50'],
    ['$133.50'],
  ])).toEqual(true);

  expect(T.isCurrencyColumn([
    ['col1'],
    ['126.50'],
    ['133.50'],
  ])).toEqual(true);

  expect(T.isCurrencyColumn([
    ['col1'],
    ['traffic'],
    ['cones'],
  ])).toEqual(false);
});
