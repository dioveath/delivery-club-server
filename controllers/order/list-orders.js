module.exports = function makeListOrders(shipdayClient){
  
  return async function listOrders(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const orders = await shipdayClient.orderService.getOrders();

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          orders
        }
      };
    } catch (error){
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
