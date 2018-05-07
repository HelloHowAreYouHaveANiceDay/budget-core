const R = require('ramda');
const fs = require('fs-extra');

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

module.exports.join = R.reduce((a, b) => R.join('')([a, b]), 0);

module.exports.parse = parse;
module.exports.getHeaders = headerRow;
