const R = require('ramda');
const fs = require('fs-extra');


// impure
const getFile = filepath => new Promise((resolve, reject) => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) { reject(err); }
    resolve(data);
  });
});

const readDirectory = filepath => new Promise((resolve, reject) => {
  fs.readdir(filepath, 'utf-8', (err, data) => {
    if (err) { reject(err); }
    resolve(data);
  });
});


// pure
const split = R.curry((delimiter, string) => string.split(delimiter));

const splitLine = split('\r\n');
const splitComma = split(',');

const headerRow = R.pipe(splitLine, R.head);
const dataRows = R.pipe(splitLine, R.drop(1));

const addProperty = R.curry((object, pair) => {
  object[pair[0]] = pair[1];
  return object;
});


// needs refactor
const rowToObject = R.curry((headers, values) => {
  const newObject = {};
  const pairs = R.zip(headers, values);
  R.forEach(addProperty(newObject), pairs);
  return newObject;
});


const parse = (csvString) => {
  const headers = splitComma(headerRow(csvString));
  const data = dataRows(csvString);
  const collection = [];
  R.forEach((row) => {
    collection.push(rowToObject(headers,
      splitComma(row)));
  }, data);
  // console.log(collection);
  return collection;
};


const getCSV = R.composeP(parse, getFile);

module.exports.get = getCSV;
module.exports.readdir = readDirectory;
