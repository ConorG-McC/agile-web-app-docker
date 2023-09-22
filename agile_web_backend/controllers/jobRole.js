const router = require('../routes/jobRole');
const utilities = require('../utilities/utility');
const db = require('../models');
const JobRole = db.jobRole;

getAll = async (req, res) => {
    const jobRole = await JobRole.findAll();
    res.status(200).json(jobRole);
};

getByDesc = async (req, res) => {
    const name = req.params.value;
    try {
        const jobRole = await JobRole.findAll({ where: { job_role_name: name } });
        if (jobRole.length == 0) {
            throw new Error('Unable to find Job Role with name ' + name);
        }
        res.status(200).json(jobRole);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getById = async (req, res) => {
    const id = req.params.id;
    try {
        const jobRole = await JobRole.findByPk(id);
        if (jobRole == null || jobRole.length == 0) {
            throw new Error('Unable to find Job Role with id ' + id);
        }
        res.status(200).json(jobRole);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

create = async (req, res) => {
    let jobRole = {
        job_role_name: req.body.job_role_name,
    };

    try {
        if (jobRole.job_role_name == null || jobRole.job_role_name.length < 1) {
            throw new Error('Essential fields missing');
        }
        jobRole = await JobRole.create(jobRole);
        res.status(201).json(jobRole);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

deleting = async (req, res) => {
    const id = req.body.job_role_id;
    try {
        const deleted = await JobRole.destroy({ where: { job_role_id: id } });
        if (deleted == 0) {
            throw new Error('Id not found');
        }
        res.status(200).send('Job Role deleted');
    } catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
};

update = async (req, res) => {
    const id = req.body.job_role_id;

    let jobRole = {
        job_role_name: req.body.job_role_name,
    };

    try {
        if (id == null || jobRole.job_role_name == null) {
            throw new Error('Missing essential fields');
        }
        await JobRole.update(jobRole, { where: { job_role_id: id } });

        res.status(200).json(jobRole);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

module.exports = { getAll, getByDesc, getById, create, deleting, update };
