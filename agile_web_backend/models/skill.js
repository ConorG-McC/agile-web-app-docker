module.exports = (sequelize, Sequelize, skillCategory) => {
    const Skill = sequelize.define(
        'skill',
        {
            skill_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'skill_id',
            },
            skill_name: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'skill',
        }
    );
    Skill.belongsTo(skillCategory, { foreignKey: 'skill_category_id' });
    return Skill;
};
