const config = require('../config');
const Shipday = require('shipday/integration');

const shipdayClient = new Shipday(config.SHIPDAY.API_KEY, 10000);

(async () => {
  const orders = await shipdayClient.orderService.getOrders();
  console.log(orders);
})();




module.exports = shipdayClient;
