module.exports = (sequelize, Sequelize) => {
    const SkillCategory = sequelize.define(
        'skill_category',
        {
            skill_category_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'skill_category_id',
            },
            skill_category_name: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'skill_category',
        }
    );
    return SkillCategory;
};
