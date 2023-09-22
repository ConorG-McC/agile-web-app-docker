const router = require('../routes/skill');
const utilities = require('../utilities/utility');
const db = require('../models');
const Skill = db.skill;
const SkillCategory = db.skillCategory;
const EmployeeSkill = db.employeeSkill;

getAll = async (req, res) => {
    const skill = await Skill.findAll({
        order: ['skill_category_id'],
        include: [
            {
                model: SkillCategory,
                required: true,
            },
        ],
    });
    res.status(200).json(skill);
};

getByDesc = async (req, res) => {
    const name = req.params.value;
    try {
        const skill = await Skill.findAll({
            where: { skill_name: name },
            include: [
                {
                    model: SkillCategory,
                    required: true,
                },
            ],
        });
        if (skill.length == 0) {
            throw new Error('Unable to find Skill with name ' + name);
        }
        res.status(200).json(skill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getById = async (req, res) => {
    const id = req.params.id;
    try {
        const skill = await Skill.findByPk(id, {
            include: [{ model: SkillCategory, required: true }],
        });

        if (skill == null || skill.length == 0) {
            throw new Error('Unable to find Skill with id ' + id);
        }
        res.status(200).json(skill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

create = async (req, res) => {
    let skill = {
        skill_name: req.body.skill_name,
        skill_category_id: req.body.skill_category_id,
    };

    try {
        if (
            skill.skill_name == null ||
            skill.skill_name.length < 1 ||
            skill.skill_category_id == null
        ) {
            throw new Error('Essential fields missing');
        }
        skill = await Skill.create(skill);
        res.status(201).json(skill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

deleting = async (req, res) => {
    const id = req.body.skill_id;
    try {
        const assigned = await EmployeeSkill.findAll({ where: { skill_id: id } });
        console.log(assigned);
        if (assigned[0] != null) {
            throw new Error('Skill is currently assigned');
        }
        const deleted = await Skill.destroy({ where: { skill_id: id } });
        if (deleted == 0) {
            throw new Error('Id not found');
        }
        res.status(200).send('Skill deleted');
    } catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
};

update = async (req, res) => {
    const id = req.body.skill_id;
    let skill = {
        skill_name: req.body.skill_name,
        skill_category_id: req.body.skill_category_id,
    };

    try {
        if (id == null || skill.skill_name == null || skill.skill_category_id == null) {
            throw new Error('Missing essential fields');
        }
        await Skill.update(skill, { where: { skill_id: id } });

        res.status(200).json(skill);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

module.exports = { getAll, getByDesc, getById, create, deleting, update };
