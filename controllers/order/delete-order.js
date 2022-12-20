module.exports = function makeDeleteOrder(shipdayClient){

  return async function deleteOrder(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const deleteResult = await shipdayClient.orderService.deleteOrder(parseInt(httpRequest.params.id));

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          deleted: deleteResult
        }
      };

    } catch(error){
      // TODO: error logging
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
