const axios = require('../config/http-common');

const MANAGER = 'manager';
const STAFF = 'staff';


getAll = async (req, res) => {
    let errorMessage;
    let managerStaff;
    try {
        managerStaff = await axios.get('/managerStaff', {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
    } catch (error) {
        errorMessage = 'Unable to return records';
    }
    res.render('managerStaff/getAll', {
        result: { managerStaff, errorMessage },
    });
};

addPage = async (req, res) => {
    try {
        const managerSystemRole = await axios.get('systemRole/name/' + MANAGER, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });

        const managerList = await axios.get('employee/systemRole/' + managerSystemRole.data[0].system_role_id, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        
        const staffSystemRole = await axios.get('systemRole/name/' + STAFF, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        const staffList = await axios.get('employee/systemRole/' + staffSystemRole.data[0].system_role_id, {
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });

        res.render('managerStaff/add', { managerList, staffList });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.render('managerStaff/add', { errorMessage: 'Error fetching data' });
    }
};

create = async (req, res) => {
    let errorMessage;
    const managedStaff = {
        manager_id: req.body.manager_id,
        staff_id: req.body.staff_id,
    };

    try {
        if (managedStaff.manager_id == null || managedStaff.staff_id == null) {
            throw new Error('Essential fields missing');
        }

        await axios.post('/managerStaff', 
                     {
                        manager_id: managedStaff.manager_id,
                        staff_id: managedStaff.staff_id,

                     },
           { headers: { Authorization: 'Bearer ' + req.cookies.accessToken } }
        );

        res.redirect('/managerStaff');
    } catch (error) {
        errorMessage = 'Unable to add a record due to connection issue';
        res.render('managerStaff/add', { errorMessage });
    }
};


deleting = async (req, res) => {
    const manager_id = req.body.manager_id;
    const staff_id = req.body.staff_id;
    try {
        if (manager_id === null || staff_id === null) {
            throw new Error('Id missing');
        }
        await axios.delete('/managerStaff', {
            data: { manager_id: manager_id, staff_id: staff_id }, 
            headers: { Authorization: 'Bearer ' + req.cookies.accessToken },
        });
        res.redirect('/managerStaff');
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = { getAll, addPage, create, deleting};
