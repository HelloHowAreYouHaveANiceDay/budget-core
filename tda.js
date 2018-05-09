const R = require('ramda');

const H = require('./helper');

const tag = H.trace('tag');

const rowsLength = R.pipe(R.map(R.length));
const headersLength = R.pipe(R.head, R.length);
const equalsHeadersLength = R.pipe(headersLength, R.equals, R.all);

const headersEqualRowsLength = a => equalsHeadersLength(a)(rowsLength(a));

/**
 * isTDA verifies that the 2D array can be operated on
 * length of all rows need to be equal
 * @param {array} 2D array
 *
 * @returns {bool} whether it's operatable
 */
module.exports.isTDA = R.allPass([headersEqualRowsLength]);
