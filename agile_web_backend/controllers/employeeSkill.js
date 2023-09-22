const router = require('../routes/employeeSkill');
const utilities = require('../utilities/utility');
const db = require('../models');
const { Op } = require('sequelize');

const EmployeeSkill = db.employeeSkill;
const Employee = db.employee;
const EmployeeSkillLevel = db.employeeSkillLevel;
const Skill = db.skill;

getAll = async (req, res) => {
    const employeeSkill = await EmployeeSkill.findAll({
        order: ['employee_id', 'skill_id', 'employee_skill_level_id'],
        include: [
            {
                model: Employee,
                required: true,
            },
            {
                model: Skill,
                required: true,
            },
            {
                model: EmployeeSkillLevel,
                required: true,
            },
        ],
    });
    res.status(200).json(employeeSkill);
};

getById = async (req, res) => {
    const id = req.params.id;
    try {
        const employeeSkill = await EmployeeSkill.findByPk(id, {
            include: [
                {
                    model: Employee,
                    required: true,
                },
                {
                    model: Skill,
                    required: true,
                },
                {
                    model: EmployeeSkillLevel,
                    required: true,
                },
            ],
        });

        if (employeeSkill == null || employeeSkill.length == 0) {
            throw new Error('Unable to find Employee Skill with id ' + id);
        }
        res.status(200).json(employeeSkill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getByEmployeeId = async (req, res) => {
    const id = req.params.id;
    try {
        const employeeSkill = await EmployeeSkill.findAll({
            where: { employee_id: id },
            include: [
                {
                    model: Employee,
                    required: true,
                },
                {
                    model: Skill,
                    required: true,
                },
                {
                    model: EmployeeSkillLevel,
                    required: true,
                },
            ],
        });

        if (employeeSkill == null || employeeSkill == undefined) {
            throw new Error('Unable to find Employee Skill with employee_id ' + id);
        }
        res.status(200).json(employeeSkill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getBySkillId = async (req, res) => {
    const id = req.params.id;
    try {
        const employeeSkill = await EmployeeSkill.findAll({
            where: { skill_id: id },
            include: [
                {
                    model: Employee,
                    required: true,
                },
                {
                    model: Skill,
                    required: true,
                },
                {
                    model: EmployeeSkillLevel,
                    required: true,
                },
            ],
        });

        if (employeeSkill == null || employeeSkill.length == 0) {
            throw new Error('Unable to find Employee Skill with skill_id ' + id);
        }
        res.status(200).json(employeeSkill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getByEmployeeSkillLevelId = async (req, res) => {
    const id = req.params.id;
    try {
        const employeeSkill = await EmployeeSkill.findAll({
            where: { employee_skill_level_id: id },
            include: [
                {
                    model: Employee,
                    required: true,
                },
                {
                    model: Skill,
                    required: true,
                },
                {
                    model: EmployeeSkillLevel,
                    required: true,
                },
            ],
        });

        if (employeeSkill == null || employeeSkill.length == 0) {
            throw new Error('Unable to find Employee Skill with skill_id ' + id);
        }
        res.status(200).json(employeeSkill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getExpiredByDate = async (req, res) => {
    const query = req.params.query;
    const { date } = req.query;
    try {
        switch (query) {
            case 'before':
                employeeSkill = await EmployeeSkill.findAll({
                    where: {
                        [Op.or]: [
                            {
                                employee_skill_expiry: {
                                    [Op.lt]: new Date(date),
                                },
                            },
                            {
                                employee_skill_expiry: {
                                    [Op.eq]: new Date(date),
                                },
                            },
                        ],
                    },
                    include: [
                        {
                            model: Employee,
                            required: true,
                        },
                        {
                            model: Skill,
                            required: true,
                        },
                        {
                            model: EmployeeSkillLevel,
                            required: true,
                        },
                    ],
                });
                break;

            case 'after':
                employeeSkill = await EmployeeSkill.findAll({
                    where: {
                        [Op.or]: [
                            {
                                employee_skill_expiry: {
                                    [Op.gt]: new Date(date),
                                },
                            },
                            {
                                employee_skill_expiry: {
                                    [Op.eq]: new Date(date),
                                },
                            },
                        ],
                    },
                    include: [
                        {
                            model: Employee,
                            required: true,
                        },
                        {
                            model: Skill,
                            required: true,
                        },
                        {
                            model: EmployeeSkillLevel,
                            required: true,
                        },
                    ],
                });
                break;

            default:
                throw new Error('Invalid query parameter');
        }

        if (!employeeSkill || employeeSkill.length === 0) {
            throw new Error('No matching employee skills found ' + query + ' ' + date);
        }

        res.status(200).json(employeeSkill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

create = async (req, res) => {
    let employeeSkill = {
        employee_skill_id: req.body.employee_skill_id,
        employee_skill_expiry: req.body.employee_skill_expiry,
        employee_id: req.body.employee_id,
        skill_id: req.body.skill_id,
        employee_skill_level_id: req.body.employee_skill_level_id,
    };

    try {
        if (
            employeeSkill.employee_id == null ||
            employeeSkill.skill_id == null ||
            employeeSkill.employee_skill_level_id == null
        ) {
            throw new Error('Essential fields missing');
        }
        employeeSkill = await EmployeeSkill.create(employeeSkill);
        res.status(201).json(employeeSkill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

deleting = async (req, res) => {
    const id = req.body.employee_skill_id;
    try {
        const deleted = await EmployeeSkill.destroy({
            where: { employee_skill_id: id },
        });
        if (deleted == 0) {
            throw new Error('Id not found');
        }
        res.status(200).send('Employee Skill deleted');
    } catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
};

update = async (req, res) => {
    const id = req.body.employee_skill_id;
    let employeeSkill = {
        employee_skill_id: req.body.employee_skill_id,
        employee_skill_expiry: req.body.employee_skill_expiry,
        employee_id: req.body.employee_id,
        skill_id: req.body.skill_id,
        employee_skill_level_id: req.body.employee_skill_level_id,
    };

    try {
        if (
            employeeSkill.employee_id == null ||
            employeeSkill.skill_id == null ||
            employeeSkill.employee_skill_level_id == null
        ) {
            throw new Error('Essential fields missing');
        }
        await EmployeeSkill.update(employeeSkill, {
            where: { employee_skill_id: id },
        });

        res.status(200).json(employeeSkill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    getAll,
    getById,
    getByEmployeeId,
    getBySkillId,
    getByEmployeeSkillLevelId,
    getExpiredByDate,
    create,
    deleting,
    update,
};
