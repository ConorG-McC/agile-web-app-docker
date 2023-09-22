const axios = require('../config/http-common');
const jwtParser = require('../utilities/utility');

getCurrentUser = (req, res) => {
    let errorMessage;

    const currentUser = jwtParser.parseJwt(req.cookies.accessToken);

    console.log('current user: ', currentUser);

    res.render('userDetails/getUserDetails', {
        result: { currentUser, errorMessage },
    });
};

update = async (req, res) => {
    let errorMessage;

    const employee = {
        employee_id: req.body.employee_id,
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
        res.clearCookie('accessToken');
        res.redirect('/');
    } catch (error) {
        errorMessage = 'Unable to edit a record due to connection issue';
        res.render('employee/edit', { errorMessage });
    }
};

editCurrentUser = async (req, res) => {
    try {
        const currentUser = jwtParser.parseJwt(req.cookies.accessToken);

        res.render('userDetails/getUserDetails', {
            result: { currentUser },
        });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getCurrentUser, editCurrentUser, update };
