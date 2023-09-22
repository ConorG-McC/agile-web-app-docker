module.exports = (sequelize, Sequelize, employee, skill, employeeSkillLevel) => {
    const EmployeeSkill = sequelize.define(
        'employee_skill',
        {
            employee_skill_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'employee_skill_id',
            },
            employee_skill_expiry: {
                type: Sequelize.DATE,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'employee_skill',
        }
    );
    EmployeeSkill.belongsTo(employee, { foreignKey: 'employee_id' });
    EmployeeSkill.belongsTo(skill, { foreignKey: 'skill_id' });
    EmployeeSkill.belongsTo(employeeSkillLevel, {
        foreignKey: 'employee_skill_level_id',
    });
    return EmployeeSkill;
};
