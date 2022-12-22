const Router = require('express').Router;
const router = Router();

const userController = require('../../../controllers/user');
const makeExpressCallback = require('./helpers/express-callback');

const isAuthenticated = require('../../../middlewars/is-authenticated');

router.get('/', [isAuthenticated], makeExpressCallback(userController.listUsers));
router.get('/:id', [isAuthenticated], makeExpressCallback(userController.getUser));

router.post('/', [isAuthenticated], makeExpressCallback(userController.createUser));
router.post('/:id', [isAuthenticated], makeExpressCallback(userController.updateUser));

router.delete('/:id', [isAuthenticated], makeExpressCallback(userController.deleteUser));

module.exports = router;
