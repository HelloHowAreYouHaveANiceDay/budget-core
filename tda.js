const R = require('ramda');
const moment = require('moment');

const H = require('./helper');

const tag = H.trace('tag');

// rowsLength :: [[]] => []
const rowsLength = R.pipe(R.map(R.length));

// headersLength :: [[]] => a
const headersLength = R.pipe(R.head, R.length);

// equalsHeadersLength :: [[]] => bool
const equalsHeadersLength = R.pipe(headersLength, R.equals, R.all);

// getValByIndex :: i => [] => [][i]
const getValByIndex = R.curry((i, a) => a[i]);

// graft :: a => [a]
const graft = a => [a];

const headersEqualRowsLength = a => equalsHeadersLength(a)(rowsLength(a));

/**
 * isTDA verifies that the 2D array can be operated on
 * length of all rows need to be equal
 * @param {array} 2D array
 *
 * @returns {bool} whether it's operatable
 */
module.exports.isTDA = R.allPass([headersEqualRowsLength]);

// COLUMNS

/**
 * getColByIndex returns column
 * @param {array} 2D array
 * @param {index} colIndex
 *
 * @returns {array} 2D array of the column
 */
const getColByIndex = (a, i) => R.map(graft, R.map(getValByIndex(i), a));
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

/**
 * isDateColumn
 * @param {array} column
 *
 * @returns {bool} column contains date data
 */

/**
 * isCurrencyColumn
 * @param {array} column
 *
 * @returns {bool} column contains currency/money data
 */

/**
 * isNumberColumn
 * @param {array} column
 *
 * @returns {bool} column can be converted to numbers
 */

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

/**
 * convertColumnToCurrencyAmount
 * @param {array} 2Darray
 * @param {strng} header
 *
 * @returns {array}
 */

/**
 * dropColumn
 * @param {array} 2Darray
 * @param {string} header
 *
 * @returns {array}
 */

/**
 * addColumn
 * @param {array} 2Darray
 * @param {array} column
 *
 * @returns {array}
 */

// ROWS
