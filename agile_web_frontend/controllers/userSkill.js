const axios = require('../config/http-common');
const jwtParser = require('../utilities/utility');

getAll = async (req, res) => {
    let errorMessage;
    let employeeSkill;
    let currentUser;

    currentUser = jwtParser.parseJwt(req.cookies.accessToken);
    const id = currentUser.employee_id;

    try {
        employeeSkill = await axios.get('employeeSkill/employee/' + id, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });

        console.log(employeeSkill.data[0]);
        if (employeeSkill.data[0] == undefined) {
            throw new Error();
        }
    } catch (error) {
        errorMessage = 'Unable to return records';
    }
    res.render('userSkill/getAll', {
        result: { currentUser, employeeSkill, errorMessage },
    });
};

addPage = async (req, res) => {
    try {
        const currentUser = jwtParser.parseJwt(req.cookies.accessToken);

        const skills = await axios.get('/skill', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const skillLevels = await axios.get('/employeeSkillLevel', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.render('userSkill/add', { result: { currentUser, skills, skillLevels } });
    } catch (error) {
        console.error('Error fetching employee skill details:', error);
        res.render('userSkill/add', { errorMessage: 'Error fetching employee skill details' });
    }
};

create = async (req, res) => {
    let errorMessage;
    const employeeSkillAssignment = {
        employee_skill_expiry: req.body.employee_skill_expiry,
        employee_id: req.body.employee_id,
        skill_id: req.body.skill_id,
        employee_skill_level_id: req.body.employee_skill_level_id,
    };

    try {
        if (
            employeeSkillAssignment.employee_id == null ||
            employeeSkillAssignment.skill_id == null ||
            employeeSkillAssignment.employee_skill_level_id == null
        ) {
            throw new Error('Essential fields missing');
        }
        await axios.post(
            '/employeeSkill',
            {
                employee_skill_expiry: employeeSkillAssignment.employee_skill_expiry,
                employee_id: employeeSkillAssignment.employee_id,
                skill_id: employeeSkillAssignment.skill_id,
                employee_skill_level_id: employeeSkillAssignment.employee_skill_level_id,
            },
            { headers: { Authorization: 'Bearer ' + req.cookies.accessToken } }
        );

        res.redirect('/userSkill');
    } catch (error) {
        errorMessage = 'Unable to add a record due to connection issue';
        res.render('userSkill/add', { errorMessage });
    }
};

deleting = async (req, res) => {
    const employee_skill_id = req.body.employee_skill_id;

    try {
        if (employee_skill_id === null) {
            throw new Error('Id missing');
        }
        await axios.delete('/employeeSkill', {
            data: { employee_skill_id: employee_skill_id },
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.redirect('/userSkill');
    } catch (error) {
        res.status(404).send(error.message);
    }
};

update = async (req, res) => {
    let errorMessage;
    const employeeSkillAssignment = {
        employee_skill_id: req.body.employee_skill_id,
        employee_skill_expiry: req.body.employee_skill_expiry,
        employee_id: req.body.employee_id,
        skill_id: req.body.skill_id,
        employee_skill_level_id: req.body.employee_skill_level_id,
    };
    try {
        if (
            employeeSkillAssignment.employee_skill_id == null ||
            employeeSkillAssignment.employee_id == null ||
            employeeSkillAssignment.skill_id == null ||
            employeeSkillAssignment.employee_skill_level_id == null
        ) {
            throw new Error('Essential fields missing');
        }
        await axios.put(
            '/employeeSkill',
            {
                employee_skill_id: employeeSkillAssignment.employee_skill_id,
                employee_skill_expiry: employeeSkillAssignment.employee_skill_expiry,
                employee_id: employeeSkillAssignment.employee_id,
                skill_id: employeeSkillAssignment.skill_id,
                employee_skill_level_id: employeeSkillAssignment.employee_skill_level_id,
            },
            {
                headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
            }
        );
        res.redirect('/userSkill');
    } catch (error) {
        errorMessage = 'Unable to edit a record due to connection issue';
        res.render('userSkill/edit', { errorMessage });
    }
};

getById = async (req, res) => {
    try {
        const id = req.body.employee_skill_id;
        const result = await axios.get('/employeeSkill/' + id, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });

        const currentUser = jwtParser.parseJwt(req.cookies.accessToken);

        const skills = await axios.get('/skill', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const skillLevels = await axios.get('/employeeSkillLevel', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.render('userSkill/edit', { result: { result, currentUser, skills, skillLevels } });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getAll, addPage, create, deleting, update, getById };
