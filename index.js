const R = require('ramda');

const accountant = require('./accountant');
const folder = require('./folder');
const csv = require('./csv');
const configuration = require('./configuration.json');

const rootPath = configuration.root;
const sources = configuration.sources;
const firstFolder = sources[2];

const readCsv = (fileName) => {
  const file = folder.readFile(`${rootPath}\\${firstFolder.folderName}\\${fileName}`);
  file.then((result)=>{
   // console.log(result);
    console.log(csv.parse(result).length);
  }).catch((err) => {
    throw err;
  })
}

// directory.then((result)=>{
//   R.forEach(readCsv, result);
// })

console.log(configuration.types);
