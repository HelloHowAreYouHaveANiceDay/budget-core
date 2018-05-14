const folder = require('../folder');

test('readDirectory gets file names', () => {
  expect.assertions(1);
  return folder.readDir('./example_data').then((data) => {
    expect(data.length)
      .toEqual(7);
  });
});
