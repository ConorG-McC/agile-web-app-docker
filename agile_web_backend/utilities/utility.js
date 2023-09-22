const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100,
    message:
        'This application has identified too many requests from this IP, please try again later.',
});

function formatErrorResponse(res, code, message) {
    const err = {
        error: {
            status: code,
            message: message,
        },
    };
    return res.status(code).send(err);
}

module.exports = { formatErrorResponse, limiter };
