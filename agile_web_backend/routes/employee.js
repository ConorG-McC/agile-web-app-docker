const controller = require('../controllers/employee');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/firstName/:value', controller.getByFirstName);
router.get('/username/:value', controller.getByUsername);
router.get('/lastName/:value', controller.getByLastName);
router.get('/jobRole/:id', controller.getByJobRoleID);
router.get('/systemRole/:id', controller.getBySystemRoleID);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);

module.exports = router;
