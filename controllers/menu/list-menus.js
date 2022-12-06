module.exports = function makeListMenus(menuAccess){
  
  return async function listMenus(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const menus = await menuAccess.listMenus();
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          menus
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

