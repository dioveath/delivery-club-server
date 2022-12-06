const Router = require('express').Router;
const router = Router();

const menuController = require('../../../controllers/menu');
const makeExpressCallback = require('./helpers/express-callback');

const isAuthorized = require('../../../middlewars/is-authorized');

router.get('/', makeExpressCallback(menuController.listMenus));
router.get('/:id', makeExpressCallback(menuController.getMenu));

router.post('/', [isAuthorized], makeExpressCallback(menuController.createMenu));
router.post('/:id', [isAuthorized], makeExpressCallback(menuController.updateMenu));

router.delete('/:id', [isAuthorized], makeExpressCallback(menuController.deleteMenu));


module.exports = router;
