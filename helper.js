const R = require('ramda');

/**
 * splits string by delimiter
 * @param {string} delimiter character to delimit by
 * @param {string} string string to break by delimiter
 *
 * @returns {array} resulting strings in an array
 */

module.exports.split = R.curry((delimiter, string) => string.split(delimiter));

/**
 * returns array with first removed from array
 * @param {array} array
 *
 * @return {array} array with the 0 index removed
 */
module.exports.shift = (array) => {
  const arrayClone = array;
  arrayClone.shift();
  return arrayClone;
};
