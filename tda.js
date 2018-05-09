const R = require('ramda');

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

/**
 * getColByIndex returns column
 * @param {array} 2D array
 * @param {index} colIndex
 *
 * @returns {array} 2D array of the column
 */
module.exports.getColByIndex = (a, i) => R.map(graft, R.map(getValByIndex(i), a));
