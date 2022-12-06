// Dependency Injections 
// - Schema 
// - validation library


const buildMakeMenu = require('./menu');
const menuSchema = require('./menu-schema').menuSchema;
const menuUpdateSchema = require('./menu-schema').menuUpdateSchema;
const menuValidator = require('../validator/')(menuSchema);
const menuUpdateValidator = require('../validator/')(menuUpdateSchema);

const makeMenu = buildMakeMenu(menuValidator);
const makeUpdateMenu = buildMakeMenu(menuUpdateValidator);

module.exports =  {
  makeMenu,
  makeUpdateMenu
};
