const R = require('ramda');

// ////////////////
// ARRAY HELPERS //
// ////////////////

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

/**
 * joins two strings
 * @param {string} a first string
 * @param {string} b second string
 *
 * @returns {stirng} string 'ab'
 */
module.exports.join = (a, b) => R.join('', [a, b]);

// //////////////////
// OBJECT HELPERS //
// //////////////////

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

/**
 * isKeyedTable if length of object keys === length of object values
 * keytable is defined as object with 1st level depth of equal keys and values where all values are objects
 * and their keys are all equal
 * @param {object} object
 *
 * @returns {boo} whether it is KeyedTable
 */
module.exports.isKeyedTable = R.pipe(R.values, R.map(R.type), R.all(R.equals('Object')));

/**
 * returns keys from Object
 * @param {object}
 * 
 * @returns {array} keys
 */
const getKeys = o => Object.keys(o);
module.exports.getKeys = getKeys;

// /////////////////////
// COLLECTION HELPERS //
// /////////////////////

/**
 * returns array of all unique keys in collection
 * @param {collection} collection of objects
 *
 * @returns {array} unique keys in collection
 */
module.exports.flatKeys = R.pipe(R.map(getKeys), R.flatten, R.uniq);
