// other controllers and drivers that rely on this API (findPayment, listPayments, addPayment)
// TODO: Learn more about Gateway | Interactor  -- 

const { listPayments,
        findPaymentBy,
        findPaymentById,
        addPayment,
        updatePayment,
        deletePayment,
        dropPayments
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listPayments,
  findPaymentBy,
  findPaymentById, 
  addPayment,
  updatePayment,
  deletePayment, 
  dropPayments,
};
