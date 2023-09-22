const router = require('../routes/employee');
const utilities = require('../utilities/utility');
const db = require('../models');
const Employee = db.employee;
const ManagerStaff = db.managerStaff;

getAll = async (req, res) => {
    const managerStaff = await ManagerStaff.findAll({
        order: ['manager_id', 'staff_id'],
        include: [
            {
                model: Employee,
                as: 'Manager',
                required: true,
            },
            {
                model: Employee,
                as: 'Staff',
                required: true,
            },
        ],
    });
    res.status(200).json(managerStaff);
};

getByManagerId = async (req, res) => {
    const id = req.params.id;
    try {
        const managerStaff = await ManagerStaff.findAll({
            where: { manager_id: id },
            include: [
                {
                    model: Employee,
                    as: 'Manager',
                    required: true,
                },
                {
                    model: Employee,
                    as: 'Staff',
                    required: true,
                },
            ],
        });
        if (managerStaff.length == 0) {
            throw new Error('Unable to find manager_staff assignment with manager_id: ' + id);
        }
        res.status(200).json(managerStaff);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

getByStaffId = async (req, res) => {
    const id = req.params.id;
    try {
        const managerStaff = await ManagerStaff.findAll({
            where: { staff_id: id },
            include: [
                {
                    model: Employee,
                    as: 'Manager',
                    required: true,
                },
                {
                    model: Employee,
                    as: 'Staff',
                    required: true,
                },
            ],
        });
        if (managerStaff.length == 0) {
            throw new Error('Unable to find manager_staff assignment with staff_id: ' + id);
        }
        res.status(200).json(managerStaff);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

create = async (req, res) => {
    let managerStaff = {
        manager_id: req.body.manager_id,
        staff_id: req.body.staff_id,
    };

    try {
        if (managerStaff.manager_id == null || managerStaff.staff_id == null) {
            throw new Error('Essential fields missing');
        }
        managerStaff = await ManagerStaff.create(managerStaff);
        res.status(201).json(managerStaff);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

deleting = async (req, res) => {
    const manager_id = req.body.manager_id;
    const staff_id = req.body.staff_id;

    try {
        const deleted = await ManagerStaff.destroy({
            where: { manager_id: manager_id, staff_id: staff_id },
        });
        if (deleted == 0) {
            throw new Error('Id not found');
        }
        res.status(200).send('manager_staff assignment deleted');
    } catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
};

update = async (req, res) => {
    const manager_id_current = req.body.manager_id_current;
    const staff_id_current = req.body.staff_id_current;

    let managerStaff = {
        manager_id: req.body.manager_id,
        staff_id: req.body.staff_id,
    };

    try {
        if (managerStaff.manager_id == null || managerStaff.staff_id == null) {
            throw new Error('Essential fields missing');
        }
        await ManagerStaff.update(managerStaff, {
            where: { manager_id: manager_id_current, staff_id: staff_id_current },
        });

        res.status(200).json(managerStaff);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    getAll,
    getById,
    getByManagerId,
    getByStaffId,
    create,
    deleting,
    update,
};
