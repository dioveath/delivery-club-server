module.exports = function makeGetOrder(orderAccess) {

  return async function getOrder(httpRequest){ // Custom Httprequest (Made from express default requests)
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const order = await orderAccess.findOrderById(httpRequest.params.id);

      // const orders = shipdayClient.orderService.getOrders();

      if(order == null) {
        throw new Error("No Order with id: " + httpRequest.params.id);
      }

      return { // this is response model
        headers,
        statusCode: 200,
        body: {
          status: 'success', 
          order
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
