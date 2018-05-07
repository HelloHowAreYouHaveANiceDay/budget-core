const R = require('ramda');
const fs = require('fs-extra');

// pure
const split = R.curry((delimiter, string) => string.split(delimiter));

const sanitizeR = string => string.split('\r').join('');
const splitLine = split('\n');
const splitComma = split(',');

/**
 * gets headers from csv string
 * @param {string} csvString
 *
 * @returns {Array} array of headers
 */
const headerRow = R.pipe(sanitizeR, splitLine, R.head);
const dataRows = R.pipe(sanitizeR, splitLine, R.drop(1));

const addProperty = R.curry((object, pair) => {
  const newObject = object;
  const pair1 = pair[1];
  newObject[pair[0]] = pair1;
  return newObject;
});

// needs refactor
const rowToObject = R.curry((headers, values) => {
  const newObject = {};
  const pairs = R.zip(headers, values);
  R.forEach(addProperty(newObject), pairs);
  return newObject;
});

/**
 * returns a colleciton of objects from a csv string
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
module.exports.getHeaders = headerRow;
