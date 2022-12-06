const mongoose = require('../connection');


const User = require('../models/user');
const { seedUsers, userData }  = require('./user');

const Menu = require('../models/menu');
const { seedMenus, menuData }  = require('./menu');

async function resetSeedUsers(data){
  const result = await User.findOne();
  if(result) await mongoose.connection.collections.users.drop();
  await seedUsers(data ?? userData);
}

async function resetSeedMenus(data){
  const result = await Menu.findOne();
  if(result) await mongoose.connection.collections.menus.drop();
  await seedMenus(data ?? menuData);
}

function closeConnection(){
  mongoose.connection.close();
}

module.exports = {
  resetSeedUsers,
  resetSeedMenus,
  closeConnection
};
