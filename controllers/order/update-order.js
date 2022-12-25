const axios = require('axios');
const config = require('../../config');


module.exports = function makeUpdateUsser(shipdayClient){
  
  return async function updateOrder(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const options = {
        method: 'PUT',
        url: `${config.SHIPDAY.API_URL}/order/edit/${httpRequest.params.id}`,
        headers: {
          accept: "application/json",
          Authorization: `Basic ${config.SHIPDAY.API_KEY}`,
        },
        data: httpRequest.body
      };

      const axiosRes = await axios.request(options);
      if(!axiosRes.data.success)
        throw new Error(axiosRes.data.response);

      const updatedInfo = axiosRes.data;

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedInfo
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
