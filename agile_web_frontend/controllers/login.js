const axios = require('../config/http-common');

showLogin = (req, res) => {
    res.clearCookie('accessToken');
    res.render('login');
};

login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        var errorMessage;
        const response = await axios.post('/login', { username: username, password: password });

        var responseData = JSON.stringify(response.data);
        res.cookie('accessToken', JSON.parse(responseData)['accessToken'], {
            httpOnly: true,
            secure: true,
        });
        res.redirect('/home');
    } catch (error) {
        errorMessage = 'Invalid user details';
        res.render('login', { errorMessage });
    }
};

module.exports = { login, showLogin };
