const R = require('ramda');

// /////////////
// FN HELPERS //
// /////////////

/**
 * a, b, c such that a(c) === b(c)
 * @param {fn} a
 * @param {fn} b
 * @param {any} c
 *
 * @returns {bool}
 */
const isEqual = R.curry((a, b, c) => R.equals(a(c), b(c)));

/**
 * passthrough function for tag logging
 * @param {string} tab tag for logger
 * @param {fn} passthrough
 *
 * @returns {fn} passthroug
 */
const trace = R.curry((tag, a) => { console.log('tag', a); return a; });
module.exports.trace = trace;


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
 * grabs first value of object
 * @param {object}
 *
 * @returns {any} first value
 */
const firstVal = o => R.values(o)[0];

/**
 * returns a flat list of unique keys from first level an object's values
 * @param {object}
 *
 * @returns {array} unique first level keys
 */
const flatValKeys = R.pipe(R.values, R.map(R.keys), R.flatten, R.uniq);
module.exports.flatValKeys = flatValKeys;

/**
 * returns the keys of the first value of an object
 * @param {object}
 *
 * @returns {array} keys
 */
const firstValKeys = R.pipe(firstVal, R.keys);

/**
 * returns true if object is listable
 * listable is defined as if the keys of the first value equal the flat value keys of the object
 * @param {object}
 *
 * @returns {bool}
 */
const isListableCollection = isEqual(flatValKeys, firstValKeys);

/**
 * returns true if all values of the object is of type 'Object'
 * @param {object}
 *
 * @returns {bool}
 */
const isCollectionOfObjects = R.pipe(R.values, R.map(R.type), R.all(R.equals('Object')));

/**
 * isKeyedTable
 * keytable is defined as object with 1st level depth of
 * equal keys and values where all values are objects
 * and their keys are all equal
 * @param {object} object
 *
 * @returns {boo} whether it is KeyedTable
 */
module.exports.isKeyedTable = R.allPass([isListableCollection, isCollectionOfObjects]);

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
