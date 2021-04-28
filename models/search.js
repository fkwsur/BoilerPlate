module.exports = (sequelize, DataTypes) => {
    const Keyword = sequelize.define(
        'Keyword',
        {
            idx : {
                type : DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true,
                allowNull : false
            },
            keywords : {
                type : DataTypes.STRING,
                allowNull : false
            }
        },
        {
            freezeTableName : true,
            timestamps : false,
            comment : '키워드테이블'
        }
    );
    return Keyword;
};