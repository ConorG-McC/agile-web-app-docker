const axios = require('../config/http-common');

getAll = async (req, res) => {
    let errorMessage;
    let employeeSkill;
    try {
        employeeSkill = await axios.get('/employeeSkill', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
    } catch (error) {
        errorMessage = 'Unable to return records';
    }
    res.render('employeeSkill/getAll', {
        result: { employeeSkill, errorMessage },
    });
};

addPage = async (req, res) => {
    try {
        const employees = await axios.get('/employee', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const skills = await axios.get('/skill', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const skillLevels = await axios.get('/employeeSkillLevel', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.render('employeeSkill/add', { employees, skills, skillLevels });
    } catch (error) {
        console.error('Error fetching employee skill details:', error);
        res.render('employeeSkill/add', { errorMessage: 'Error fetching employee skill details' });
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

        res.redirect('/employeeSkill');
    } catch (error) {
        errorMessage = 'Unable to add a record due to connection issue';
        res.render('employeeSkill/add', { errorMessage });
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
        res.redirect('/employeeSkill');
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
        res.redirect('/employeeSkill');
    } catch (error) {
        errorMessage = 'Unable to edit a record due to connection issue';
        res.render('employeeSkill/edit', { errorMessage });
    }
};

getById = async (req, res) => {
    try {
        const id = req.body.employee_skill_id;
        const result = await axios.get('/employeeSkill/' + id, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const employees = await axios.get('/employee', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const skills = await axios.get('/skill', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const skillLevels = await axios.get('/employeeSkillLevel', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.render('employeeSkill/edit', { result, employees, skills, skillLevels });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getAll, addPage, create, deleting, update, getById };
