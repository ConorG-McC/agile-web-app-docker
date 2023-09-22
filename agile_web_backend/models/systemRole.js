module.exports = (sequelize, Sequelize) => {
    const SystemRole = sequelize.define(
        'system_role',
        {
            system_role_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'system_role_id',
            },
            system_role_name: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'system_role',
        }
    );
    return SystemRole;
};
