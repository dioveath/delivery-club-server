
module.exports = function makeGetPayment(paymentAccess) {

  return async function getPayment(httpRequest){ // Custom Httprequest (Made from express default requests)
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const payment = await paymentAccess.findPaymentById(httpRequest.params.id);

      if(payment == null) {
        throw new Error("No Payment with id: " + httpRequest.params.id);
      }

      return { // this is response model
        headers,
        statusCode: 200,
        body: {
          status: 'success', 
          payment
        }
      };

    } catch(error){
      // TODO: Error logging
      // console.log(error);

      return {
        headers,
        statusCode: 400,
        body: {
          status: 'fail',
          errorList: error.message.split(',')
        }
      };
    }
  }; 

};
