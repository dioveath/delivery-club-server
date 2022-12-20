const shipdayClient = require('../../lib/shipday');

const makeGetOrder = require('./get-order');
const makeCreateOrder = require('./create-order');
const makeDeleteOrder = require('./delete-order');
const makeListOrders = require('./list-orders');
const makeUpdateOrder = require('./update-order');

const getOrder = makeGetOrder(shipdayClient);
const createOrder = makeCreateOrder(shipdayClient);
const deleteOrder = makeDeleteOrder(shipdayClient);
const listOrders = makeListOrders(shipdayClient);
const updateOrder = makeUpdateOrder(shipdayClient);

const orderController = {
  getOrder,
  createOrder,
  updateOrder, 
  deleteOrder,
  listOrders,
};

module.exports = orderController;
