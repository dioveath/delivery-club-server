module.exports = function makeListPayments(paymentAccess){
  
  return async function listPayments(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const payments = await paymentAccess.listPayments();
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          payments
        }
      };
    } catch (error){
      // Error logging
      console.log(error);
      return {
        headers,
        statusCode: 400,
        body: {
          status: 'fail',
          errorList: error.message.split(',')
        }
      };

    };

  };

};
