const folder = require("../folder");

test("readDirectory gets file names", () => {
  expect.assertions(1);
  return folder.readDir("./example_data").then(data => {
    expect(data).toEqual([
      "amazon_mock.csv",
      "chase_acct_mock.csv",
      "chase_cc_mock.csv",
      "mint_mock.csv"
    ]);
  });
});