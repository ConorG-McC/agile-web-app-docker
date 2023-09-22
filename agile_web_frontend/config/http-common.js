const axios = require('axios');

//Base URL to call
const axiosInstance = axios.create({
    baseURL: 'http://agile-web-backend:3000',
    headers: {
        'Content-type': 'application/json',
    },
});

module.exports = axiosInstance;
