require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const { limiter } = require('./utilities/utility');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const loginRouter = require('./routes/login');
const employeeRouter = require('./routes/employee');
const jobRoleRouter = require('./routes/jobRole');
const systemRoleRouter = require('./routes/systemRole');
const skillRouter = require('./routes/skill');
const skillCategoryRouter = require('./routes/skillCategory');
const managerStaffRouter = require('./routes/managerStaff');
const employeeSkillRouter = require('./routes/employeeSkill');
const employeeSkillLevelRouter = require('./routes/employeeSkillLevel');
const utilities = require('./utilities/utility');

const app = express();
app.use(limiter);
app.use(express.json());
app.use(logger('dev'));
app.use(helmet());

app.use(cors());
const frontendDomain = 'http://localhost:8900';
app.use(
    cors({
        origin: frontendDomain,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true, // Set this if you're using cookies or authentication
    })
);

app.use('/favicon.ico', (req, res) => res.status(204).end());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization; //looking for our header

    if (authHeader) {
        //Should contain “Bearer ” followed by the token
        const tokenReceived = authHeader.split(' ')[1]; //retrieve value after space
        //Compare JWT token received with payload + SECRET
        jwt.verify(tokenReceived, process.env.SECRET, (err, user) => {
            if (err) {
                console.log('error: ', err);
                return res.sendStatus(401);
            }
            console.log('Token verified for user:', user.username);
            console.log('Token Details: ', user);
            req.user = user; //save user information into request
            next(); //invoke next middleware function (calling router)
        });
    } else {
        res.sendStatus(404);
    }
};

app.use('', loginRouter);
app.use('/employee', authenticateToken, employeeRouter);
app.use('/jobRole', authenticateToken, jobRoleRouter);
app.use('/systemRole', authenticateToken, systemRoleRouter);
app.use('/skill', authenticateToken, skillRouter);
app.use('/skillCategory', authenticateToken, skillCategoryRouter);
app.use('/employeeSkill', authenticateToken, employeeSkillRouter);
app.use('/employeeSkillLevel', authenticateToken, employeeSkillLevelRouter);
app.use('/managerStaff', authenticateToken, managerStaffRouter);

app.use((req, res) => utilities.formatErrorResponse(res, 400, 'End point not recognised!'));

module.exports = app;
