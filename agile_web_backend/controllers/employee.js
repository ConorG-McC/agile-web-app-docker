const utilities = require('../utilities/utility');
const db = require('../models');
const Employee = db.employee;
const JobRole = db.jobRole;
const SystemRole = db.systemRole;

getAll = async (req, res) => {
    const employee = await Employee.findAll({
        order: ['job_role_id', 'system_role_id'],
        include: [
            {
                model: JobRole,
                required: true,
            },
            {
                model: SystemRole,
                required: true,
            },
        ],
    });
    res.status(200).json(employee);
};

getById = async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findByPk(id, {
            include: [
                {
                    model: JobRole,
                    required: true,
                },
                {
                    model: SystemRole,
                    required: true,
                },
            ],
        });

        if (employee == null || employee.length == 0) {
            throw new Error('Unable to find Employee with employee_id ' + id);
        }
        res.status(200).json(employee);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getByUsername = async (req, res) => {
    const name = req.params.value;
    try {
        const employee = await Employee.findAll({
            where: { username: name },
            include: [
                {
                    model: JobRole,
                    required: true,
                },
                {
                    model: SystemRole,
                    required: true,
                },
            ],
        });
        res.status(200).json(employee);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getByFirstName = async (req, res) => {
    const name = req.params.value;
    try {
        const employee = await Employee.findAll({
            where: { first_name: name },
            include: [
                {
                    model: JobRole,
                    required: true,
                },
                {
                    model: SystemRole,
                    required: true,
                },
            ],
        });
        if (employee.length == 0) {
            throw new Error('Unable to find Employee with first name: ' + name);
        }
        res.status(200).json(employee);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getByLastName = async (req, res) => {
    const name = req.params.value;
    try {
        const employee = await Employee.findAll({
            where: { last_name: name },
            include: [
                {
                    model: JobRole,
                    required: true,
                },
                {
                    model: SystemRole,
                    required: true,
                },
            ],
        });
        if (employee.length == 0) {
            throw new Error('Unable to find Employee with last name: ' + name);
        }
        res.status(200).json(employee);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getByJobRoleID = async (req, res) => {
    const role = req.params.id;
    try {
        const employee = await Employee.findAll({
            where: { job_role_id: role },
            include: [
                {
                    model: JobRole,
                    required: true,
                },
                {
                    model: SystemRole,
                    required: true,
                },
            ],
        });
        if (employee.length == 0) {
            throw new Error('Unable to find Employee with job_role_id: ' + id);
        }
        res.status(200).json(employee);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getBySystemRoleID = async (req, res) => {
    const role = req.params.id;
    try {
        const employee = await Employee.findAll({
            where: { system_role_id: role },
            include: [
                {
                    model: JobRole,
                    required: true,
                },
                {
                    model: SystemRole,
                    required: true,
                },
            ],
        });
        if (employee.length == 0) {
            throw new Error('Unable to find Employee with system_role_id: ' + id);
        }
        res.status(200).json(employee);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

create = async (req, res) => {
    let employee = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        job_role_id: req.body.job_role_id,
        system_role_id: req.body.system_role_id,
    };

    try {
        // Check if an employee with the same username already exists
        const existingEmployee = await Employee.findOne({
            where: { username: employee.username },
        });

        if (existingEmployee) {
            throw new Error('An employee with this username already exists.');
        }

        if (
            employee.username == null ||
            employee.username.length < 1 ||
            employee.password == null ||
            employee.password.length < 1 ||
            employee.first_name == null ||
            employee.first_name.length < 1 ||
            employee.last_name == null ||
            employee.last_name.length < 1 ||
            employee.job_role_id == null ||
            employee.system_role_id == null
        ) {
            throw new Error('Essential fields missing');
        }

        employee = await Employee.create(employee);
        res.status(201).json(employee);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

deleting = async (req, res) => {
    const id = req.body.employee_id;
    try {
        const deleted = await Employee.destroy({ where: { employee_id: id } });
        if (deleted == 0) {
            throw new Error('Id not found');
        }
        res.status(200).send('Employee deleted');
    } catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
};

update = async (req, res) => {
    const id = req.body.employee_id;
    let employee = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        job_role_id: req.body.job_role_id,
        system_role_id: req.body.system_role_id,
    };

    try {
        if (
            employee.username == null ||
            employee.username.length < 1 ||
            employee.password == null ||
            employee.password.length < 1 ||
            employee.first_name == null ||
            employee.first_name.length < 1 ||
            employee.last_name == null ||
            employee.last_name.length < 1 ||
            employee.job_role_id == null ||
            employee.system_role_id == null
        ) {
            throw new Error('Essential fields missing');
        }
        await Employee.update(employee, { where: { employee_id: id } });

        res.status(200).json(employee);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    getAll,
    getById,
    getByUsername,
    getByFirstName,
    getByLastName,
    getByJobRoleID,
    getBySystemRoleID,
    create,
    deleting,
    update,
};
