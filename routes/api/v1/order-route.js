const Router = require("express").Router;
const router = Router();

const orderController = require("../../../controllers/order");
const makeExpressCallback = require("./helpers/express-callback");

const isAuthenticated = require("../../../middlewars/is-authenticated");

router.get("/", [isAuthenticated], makeExpressCallback(orderController.listOrders));
router.get("/:id", [isAuthenticated], makeExpressCallback(orderController.getOrder));

router.post("/", [isAuthenticated], makeExpressCallback(orderController.createOrder));
router.post( "/:id", [isAuthenticated], makeExpressCallback(orderController.updateOrder));
router.delete( "/:id", [isAuthenticated], makeExpressCallback(orderController.deleteOrder));

module.exports = router;
