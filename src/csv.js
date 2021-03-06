const R = require('ramda');

const H = require('./helper');

// pure

const sanitizeR = R.pipe(H.split('\r'), R.join(''));
const splitLine = H.split('\n');
const splitComma = H.split(',');

/**
 * gets headers from csv string
 * @param {string} csvString
 *
 * @returns {Array} array of headers
 */
const headerRow = R.pipe(sanitizeR, splitLine, R.head);
const dataRows = R.pipe(sanitizeR, splitLine, R.drop(1));

// needs refactor
const rowToObject = R.curry((headers, values) => {
  const newObject = {};
  const pairs = R.zip(headers, values);
  R.forEach(H.addProperty(newObject), pairs);
  return newObject;
});


/**
 * returns a collection of objects from a csv string
 * @param {string} csvString csv string with linebreaks \n or \n\r
 *
 * @returns {Array} collection collection of objects keyed by headers
 */
const parse = (csvString) => {
  const headers = splitComma(headerRow(csvString));
  const data = dataRows(csvString);
  const collection = [];
  R.forEach((row) => {
    const rowOb = rowToObject(headers, splitComma(row));
    collection.push(rowOb);
  }, data);
  // console.log(collection);
  return collection;
};

module.exports.parse = parse;

/**
 * returns table from csvString
 * @param {string} csvString
 *
 * @returns {array} table 
 */
const parseTable = (csvString) => {
  const headers = (headerRow(csvString));
  const data = R.pipe(dataRows, R.map(splitComma));
  return R.prepend(headers, data(csvString));
};
module.exports.parseTable = parseTable;

/**
 * joins a series of csvs to the header csv
 * @param {string} headCsv csvString to join to
 * @param {Array} tailCsvs csvStrings to join to
 *
 * @returns {string} full csvString with the tail strings added
 * */
module.exports.join = R.curry((headCsv, tailCsvs) => {
  const dataString = R.join('\n', tailCsvs.map(dataRows));
  return R.join('\n', [headCsv, dataString]);
});

/**
 * pulls folder
 */

module.exports.getHeaders = headerRow;
