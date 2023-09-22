const e = require('express');
const axios = require('../config/http-common');

getAll = async (req, res) => {
    let errorMessage;
    let skill;
    try {
        skill = await axios.get('/skill', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
    } catch (error) {
        errorMessage = 'Unable to return records';
    }
    res.render('skill/getAll', {
        result: { skill, errorMessage },
    });
};

addPage = async (req, res) => {
    const skillCategories = await axios.get('/skillCategory', {
        headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
    });
    res.render('skill/add', { skillCategories });
};

create = async (req, res) => {
    let errorMessage;
    const skill = {
        skill_name: req.body.skill_name,
        skill_category_id: req.body.skill_category,
    };

    try {
        if (skill.skill_name == null || skill.skill_name == '' || skill.skill_category_id == null) {
            throw new Error('Essential fields missing');
        }
        await axios.post(
            '/skill',
            {
                skill_name: skill.skill_name,
                skill_category_id: skill.skill_category_id,
            },
            { headers: { Authorization: 'Bearer ' + req.cookies.accessToken } }
        );

        res.redirect('/skill');
    } catch (error) {
        errorMessage = 'Unable to add a record due to connection issue';
        res.render('skill/add', { errorMessage });
    }
};

deleting = async (req, res) => {
    const id = req.body.skill_id;
    let errorMessage;
    try {
        if (id == null) {
            throw new Error('Id missing');
        }
        console.log(id);
        await axios.delete('/skill', {
            data: { skill_id: id },
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        console.log('HERE');
        res.redirect('/skill');
    } catch (error) {
        errorMessage = 'Unable to delete record';
        res.status(404).send(errorMessage);
    }
};

update = async (req, res) => {
    let errorMessage;

    const skill = {
        skill_id: req.body.skill_id,
        skill_name: req.body.skill_name,
        skill_category_id: req.body.skill_category,
    };

    try {
        if (skill.skill_name == null || skill.skill_name == '' || skill.skill_category_id == null) {
            throw new Error('Essential fields missing');
        }
        await axios.put(
            '/skill',
            {
                skill_id: skill.skill_id,
                skill_name: skill.skill_name,
                skill_category_id: skill.skill_category_id,
            },
            { headers: { Authorization: 'Bearer ' + req.cookies.accessToken } }
        );
        res.redirect('/skill');
    } catch (error) {
        errorMessage = 'Unable to edit a record due to connection issue';
        res.render('skill/edit', { error });
    }
};

getById = async (req, res) => {
    try {
        const id = req.body.skill_id;
        const result = await axios.get('/skill/' + id, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });

        const skillCategories = await axios.get('/skillCategory', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });

        res.render('skill/edit', {
            result,
            skillCategories,
        });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getAll, deleting, addPage, create, update, getById };
