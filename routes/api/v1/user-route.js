const Router = require('express').Router;
const router = Router();

const userController = require('../../../controllers/user');
const makeExpressCallback = require('./helpers/express-callback');
const userAccess = require('../../../data-access/user-db/index');
const shipdayClient = require('../../../lib/shipday');


const isAuthenticated = require('../../../middlewars/is-authenticated');
const logger = require('../../../lib/logger');

router.get('/', [isAuthenticated], makeExpressCallback(userController.listUsers));
router.get('/:id', [isAuthenticated], makeExpressCallback(userController.getUser));

router.post('/', [isAuthenticated], makeExpressCallback(userController.createUser));
router.post('/:id', [isAuthenticated], makeExpressCallback(userController.updateUser));

router.delete('/:id', [isAuthenticated], makeExpressCallback(userController.deleteUser));

// TODO:(Saroj) integrate it with expresscallback later....
router.delete('/:id/order/:orderId', [isAuthenticated], async (req, res) => {
  const deletedResult = await userAccess.removeOrder(req.params.id, req.params.orderId);

  shipdayClient.orderService.getOrderDetails(req.params.orderId).then(orders => {
    orders.forEach(order => {
      shipdayClient.orderService.deleteOrder(order.orderId).then((_deleteRes) => {
        logger.debug(order.orderId + ' deleted!');
      });
    });
  });

  return res.status(200).json({
    status: 'success',
    deleted: deletedResult
  });
});

module.exports = router;
