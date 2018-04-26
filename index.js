const R = require('ramda');

const accountant = require('./accountant');
const folder = require('./folder');
const csv = require('./csv');
const configuration = require('./configuration.json');

const rootPath = configuration.root;
const sources = configuration.sources;
const firstFolder = sources[2];

const readCsv = (fileName) => {
  const file = folder.readFile(fileName);
  file.then((result)=>{
   // console.log(result);
    console.log(csv.parse(result));
  }).catch((err) => {
    throw err;
  })
}

const getFolderPath = source => source.path;
const prependRoot = rootPath => childPath => rootPath + childPath;
const appendFilename = directoryPath => filePath => directoryPath + '\\' + filePath;

const getSourceFolder = R.pipe(getFolderPath, prependRoot(rootPath));

const readSourceFolder = R.pipe(getSourceFolder, folder.readDir);

// directory.then((result)=>{
//   R.forEach(readCsv, result);
// })

// console.log(configuration.types);
R.forEach((source)=>{
  readSourceFolder(source).then((result) => {
    R.forEach((file)=>{
      const folderPath = getSourceFolder(source);
      const filePath = appendFilename(folderPath)(file)
      readCsv(filePath).then((d)=>{
        console.log(d);
      })
    }, result)
  })
}, sources);



