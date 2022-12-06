// uses mongoose implementation of findPayment, listPayments, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Payment = require('../../../db/mongodb/models/payment');
const serialize = require('./serializer');
const makePayment = require('../../../models/payment/index').makePayment;
const makeUpdatePayment = require('../../../models/payment/index').makeUpdatePayment;
const errorFormatter = require('../../errorFormatter');


function listPayments(){
  return Payment.find({}).then(serialize).catch(errorFormatter);
}

function findPaymentBy(prop, val){
  if(prop === 'id') prop = '_id';
  return Payment.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findPaymentById(id){
  return Payment.findById(id).then(serialize).catch(errorFormatter);
}

async function addPayment(paymentInfo){
  const payment = await makePayment(paymentInfo);

  const newPayment = {
    order_id: payment.getOrderId(),
    status: payment.getStatus(),
    payment_method: payment.getPaymentMethod()
  };

  return Payment.create(newPayment).then(serialize).catch(errorFormatter);
}


async function updatePayment(id, updatePaymentInfo){
  if(!id) throw new Error("You must supply id!");
  const validUpdatePaymentData = await makeUpdatePayment(updatePaymentInfo);
  // if error is not thrown, then we can update with updatePaymentInfo in database
  return Payment.findByIdAndUpdate(id, updatePaymentInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deletePayment(id){
  return Payment.findByIdAndDelete(id).then(res => {
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


function dropPayments(){
  return Payment.deleteMany().catch(errorFormatter);
}


module.exports = {
  listPayments,
  findPaymentBy,
  findPaymentById, 
  addPayment,
  updatePayment, 
  deletePayment, 
  dropPayments
};
