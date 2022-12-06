// Dependency Injections 
// - Schema 
// - validation library


const buildMakePayment = require('./payment');
const paymentSchema = require('./payment-schema').paymentSchema;
const paymentUpdateSchema = require('./payment-schema').paymentUpdateSchema;
const paymentValidator = require('../validator/')(paymentSchema);
const paymentUpdateValidator = require('../validator/')(paymentUpdateSchema);

const makePayment = buildMakePayment(paymentValidator);
const makeUpdatePayment = buildMakePayment(paymentUpdateValidator);

module.exports =  {
  makePayment,
  makeUpdatePayment
};
