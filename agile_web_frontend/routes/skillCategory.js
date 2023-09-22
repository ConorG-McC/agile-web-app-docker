var express = require('express');
var router = express.Router();
const controller = require('../controllers/skillCategory');

router.get('', controller.getAll);
router.get('/addPage', controller.addPage);

router.post('/add', controller.create);
router.post('/delete', controller.deleting);
router.post('/edit', controller.update);
router.post('/getById', controller.getById);

module.exports = router;
