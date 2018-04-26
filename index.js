const accountant = require('./accountant');
const csv = require('./csv');
const configuration = require('./configuration.json');

const rootPath = configuration.root;
const sources = configuration.sources;
const folder = sources[0];
const directory = csv.readdir(`${rootPath}\\${folder.folderName}`)

directory.then((result)=>{
  console.log(result);
})