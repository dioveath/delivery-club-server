// uses mongoose implementation of findMenu, listMenus, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Menu = require('../../../db/mongodb/models/menu');
const serialize = require('./serializer');
const makeMenu = require('../../../models/menu/index').makeMenu;
const makeUpdateMenu = require('../../../models/menu/index').makeUpdateMenu;
const errorFormatter = require('../../errorFormatter');


function listMenus(){
  return Menu.find({}).then(serialize).catch(errorFormatter);
}

function findMenuBy(prop, val){
  if(prop === 'id') prop = '_id';
  return Menu.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findMenuById(id){
  return Menu.findById(id).then(serialize).catch(errorFormatter);
}

async function addMenu(menuInfo){
  const menu = await makeMenu(menuInfo);

  const newMenu = {
    name: menu.getName(),
    description: menu.getDescription(),
    recipes: menu.getRecipes()
  };

  return Menu.create(newMenu).then(serialize).catch(errorFormatter);
}


async function updateMenu(id, updateMenuInfo){
  if(!id) throw new Error("You must supply id!");
  const validUpdateMenuData = await makeUpdateMenu(updateMenuInfo);
  // if error is not thrown, then we can update with updateMenuInfo in database
  return Menu.findByIdAndUpdate(id, updateMenuInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteMenu(id){
  return Menu.findByIdAndDelete(id).then(res => {
    if(!res)
      throw {
        name: 'Error',
        code: 11011, // custom error code
        _id: id, 
      };

    return {
      id: res._id.toString(),
    };
  }).catch(errorFormatter);
}


function dropMenus(){
  return Menu.deleteMany().catch(errorFormatter);
}


module.exports = {
  listMenus,
  findMenuBy,
  findMenuById, 
  addMenu,
  updateMenu, 
  deleteMenu, 
  dropMenus
};
