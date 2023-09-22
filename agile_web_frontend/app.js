const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const app = express();
app.set('view engine', 'ejs');

const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const employeeRouter = require('./routes/employee');
const skillRouter = require('./routes/skill');
const skillCategoryRouter = require('./routes/skillCategory');
const managerStaffRouter = require('./routes/managerStaff');
const userDetailsRouter = require('./routes/userDetails');
const employeeSkillRouter = require('./routes/employeeSkill');
const userSkillRouter = require('./routes/userSkill');
const utilities = require('./utilities/utility');

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/favicon.ico', (req, res) => res.status(204).end());

app.use('', loginRouter);
app.use('/home', utilities.requireAuth, homeRouter);
app.use('/userDetails', utilities.requireAuth, userDetailsRouter);
app.use('/userSkill', utilities.requireAuth, userSkillRouter);
app.use('/employee', utilities.requireAuth, employeeRouter);
app.use('/skill', utilities.requireAuth, skillRouter);
app.use('/skillCategory', utilities.requireAuth, skillCategoryRouter);
app.use('/employeeSkill', employeeSkillRouter);
app.use('/managerStaff', utilities.requireAuth, managerStaffRouter);

app.use((req, res) => res.status(404).send('Sorry page not found!'));

module.exports = app;
