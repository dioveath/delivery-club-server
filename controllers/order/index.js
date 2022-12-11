const orderAccess = require('../../data-access/order-db/index');
const shipdayClient = require('../../lib/shipday');

const makeGetOrder = require('./get-order');
const makeCreateOrder = require('./create-order');
const makeDeleteOrder = require('./delete-order');
const makeListOrders = require('./list-orders');
const makeUpdateOrder = require('./update-order');

const getOrder = makeGetOrder(orderAccess);
const createOrder = makeCreateOrder(orderAccess);
const deleteOrder = makeDeleteOrder(orderAccess);
const listOrders = makeListOrders(shipdayClient);
const updateOrder = makeUpdateOrder(orderAccess);

const orderController = {
  getOrder,
  createOrder,
  updateOrder, 
  deleteOrder,
  listOrders,
};

module.exports = orderController;
