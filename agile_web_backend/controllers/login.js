const jwt = require('jsonwebtoken');
const utilities = require('../utilities/utility');
const db = require('../models');
const Employee = db.employee;
const JobRole = db.jobRole;
const SystemRole = db.systemRole;

login = async (req, res) => {
    let employee;
    const userLoginDetails = {
        username: req.body.username,
        password: req.body.password,
    };

    console.log('userLoginDetails: ', userLoginDetails);
    try {
        employee = await Employee.findOne({
            where: { username: userLoginDetails.username, password: userLoginDetails.password },
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

        if (employee.length === 0) {
            throw new Error('Username or password is incorrect');
        }
        if (
            employee.username === userLoginDetails.username &&
            employee.password === userLoginDetails.password
        ) {
            const accessToken = jwt.sign(employee.dataValues, process.env.SECRET, {
                algorithm: 'HS256',
            });
            return res.json({
                accessToken,
            });
        } else {
            throw new Error('Username or password is incorrect');
        }
    } catch (error) {
        utilities.formatErrorResponse(res, 401, error.message); // Use 401 for unauthorized
    }
};

module.exports = { login };
