const R = require('ramda');
const fs = require('fs-extra');

const H = require('./helper');

// pure

const sanitizeR = string => string.split('\r').join('');
const splitLine = H.split('\n');
const splitComma = H.split(',');

const addProperty = R.curry((object, pair) => {
  const newObject = object;
  const pair1 = pair[1];
  newObject[pair[0]] = pair1;
  return newObject;
});


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

// const join = R.reduce((a, b) => )

module.exports.parse = parse;
module.exports.getHeaders = headerRow;
