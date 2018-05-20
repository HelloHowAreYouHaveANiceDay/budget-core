const R = require('ramda');

const H = require('./helper');

const tag = H.trace('tag'); /* eslint no-unused-vars: 0 */

// rowsLength :: [[]] => []
const rowsLength = R.pipe(R.map(R.length));

// headersLength :: [[]] => a
const headersLength = R.pipe(R.head, R.length);

// equalsHeadersLength :: [[]] => bool
const equalsHeadersLength = R.pipe(headersLength, R.equals, R.all);

// getValByIndex :: i => [] => [][i]
const getValByIndex = R.curry((i, a) => a[i]);

// graft :: a => [a]
const graft = R.map(a => [a]);

graft('a', 'b');

const headersEqualRowsLength = a => equalsHeadersLength(a)(rowsLength(a));

/**
 * isTDA verifies that the 2D array can be operated on
 * length of all rows need to be equal
 * @param {array} 2D array
 *
 * @returns {bool} whether it's operatable
 */
module.exports.isTDA = R.allPass([headersEqualRowsLength]);

/**
 * make2D takes headers and values and combines
 * @param {array} headers
 * @param {array} matrix of values
 *
 * @returns {array} 2D array with headers preceeding
 */
const make2D = R.curry((h, v) => R.prepend(h, v));


// COLUMNS

/**
 * getColByIndex returns column
 * @param {array} 2D array
 * @param {index} colIndex
 *
 * @returns {array} 2D array of the column
 */
const getColByIndex = (a, i) => graft(R.map(getValByIndex(i), a));
module.exports.getColByIndex = getColByIndex;

/**
 * getColByName returns column from column name
 * @param {array} 2D array
 * @param {string} columnName
 *
 * @returns {array} 2D array of the column
 */
const getColByName = (a, n) => {
  const index = R.pipe(R.head, R.indexOf(n));
  return getColByIndex(a, index(a));
};
module.exports.getColByName = getColByName;

/**
 * getColValues drops header from column
 * @param {array} Column with header
 *
 * @returns {array} returns array with only values
 */
const getColValues = R.drop(1);
module.exports.getColValues = getColValues;


/**
 * renameHeader
 * @param {array} array
 * @param {string} header to rename
 * @param {string} name to rename to
 *
 * @returns {array} array
 */
const renameHeader = (a, h, r) => {
  const headers = R.head(a);
  const replacingIndex = R.indexOf(h, headers);
  headers[replacingIndex] = r;
  return make2D(headers, getColValues(a));
};
module.exports.renameHeader = renameHeader;

/**
 * isDateColuCnrry
 * @param {array} column
 *
 * @returns {bool} column contains date data
 */
const isDateColumn = R.pipe(
  getColValues,
  R.all(H.isMMDDYYYY),
);
module.exports.isDateColumn = isDateColumn;

/**
 * isCurrencyColumn
 * is truthy, any parsable currency string is considered true. including number columns
 * @param {array} column
 *
 * @returns {bool} column contains currency/money data
 */
const isCurrencyColumn = R.pipe(
  getColValues,
  R.flatten,
  R.map(H.toCurrency),
  R.all(R.lt(0)),
);
module.exports.isCurrencyColumn = isCurrencyColumn;

/**
 * isNumberColumn
 * @param {array} column
 *rrC
 * @returns {bool} column can be converted to numbers
 */
const isNumberColumn = R.pipe(
  getColValues,
  R.flatten,
  R.map(Number),
  R.all(R.lt(0)),
);
module.exports.isNumberColumn = isNumberColumn;

/**
 * isStringColumn
 * @param {array} column
 *
 * @returns {bool} column contains string data
 */

/**
 * convertColumnToDates
 * @param {array} 2Darray
 * @param {string} header
 *
 * @returns {array}
 */
const convertColumnToDates = (c) => {
  const headers = R.head(c);
  const values = getColValues(c);
  const valuesDates = R.map(R.map(H.toDateFromMMDDYYYY));
  return R.prepend(headers, valuesDates(values));
};

module.exports.convertColumnToDates = convertColumnToDates;


/**
 * convertColumnToCurrencyAmount
 * @param {array} 2Darray
 * @param {strng} header
 *
 * @returns {array}
 */
const convertColumnToCurrencyAmount = (c) => {
  const headers = R.head(c);
  const values = getColValues(c);
  const valuesCurrency = R.map(R.map(H.toCurrency));
  return R.prepend(headers, valuesCurrency(values));
};

module.exports.convertColumnToCurrencyAmount = convertColumnToCurrencyAmount;

/**
 * dropColumn
 * @param {array} 2Darray
 * @param {string} header
 *
 * @returns {array}
 */
const dropColumn = (a, h) => {
  const colIndex = R.pipe(R.head, R.flatten, R.indexOf(h))(a);
  const drop = R.map(R.remove(colIndex, 1));
  return drop(a);
};

dropColumn([
  ['dates', 'numbers', 'currency'],
  ['05/07/2017', '11.11', '$11.11'],
  ['10/08/2017', '11.11', '$11.11'],
], 'numbers');

dropColumn([
  ['dates', 'numbers', 'currency'],
  ['05/07/2017', '11.11', '$11.11'],
  ['10/08/2017', '11.11', '$11.11'],
], 'dates');

/**
 * addColumn
 * @param {array} 2Darray
 * @param {array} column
 *
 * @returns {array}
 */

// ROWS
