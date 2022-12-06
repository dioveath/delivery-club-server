// other controllers and drivers that rely on this API (findMenu, listMenus, addMenu)
// TODO: Learn more about Gateway | Interactor  -- 

const { listMenus,
        findMenuBy,
        findMenuById,
        addMenu,
        updateMenu,
        deleteMenu,
        dropMenus
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listMenus,
  findMenuBy,
  findMenuById, 
  addMenu,
  updateMenu,
  deleteMenu, 
  dropMenus,
};
