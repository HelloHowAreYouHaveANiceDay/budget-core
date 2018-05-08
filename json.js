const R = require('ramda');

const H = require('./helper');

const keysLength = R.pipe(require, R.keys, R.length);

const valLength = R.pipe(require, R.values, R.length);


const isArray = o => typeof o === 'array';


const isEqual = R.curry((a, b, c) => {
  return a(c) === b(c);
});

const hasArray = R.all(isArray);



/**
 * getKeys from JSON file
 * @param {string} filepath
 *
 * @returns {array} keys from json objects
 */
module.exports.getKeys = R.pipe(require, H.getKeys);


/**
 * isValid checks whether JSON contails a valid collection
 * @param {string} filepath
 *
 * @returns {bool} whether file is a valid collection
 */
module.exports.isValid = R.pipe(R.values, R.is(Array));

/**
 * toCsv converts a JSON collection to a csv
 * @param {string} filepath
 *
 * @returns {string} csv as string
 */

/**
 * getDepth returns depth from JSON file
 * @param {string} filepath
 * 
 * @returns {int} depth 
 */
// const getDepth = filepath => {
//   const file = require(filepath);
//   let depth = 0
//   if (file.chidren) {
//     file.children.forEach((d) => {
//       const tempDepth = getDepth(d)
//       if (tempDepth > depth) {
//         depth = tempDepth;
//       }
//     })
//   }
//   return 1 + depth
// }
// module.exports.getDepth = getDepth;