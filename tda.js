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
 * getColType returns type based on values in column
 * @param {array} 2D array column
 *
 * @returns {string} type of the column
 */
// TODO: is coltype really the right thing?
const colType = (a, c) => {
  const values = R.pipe(getColByName, getColValues);
  console.log();
};
module.exports.colType = colType;


// ROWS
