module.exports = (sequelize, Sequelize, employee) => {
    const ManagerStaff = sequelize.define(
        'manager_staff',
        {},
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'manager_staff',
        }
    );
    ManagerStaff.belongsTo(employee, { as: 'Manager', foreignKey: 'manager_id' });
    ManagerStaff.belongsTo(employee, { as: 'Staff', foreignKey: 'staff_id' });
    ManagerStaff.removeAttribute('id');
    return ManagerStaff;
};
