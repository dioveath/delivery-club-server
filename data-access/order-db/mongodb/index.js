// uses mongoose implementation of findOrder, listOrders, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Order = require('../../../db/mongodb/models/order');
const serialize = require('./serializer');
const makeOrder = require('../../../models/order/index').makeOrder;
const makeUpdateOrder = require('../../../models/order/index').makeUpdateOrder;
const errorFormatter = require('../../errorFormatter');


function listOrders(){
  return Order.find({}).then(serialize).catch(errorFormatter);
}

function findOrderBy(prop, val){
  if(prop === 'id') prop = '_id';
  return Order.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findOrderById(id){
  return Order.findById(id).then(serialize).catch(errorFormatter);
}

async function addOrder(orderInfo){
  const order = await makeOrder(orderInfo);

  const newOrder = {
    status: order.getStatus(),
    ordered_by: order.getOrderedBy(),
    delivered_by: order.getDeliveredBy(),
    recipes: order.getRecipes(),
    total_amount: order.getTotalAmount(),
    location: order.getLocation(),
    postcode: order.getPostcode()
  };

  return Order.create(newOrder).then(serialize).catch(errorFormatter);
}


async function updateOrder(id, updateOrderInfo){
  if(!id) throw new Error("You must supply id!");
  const validUpdateOrderData = await makeUpdateOrder(updateOrderInfo);
  // if error is not thrown, then we can update with updateOrderInfo in database
  return Order.findByIdAndUpdate(id, updateOrderInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteOrder(id){
  return Order.findByIdAndDelete(id).then(res => {
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


function dropOrders(){
  return Order.deleteMany().catch(errorFormatter);
}


module.exports = {
  listOrders,
  findOrderBy,
  findOrderById, 
  addOrder,
  updateOrder, 
  deleteOrder, 
  dropOrders
};
