const router = require('../routes/skillCategory');
const utilities = require('../utilities/utility');
const db = require('../models');
const SkillCategory = db.skillCategory;

getAll = async (req, res) => {
    const skillCategory = await SkillCategory.findAll();
    res.status(200).json(skillCategory);
};

getByDesc = async (req, res) => {
    const name = req.params.value;
    try {
        const skillCategory = await SkillCategory.findAll({
            where: { skill_category_name: name },
        });
        if (skillCategory.length == 0) {
            throw new Error('Unable to find Skill Category with name ' + name);
        }
        res.status(200).json(skillCategory);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getById = async (req, res) => {
    const id = req.params.id;
    try {
        const skillCategory = await SkillCategory.findByPk(id);
        if (skillCategory == null || skillCategory.length == 0) {
            throw new Error('Unable to find Skill Category with id ' + id);
        }
        res.status(200).json(skillCategory);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

create = async (req, res) => {
    let skillCategory = {
        skill_category_name: req.body.skill_category_name,
    };

    try {
        if (
            skillCategory.skill_category_name == null ||
            skillCategory.skill_category_name.length < 1
        ) {
            throw new Error('Essential fields missing');
        }
        skillCategory = await SkillCategory.create(skillCategory);
        res.status(201).json(skillCategory);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

deleting = async (req, res) => {
    const id = req.body.skill_category_id;
    try {
        const deleted = await SkillCategory.destroy({
            where: { skill_category_id: id },
        });
        if (deleted == 0) {
            throw new Error('Id not found');
        }
        res.status(200).send('Skill Category deleted');
    } catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
};

update = async (req, res) => {
    const id = req.body.skill_category_id;

    let skillCategory = {
        skill_category_name: req.body.skill_category_name,
    };

    try {
        if (id == null || skillCategory.skill_category_name == null) {
            throw new Error('Missing essential fields');
        }
        await SkillCategory.update(skillCategory, {
            where: { skill_category_id: id },
        });

        res.status(200).json(skillCategory);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

module.exports = { getAll, getByDesc, getById, create, deleting, update };
