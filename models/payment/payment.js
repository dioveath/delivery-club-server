// Entity - Payment

var buildMakePayment = function(paymentValidator){
  return async ({
    order_id,
    status,
    payment_method
  } = {}) => {

    var error = paymentValidator({
      order_id,
      status,
      payment_method
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getOrderId: () => order_id,
      getStatus: () => status,
      getPaymentMethod: () => payment_method
    });
    
  };

};


module.exports = buildMakePayment;
