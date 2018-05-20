const path = require('path');
const R = require('ramda');

const J = require('../src/json');
const CSV = require('../src/csv');

test('getKeys gets Keys from JSON file', () => {
  const filepath = path.join(__dirname, '../example_data/f_players_mock.json');
  const test1 = J.getKeys(filepath);
  expect(test1)
    .toBeInstanceOf(Array);
  expect(test1.length)
    .toEqual(7827);
});


test('isValid checks whether JSON file contains a valid collection', () => {
  const filepath = path.join(__dirname, '../example_data/f_players_mock.json');
  const test1 = J.isValid(filepath);
  expect(test1)
    .toEqual(true);
});

test('KTtoCSV turns keyedTable to csv string', () => {
  const table = {
    keyOne: {
      tid: 'keyOne',
      kOne: 'p1',
      kTwo: 'p2',
    },
    keyTwo: {
      tid: 'keyTwo',
      kOne: 'p3',
      kTwo: 'p4',
    },
  };
  const test1 = J.KTtoCSV(table);
  const test2 = CSV.parse(test1);
  // expect(test1)
  //   .toBeInstanceOf(String)
  expect(test1)
    .toEqual('tid,kOne,kTwo\nkeyOne,p1,p2\nkeyTwo,p3,p4');
  expect(test2)
    .toEqual(R.values(table));
});

test('KTtoTDA turns keyedTable to a 2d array', () => {
  const table = {
    keyOne: {
      tid: 'keyOne',
      kOne: 'p1',
      kTwo: 'p2',
    },
    keyTwo: {
      tid: 'keyTwo',
      kOne: 'p3',
      kTwo: 'p4',
    },
  };
  const TDA1 = [['tid', 'kOne', 'kTwo'], ['keyOne', 'p1', 'p2'], ['keyTwo', 'p3', 'p4']];
  const test1 = J.KTtoTDA(table);
  expect(test1)
    .toBeInstanceOf(Array);
  expect(test1)
    .toEqual(TDA1);
});

// test('getDepth gets depth from JSON file', () => {
//   const filepath = path.join(__dirname, '../example_data/f_game_mock.json');
//   const test1 = J.getDepth(filepath);
//   console.log(test1);
//   expect(test1)
//     .toBeInstanceOf(Number)
// });
