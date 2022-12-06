module.exports = function makeUpdateUsser(menuAccess){
  
  return async function updateMenu(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const updatedMenu = await menuAccess.updateMenu(httpRequest.params.id, httpRequest.body);

      if(!updateMenu)
        throw new Error('No Menu with id: ' + httpRequest.params.id);

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedMenu
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

}
