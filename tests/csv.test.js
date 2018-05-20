const folder = require('../src/folder');
const csv = require('../src/csv');

test('getHeaders gets headers from string', () => {
  const mock = folder.readFile('./example_data/chase_cc_mock.csv');
  return mock.then((result) => {
    expect(csv.getHeaders(result)).toEqual('Type,Trans Date,Post Date,Description,Amount');
  });
});

test('parse parses csv strings from file', () => {
  const mock = folder.readFile('./example_data/chase_cc_mock.csv');
  return mock.then((result) => {
    expect(csv.parse(result).length).toEqual(101);
    expect(csv.parse(result)).toBeInstanceOf(Array);
  });
});

test('join joins tail csvs into one csv strings', () => {
  const stringA = 'head1,head2,head3\nval1,val2,val3';
  const stringB = 'head1,head2,head3\nval4,val5,val6';
  const stringC = 'head1,head2,head3\nval7,val8,val9';
  const test1 = csv.join(stringA, [stringB]);
  const test2 = csv.join(stringA, [stringB, stringC]);
  expect(test1).toEqual('head1,head2,head3\nval1,val2,val3\nval4,val5,val6');
  expect(test2).toEqual('head1,head2,head3\nval1,val2,val3\nval4,val5,val6\nval7,val8,val9');
});

