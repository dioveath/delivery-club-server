const menuAccess = require('../../data-access/menu-db/index');
const makeGetMenu = require('./get-menu');
const makeCreateMenu = require('./create-menu');
const makeDeleteMenu = require('./delete-menu');
const makeListMenus = require('./list-menus');
const makeUpdateMenu = require('./update-menu');

const getMenu = makeGetMenu(menuAccess);
const createMenu = makeCreateMenu(menuAccess);
const deleteMenu = makeDeleteMenu(menuAccess);
const listMenus = makeListMenus(menuAccess);
const updateMenu = makeUpdateMenu(menuAccess);

const menuController = {
  getMenu,
  createMenu,
  updateMenu, 
  deleteMenu,
  listMenus,
};

module.exports = menuController;
