module.exports = (sequelize, Sequelize) => {
    const EmployeeSkillLevel = sequelize.define(
        'employee_skill_level',
        {
            employee_skill_level_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'employee_skill_level_id',
            },
            employee_skill_level_name: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'employee_skill_level',
        }
    );
    return EmployeeSkillLevel;
};
