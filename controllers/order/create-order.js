module.exports = function makeCreateOrder(orderAccess){

    return async function createOrder(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          const newOrder = await orderAccess.addOrder(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newOrder
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
