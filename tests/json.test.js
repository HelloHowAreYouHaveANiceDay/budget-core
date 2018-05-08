const path = require('path');
const J = require('../json');

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
  const testOb = require(filepath);
  const test1 = J.isValid(filepath);
  expect(test1)
    .toEqual(true);
});

// test('getDepth gets depth from JSON file', () => {
//   const filepath = path.join(__dirname, '../example_data/f_game_mock.json');
//   const test1 = J.getDepth(filepath);
//   console.log(test1);
//   expect(test1)
//     .toBeInstanceOf(Number)
// });
