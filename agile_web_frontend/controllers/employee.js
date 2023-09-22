const axios = require('../config/http-common');

getAll = async (req, res) => {
    let errorMessage;
    let employee;
    try {
        employee = await axios.get('/employee', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
    } catch (error) {
        errorMessage = 'Unable to return records';
    }
    res.render('employee/getAll', {
        result: { employee, errorMessage },
    });
};

addPage = async (req, res) => {
    try {
        const jobRoles = await axios.get('/jobRole', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const systemRoles = await axios.get('/systemRole', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.render('employee/add', { jobRoles, systemRoles });
    } catch (error) {
        console.error('Error fetching jobRoles:', error);
        res.render('employee/add', { errorMessage: 'Error fetching job roles' });
    }
};

create = async (req, res) => {
    let errorMessage;
    let jobRoles;
    let systemRoles;
    let existingEmployee;

    const employee = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        job_role_id: req.body.job_role,
        system_role_id: req.body.system_role,
    };

    try {
        jobRoles = await axios.get('/jobRole', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        systemRoles = await axios.get('/systemRole', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        if (
            employee.username == null ||
            employee.password == null ||
            employee.first_name == null ||
            employee.last_name == null ||
            employee.job_role_id == null ||
            employee.system_role_id == null
        ) {
            throw new Error('Essential fields missing');
        }

        existingEmployee = await axios.get('/employee/username/' + employee.username, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });

        if (existingEmployee.data[0] != undefined) {
            throw new Error();
        }

        await axios.post(
            '/employee',
            {
                username: employee.username,
                password: employee.password,
                first_name: employee.first_name,
                last_name: employee.last_name,
                job_role_id: employee.job_role_id,
                system_role_id: employee.system_role_id,
            },
            { headers: { Authorization: 'Bearer ' + req.cookies.accessToken } }
        );

        res.redirect('/employee');
    } catch (error) {
        if (existingEmployee) {
            errorMessage = 'Username already exists';
        } else if (jobRoles == undefined || systemRoles == undefined) {
            errorMessage = 'Unable to add a record due to connection issue';
            res.redirect('/employee');
        } else {
            errorMessage = 'An error occurred while creating the employee';
        }
        res.render('employee/add', { jobRoles, systemRoles, errorMessage });
    }
};

deleting = async (req, res) => {
    const id = req.body.employee_id;
    let errorMessage;
    let response;
    try {
        if (id == null) {
            throw new Error('Id missing');
        }
        response = await axios.delete('/employee', {
            data: { employee_id: id },
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.redirect('/employee');
    } catch (error) {
        console.log(response);
        errorMessage = 'unable to delete employee, please refresh and try again';
        res.status(404).send(errorMessage);
    }
};

update = async (req, res) => {
    let errorMessage;

    const employee = {
        employee_id: req.body.employee_id,
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        job_role_id: req.body.job_role,
        system_role_id: req.body.system_role,
    };

    try {
        if (
            employee.username == null ||
            employee.password == null ||
            employee.first_name == null ||
            employee.last_name == null ||
            employee.job_role_id == null ||
            employee.system_role_id == null
        ) {
            throw new Error('Essential fields missing');
        }
        await axios.put(
            '/employee',
            {
                employee_id: employee.employee_id,
                username: employee.username,
                password: employee.password,
                first_name: employee.first_name,
                last_name: employee.last_name,
                job_role_id: employee.job_role_id,
                system_role_id: employee.system_role_id,
            },
            {
                headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
            }
        );
        res.redirect('/employee');
    } catch (error) {
        errorMessage = 'Unable to edit a record due to connection issue';
        res.render('employee/edit', { errorMessage });
    }
};

getById = async (req, res) => {
    try {
        const id = req.body.employee_id;
        const result = await axios.get('/employee/' + id, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const jobRoles = await axios.get('/jobRole', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const systemRoles = await axios.get('/systemRole', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.render('employee/edit', { result, jobRoles, systemRoles });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getAll, addPage, create, deleting, getById, update };
