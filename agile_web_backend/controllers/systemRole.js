const router = require('../routes/systemRole');
const utilities = require('../utilities/utility');
const db = require('../models');
const SystemRole = db.systemRole;

getAll = async (req, res) => {
    const systemRole = await SystemRole.findAll();
    res.status(200).json(systemRole);
};

getByDesc = async (req, res) => {
    const name = req.params.value;
    try {
        const systemRole = await SystemRole.findAll({
            where: { system_role_name: name },
        });
        if (systemRole.length == 0) {
            throw new Error('Unable to find System role with name ' + name);
        }
        res.status(200).json(systemRole);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getById = async (req, res) => {
    const id = req.params.id;
    try {
        const systemRole = await SystemRole.findByPk(id);
        if (systemRole == null || systemRole.length == 0) {
            throw new Error('Unable to find Skill Category with id ' + id);
        }
        res.status(200).json(systemRole);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

create = async (req, res) => {
    let systemRole = {
        system_role_name: req.body.system_role_name,
    };

    try {
        if (systemRole.system_role_name == null || systemRole.system_role_name.length < 1) {
            throw new Error('Essential fields missing');
        }
        systemRole = await SystemRole.create(systemRole);
        res.status(201).json(systemRole);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

deleting = async (req, res) => {
    const id = req.body.system_role_id;
    try {
        const deleted = await SystemRole.destroy({ where: { system_role_id: id } });
        if (deleted == 0) {
            throw new Error('Id not found');
        }
        res.status(200).send('System Role deleted');
    } catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
};

update = async (req, res) => {
    const id = req.body.system_role_id;
    let systemRole = {
        system_role_name: req.body.system_role_name,
    };

    try {
        if (id == null || systemRole.system_role_name == null) {
            throw new Error('Missing essential fields');
        }
        await SystemRole.update(systemRole, { where: { system_role_id: id } });

        res.status(200).json(systemRole);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

module.exports = { getAll, getByDesc, getById, create, deleting, update };
