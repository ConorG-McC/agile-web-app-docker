module.exports = (sequelize, Sequelize) => {
    const JobRole = sequelize.define(
        'job_role',
        {
            job_role_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'job_role_id',
            },
            job_role_name: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'job_role',
        }
    );
    return JobRole;
};
