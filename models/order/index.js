// Dependency Injections 
// - Schema 
// - validation library


const buildMakeOrder = require('./order');
const orderSchema = require('./order-schema').orderSchema;
const orderUpdateSchema = require('./order-schema').orderUpdateSchema;
const orderValidator = require('../validator/')(orderSchema);
const orderUpdateValidator = require('../validator/')(orderUpdateSchema);

const makeOrder = buildMakeOrder(orderValidator);
const makeUpdateOrder = buildMakeOrder(orderUpdateValidator);

module.exports =  {
  makeOrder,
  makeUpdateOrder
};
