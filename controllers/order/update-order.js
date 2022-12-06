module.exports = function makeUpdateUsser(orderAccess){
  
  return async function updateOrder(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const updatedOrder = await orderAccess.updateOrder(httpRequest.params.id, httpRequest.body);

      if(!updatedOrder)
        throw new Error('No Order with id: ' + httpRequest.params.id);      

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedOrder
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
