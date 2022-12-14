const axios = require("axios");
const config = require("../../config");

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 8);

const userAccess = require('../../data-access/user-db/index');

module.exports = function makeCreateOrder(shipdayClient) {
  return async function createOrder(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    const reqData = httpRequest.body;
    const user = await userAccess.findUserById(httpRequest.user.sub);
    const orderNumber = user.name.split(' ')[0].substring(0, 2).toUpperCase() + '-' + nanoid(4);

    const curatedOrder = {
      orderNumber: orderNumber,
      customerName: 'N/A Customer',
      customerAddress: reqData.customerAddress,
      customerEmail: 'no-reply@deliveryclub.co.uk',      
      customerPhoneNumber: reqData.customerPhoneNumber,
      restaurantName: user.name,
      restaurantAddress: user.address,
      restaurantPhoneNumber: user.phone_number,
      expectedPickupTime: reqData.expectedPickupTime,
      
    };

    try {
      const options = {
        method: "POST",
        url: `${config.SHIPDAY.API_URL}/orders`,
        headers: {
          accept: "application/json",
          Authorization: `Basic ${config.SHIPDAY.API_KEY}`,
        },
        data: curatedOrder,
      };

      const axiosRes = await axios.request(options);
      if(!axiosRes.data.success)
        throw new Error(axiosRes.data.response);

      await userAccess.addOrder(httpRequest.user.sub, orderNumber);

      return {
        headers,
        statusCode: 200,
        body: {
          status: "success",
          order_id: orderNumber
        },
      };
    } catch (error) {
      // TODO: Error Logging
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
