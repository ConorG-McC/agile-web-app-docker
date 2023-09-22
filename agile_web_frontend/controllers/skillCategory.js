const axios = require('../config/http-common');

getAll = async (req, res) => {
    let errorMessage;
    let skillCategory;
    try {
        skillCategory = await axios.get('/skillCategory', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
    } catch (error) {
        errorMessage = 'Unable to return records';
    }
    res.render('skillCategory/getAll', {
        result: { skillCategory, errorMessage },
    });
};

addPage = async (req, res) => {
    const skillCategories = await axios.get('/skillCategory', {
        headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
    });
    res.render('skillCategory/add', { skillCategories });
};

create = async (req, res) => {
    let errorMessage;
    const skillCategory = {
        skill_category_name: req.body.skill_category_name,
    };

    try {
        if (skillCategory.skill_category_name == null) {
            throw new Error('Essential fields missing');
        }
        await axios.post(
            '/skillCategory',
            {
                skill_category_name: skillCategory.skill_category_name,
            },
            { headers: { Authorization: 'Bearer ' + req.cookies.accessToken } }
        );

        res.redirect('/skillCategory');
    } catch (error) {
        errorMessage = 'Unable to add a record due to connection issue';
        res.render('skillCategory/add', { errorMessage });
    }
};

deleting = async (req, res) => {
    const id = req.body.skill_category_id;
    let errorMessage;
    try {
        if (id == null) {
            throw new Error('Id missing');
        }
        await axios.delete('/skillCategory', {
            data: { skill_category_id: id },
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.redirect('/skillCategory');
    } catch (error) {
        errorMessage = 'Unable to delete record';
        res.status(404).send(errorMessage);
    }
};

update = async (req, res) => {
    let errorMessage;
    const skillCategory = {
        skill_category_id: req.body.skill_category_id,
        skill_category_name: req.body.skill_category_name,
    };

    try {
        if (skillCategory.skill_category_name == null) {
            throw new Error('Essential fields missing');
        }
        await axios.put(
            '/skillCategory',
            {
                skill_category_id: skillCategory.skill_category_id,
                skill_category_name: skillCategory.skill_category_name,
            },
            { headers: { Authorization: 'Bearer ' + req.cookies.accessToken } }
        );
        res.redirect('/skillCategory');
    } catch (error) {
        errorMessage = 'Unable to edit a record due to connection issue';
        res.render('skillCategory/edit', { errorMessage });
    }
};

getById = async (req, res) => {
    try {
        const id = req.body.skill_category_id;
        const result = await axios.get('/skillCategory/' + id, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });

        res.render('skillCategory/edit', { result });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { getAll, addPage, create, deleting, getById, update };
