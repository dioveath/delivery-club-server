// other controllers and drivers that rely on this API (findOrder, listOrders, addOrder)
// TODO: Learn more about Gateway | Interactor  -- 

const { listOrders,
        findOrderBy,
        findOrderById,
        addOrder,
        updateOrder,
        deleteOrder,
        dropOrders
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listOrders,
  findOrderBy,
  findOrderById, 
  addOrder,
  updateOrder,
  deleteOrder, 
  dropOrders,
};
