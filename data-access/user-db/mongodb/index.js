// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const User = require('../../../db/mongodb/models/user');
const serialize = require('./serializer');
const makeUser = require('../../../models/user/index').makeUser;
const makeUpdateUser = require('../../../models/user/index').makeUpdateUser;
const errorFormatter = require('../../errorFormatter');
const logger = require('../../../lib/logger');


function listUsers(){
  return User.find({}).then(serialize).catch(errorFormatter);
}

function findUserBy(prop, val){
  if(prop === 'id') prop = '_id';
  return User.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findUserById(id){
  return User.findById(id).then(serialize).catch(errorFormatter);
}

async function addUser(userInfo){
  // defaults
  userInfo.profile_link = '';
  userInfo.orders = [];
  userInfo.zones = [];
  userInfo.whatwords = 'default default default';

  const user = await makeUser(userInfo);

  const newUser = {
    name: user.getName(),
    password: user.getPassword(),
    email: user.getEmail(),
    address: user.getAddress(),
    postcode: user.getPostcode(),
    phone_number: user.getPhoneNumber(),
    whatwords: user.getWhatWords(),
    profile_link: user.getProfileLink(),
    orders: user.getOrders(),
    zones: user.getZones(),
    phone_verified: false,
    email_verified: false,
  };

  return User.create(newUser).then(serialize).catch(errorFormatter);
}


async function updateUser(id, updateUserInfo){
  if(!id) throw new Error("You must supply id!");

  const validUpdateUserData = await makeUpdateUser(updateUserInfo);
  const { phone_number } = updateUserInfo;

  if(updateUserInfo.hasOwnProperty('password'))
    updateUserInfo.password = validUpdateUserData.getPassword();

  if(phone_number)
    updateUserInfo.phone_verified = false;

  // if error is not thrown, then we can update with updateUserInfo in database
  return User.findByIdAndUpdate(id, updateUserInfo, { new: true }).then(serialize).catch(errorFormatter);
}

async function addOrder(id, orderId){
  if(!id || !orderId) throw new Error("You must supply id!");
  return User.findByIdAndUpdate(id, {$push: { orders: orderId }}, { new: true }).then(serialize).catch(errorFormatter);
}

async function removeOrder(id, orderId){
  if(!id || !orderId) throw new Error("You must supply id!");
  return User.findByIdAndUpdate(id, {$pull: { orders: orderId }}, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteUser(id){
  return User.findByIdAndDelete(id).then(res => {
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


function dropUsers(){
  return User.deleteMany().catch(errorFormatter);
}


module.exports = {
  listUsers,
  findUserBy,
  findUserById, 
  addUser,
  updateUser,
  addOrder,
  removeOrder,
  deleteUser, 
  dropUsers
};
