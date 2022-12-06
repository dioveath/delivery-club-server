module.exports = function makeCreateMenu(menuAccess){

    return async function createMenu(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          const newMenu = await menuAccess.addMenu(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newMenu
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
