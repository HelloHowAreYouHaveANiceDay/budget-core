const R = require('ramda');

const H = require('./helper');

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
 * toCsv converts a keyedTable to a csv
 * @param {object} keyedTable
 *
 * @returns {string} csv as string
 */
module.exports.KTtoCSV = (o) => {
  const headers = H.flatValKeys(o);
  const values = R.pipe(R.map(R.values), R.values)(o);
  const csvArray = R.prepend(headers, values);
  // console.log(csvArray);
  const toCsvString = R.pipe(R.join('\n'));
  // console.log(toCsvString(csvArray));
  return toCsvString(csvArray);
};

/**
 * KTtoTDA converts a keyTable to a 2D array
 * @param {object} keyedTable
 *
 * @returns {array} 2D array
 */
module.exports.KTtoTDA = (o) => {
  const headers = H.flatValKeys(o);
  const values = R.pipe(R.map(R.values), R.values)(o);
  const csvArray = R.prepend(headers, values);
  return csvArray;
};

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
