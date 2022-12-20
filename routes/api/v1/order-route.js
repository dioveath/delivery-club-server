const Router = require("express").Router;
const router = Router();


const orderController = require("../../../controllers/order");
const makeExpressCallback = require("./helpers/express-callback");

const isAuthorized = require("../../../middlewars/is-authorized");

router.get("/", [isAuthorized], makeExpressCallback(orderController.listOrders));
router.get("/:id", [isAuthorized], makeExpressCallback(orderController.getOrder));

router.post("/", [isAuthorized], makeExpressCallback(orderController.createOrder));
router.post( "/:id", [isAuthorized], makeExpressCallback(orderController.updateOrder));
router.delete( "/:id", [isAuthorized], makeExpressCallback(orderController.deleteOrder));

module.exports = router;
