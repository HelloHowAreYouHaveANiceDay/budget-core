const R = require('ramda');


// ARRAY HELPERS

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

// OBJECT HELPERS

/**
 * returns object with tuple added as property
 * @param {object} object to add to
 * @param {tuple} [key, value] tuple to add
 *
 * @returns {object} cloned object with property added
 */
module.exports.addProperty = R.curry((object, pair) => {
  const newObject = object;
  const pair1 = pair[1];
  newObject[pair[0]] = pair1;
  return newObject;
});
