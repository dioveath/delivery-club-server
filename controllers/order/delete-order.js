
module.exports = function makeDeleteOrder(orderAccess){

  return async function deleteOrder(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const deleteResult = await orderAccess.deleteOrder(httpRequest.params.id);
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
