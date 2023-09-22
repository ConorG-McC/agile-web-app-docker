const router = require('../routes/employeeSkillLevel');
const utilities = require('../utilities/utility');
const db = require('../models');
const EmployeeSkillLevel = db.employeeSkillLevel;

getAll = async (req, res) => {
    const employeeSkillLevel = await EmployeeSkillLevel.findAll();
    res.status(200).json(employeeSkillLevel);
};

getByDesc = async (req, res) => {
    const name = req.params.value;
    try {
        const employeeSkillLevel = await EmployeeSkillLevel.findAll({
            where: { employee_skill_level_name: name },
        });
        if (employeeSkillLevel.length == 0) {
            throw new Error('Unable to find employee Skill Level with name ' + name);
        }
        res.status(200).json(employeeSkillLevel);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getById = async (req, res) => {
    const id = req.params.id;
    try {
        const employeeSkillLevel = await EmployeeSkillLevel.findByPk(id);
        if (employeeSkillLevel == null || employeeSkillLevel.length == 0) {
            throw new Error('Unable to find Employee Skill Level with id ' + id);
        }
        res.status(200).json(employeeSkillLevel);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

create = async (req, res) => {
    let employeeSkillLevel = {
        employee_skill_level_name: req.body.employee_skill_level_name,
    };

    try {
        if (
            employeeSkillLevel.employee_skill_level_name == null ||
            employeeSkillLevel.employee_skill_level_name.length < 1
        ) {
            throw new Error('Essential fields missing');
        }
        employeeSkillLevel = await EmployeeSkillLevel.create(employeeSkillLevel);
        res.status(201).json(employeeSkillLevel);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

deleting = async (req, res) => {
    const id = req.body.employee_skill_level_id;
    try {
        const deleted = await EmployeeSkillLevel.destroy({
            where: { employee_skill_level_id: id },
        });
        if (deleted == 0) {
            throw new Error('Id not found');
        }
        res.status(200).send('Employee Skill Level deleted');
    } catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
};

update = async (req, res) => {
    const id = req.body.employee_skill_level_id;

    let employeeSkillLevel = {
        employee_skill_level_name: req.body.employee_skill_level_name,
    };

    try {
        if (id == null || employeeSkillLevel.employee_skill_level_name == null) {
            throw new Error('Missing essential fields');
        }
        await EmployeeSkillLevel.update(employeeSkillLevel, {
            where: { employee_skill_level_id: id },
        });

        res.status(200).json(employeeSkillLevel);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

module.exports = { getAll, getByDesc, getById, create, deleting, update };
