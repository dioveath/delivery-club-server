module.exports = function makeGetMenu(menuAccess) {

  return async function getMenu(httpRequest){ // Custom Httprequest (Made from express default requests)
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const menu = await menuAccess.findMenuById(httpRequest.params.id);

      if(menu == null) {
        throw new Error("No Menu with id: " + httpRequest.params.id);
      }

      return { // this is response model
        headers,
        statusCode: 200,
        body: {
          status: 'success', 
          menu
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
