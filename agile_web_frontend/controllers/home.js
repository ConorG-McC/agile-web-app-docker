const axios = require('../config/http-common');
const jwtParser = require('../utilities/utility');

showHome = (req, res) => {
    let errorMessage;

    const currentUser = jwtParser.parseJwt(req.cookies.accessToken);

    console.log('current user: ', currentUser);

    res.render('home', {
        result: { currentUser, errorMessage },
    });
};

module.exports = { showHome };
