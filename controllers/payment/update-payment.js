module.exports = function makeUpdateUsser(paymentAccess){
  
  return async function updatePayment(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const updatedPayment = await paymentAccess.updatePayment(httpRequest.params.id, httpRequest.body);

      if(!updatedPayment)
        throw new Error('No Payment with id: ' + httpRequest.params.id);      

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedPayment
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
