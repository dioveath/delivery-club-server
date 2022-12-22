const Router = require('express').Router;
const router = Router();

const paymentController = require('../../../controllers/payment');
const makeExpressCallback = require('./helpers/express-callback');

const isAuthorized = require('../../../middlewars/is-authenticated');

router.get('/', makeExpressCallback(paymentController.listPayments));
router.get('/:id', makeExpressCallback(paymentController.getPayment));

router.post('/', [isAuthorized], makeExpressCallback(paymentController.createPayment));
router.post('/:id', [isAuthorized], makeExpressCallback(paymentController.updatePayment));

router.delete('/:id', [isAuthorized], makeExpressCallback(paymentController.deletePayment));


module.exports = router;
