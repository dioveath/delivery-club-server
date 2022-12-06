const paymentAccess = require('../../data-access/payment-db/index');
const makeGetPayment = require('./get-payment');
const makeCreatePayment = require('./create-payment');
const makeDeletePayment = require('./delete-payment');
const makeListPayments = require('./list-payments');
const makeUpdatePayment = require('./update-payment');

const getPayment = makeGetPayment(paymentAccess);
const createPayment = makeCreatePayment(paymentAccess);
const deletePayment = makeDeletePayment(paymentAccess);
const listPayments = makeListPayments(paymentAccess);
const updatePayment = makeUpdatePayment(paymentAccess);

const paymentController = {
  getPayment,
  createPayment,
  updatePayment, 
  deletePayment,
  listPayments,
};

module.exports = paymentController;
