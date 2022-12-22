const Router = require('express').Router;
const router = Router();

const userRoute = require('./user-route');
const menuRoute = require('./menu-route');
const orderRoute = require('./order-route');
const paymentRoute = require('./payment-route');

const isAuthenticated = require('../../../middlewars/is-authenticated');

router.use('/user', [isAuthenticated], userRoute);
// router.use('/menu', menuRoute);
router.use('/order', orderRoute);
router.use('/payment', [isAuthenticated], paymentRoute);


module.exports = router;
