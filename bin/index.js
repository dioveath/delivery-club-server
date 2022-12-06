const Commander = require('commander');
const { resetSeedUsers, resetSeedMenus, closeConnection } = require('./db-commands');

const currentVersion = '0.0.1';

const program = new Commander.Command();
program.version(currentVersion);

program
  .option('-v --version', "Displays the current version.")
  .option('-d, --debug', "Outputs extra debugging.");

program
  .command('db <action> <model> [data]')
  .description("Commands for db related actions. <action> <model> <data>")
  .option('-e, --extras', "Displays all extra information.")
  .action(dbAction);


const options = program.opts();
program.parse(process.argv);

if(options.debug) console.log(options);
if(options.version) console.log(currentVersion);


async function dbAction(action, model, data){
  switch(action){
  case "seed":
    await seedDB(model, data);
    break;
  default:
    console.log("ERROR: FEATURE TO BE IMPLEMENTED!");
    break;
  }
  // closeConnection();
}


async function seedDB(model, data){
  switch(model){
  case "user":
    await resetSeedUsers(data);
    break;
  case "menu":
    await resetSeedMenus(data);
    break;
  default:
    console.log("ERROR: NO SUCH MODEL.");
    break;
  }
}
