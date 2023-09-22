const config = require('../config/config');
const Skill = require('./skill');
const SkillCategory = require('./skillCategory');
const JobRole = require('./jobRole');
const EmployeeSkillLevel = require('./employeeSkillLevel');
const SystemRole = require('./systemRole');
const Employee = require('./employee');
const EmployeeSkill = require('./employeeSkill');
const ManagerStaff = require('./managerStaff');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    port: config.PORT,
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.skillCategory = SkillCategory(sequelize, Sequelize);
db.skill = Skill(sequelize, Sequelize, db.skillCategory);
db.jobRole = JobRole(sequelize, Sequelize);
db.employeeSkillLevel = EmployeeSkillLevel(sequelize, Sequelize);
db.systemRole = SystemRole(sequelize, Sequelize);
db.employee = Employee(sequelize, Sequelize, db.jobRole, db.systemRole);
db.employeeSkill = EmployeeSkill(
    sequelize,
    Sequelize,
    db.employee,
    db.skill,
    db.employeeSkillLevel
);
db.managerStaff = ManagerStaff(sequelize, Sequelize, db.employee);
module.exports = db;
