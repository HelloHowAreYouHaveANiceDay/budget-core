const folder = require('../folder');
const csv = require('../csv');

test('getHeaders gets headers from string', () => {
  const mock = folder.readFile('./example_data/chase_cc_mock.csv');
  return mock.then(result => {
    expect(csv.getHeaders(result))
      .toEqual('Type,Trans Date,Post Date,Description,Amount')
  })
})