const controller = require('../controllers/managerStaff');
var express = require('express');
var router = express.Router();

router.get('', controller.getAll);
router.get('/addPage', controller.addPage);

router.post('/add', controller.create);
router.post('/delete', controller.deleting);

module.exports = router;
