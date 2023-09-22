module.exports = (sequelize, Sequelize, jobRole, systemRole) => {
    const Employee = sequelize.define(
        'employee',
        {
            employee_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'employee_id',
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            first_name: {
                type: Sequelize.STRING,
            },
            last_name: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'employee',
        }
    );
    Employee.belongsTo(jobRole, { foreignKey: 'job_role_id' });
    Employee.belongsTo(systemRole, { foreignKey: 'system_role_id' });
    return Employee;
};
