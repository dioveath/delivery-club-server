module.exports = function makeCreatePayment(paymentAccess){

    return async function createPayment(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          const newPayment = await paymentAccess.addPayment(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newPayment
            }
          };
        } catch(error){
          // TODO: Error Logging
          console.log(error);

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
