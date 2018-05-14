const fs = require('fs-extra');

const readFile = filepath => new Promise((resolve, reject) => {
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


module.exports.readDir = readDirectory;
module.exports.readFile = readFile;
