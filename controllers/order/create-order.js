const axios = require('axios');
const config = require('../../config');

module.exports = function makeCreateOrder(shipdayClient){

    return async function createOrder(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };

        try { 
          const options = {
            method: 'POST',
            url: `${config.SHIPDAY.API_URL}/orders`,
            headers: {
              accept: 'application/json',
              Authorization: `Basic ${config.SHIPDAY.API_KEY}`
            },
            data: httpRequest.body
          };

          const axiosRes = await axios.request(options);
          const newOrder = axiosRes.data;

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
