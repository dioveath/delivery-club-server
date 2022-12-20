const axios = require('axios');
const config = require('../../config/index');

module.exports = function makeGetOrder(shipdayClient) {
  return async function getOrder(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const options = {
        method: "GET",
        url: `${config.SHIPDAY.API_URL}/orders/${httpRequest.params.id}`,
        headers: {
          accept: "application/json",
          Authorization: `Basic ${config.SHIPDAY.API_KEY}`,
        },
      };

      const axiosRes = await axios.request(options);
      const order = axiosRes.data;

      if(!order.length) throw new Error("Order not found with id: " + httpRequest.params.id);

      return {
        headers,
        statusCode: 200,
        body: {
          status: "success",
          order,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 400,
        body: {
          status: "fail",
          errorList: error.message.split(","),
        },
      };
    }
  };
};
