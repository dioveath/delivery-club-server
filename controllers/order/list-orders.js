module.exports = function makeListOrders(orderAccess){
  
  return async function listOrders(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const orders = await orderAccess.listOrders();
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          orders
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
