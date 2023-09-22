const controller = require('../controllers/userDetails');
var express = require('express');
var router = express.Router();

router.get('', controller.getCurrentUser);

router.post('/editCurrentUser', controller.editCurrentUser);
router.post('/edit', controller.update);

module.exports = router;
