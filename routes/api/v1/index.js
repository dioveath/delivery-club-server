const Router = require('express').Router;
const router = Router();

const userRoute = require('./user-route');
const menuRoute = require('./menu-route');
const orderRoute = require('./order-route');
const paymentRoute = require('./payment-route');

const isAuthorized = require('../../../middlewars/is-authorized');

router.use('/user', [isAuthorized], userRoute);
router.use('/menu', menuRoute);
router.use('/order', [isAuthorized], orderRoute);
router.use('/payment', [isAuthorized], paymentRoute);


module.exports = router;
