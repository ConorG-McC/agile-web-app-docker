const controller = require('../controllers/employeeSkill');
var express = require('express');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/employee/:id', controller.getByEmployeeId);
router.get('/skill/:id', controller.getBySkillId);
router.get('/skillLevel/:id', controller.getByEmployeeSkillLevelId);
router.get('/expiry/:query', controller.getExpiredByDate);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);

module.exports = router;
