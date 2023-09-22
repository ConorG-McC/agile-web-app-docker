const controller = require('../controllers/managerStaff');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/manager/:id', controller.getByManagerId);
router.get('/staff/:id', controller.getByStaffId);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);

module.exports = router;
