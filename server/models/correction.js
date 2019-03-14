module.exports = function (sequelize, DataTypes) {
    const Correction = sequelize.define('corrections',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            original: {
                type: DataTypes.STRING
            },
            translation: {
                type: DataTypes.STRING
            },
            improved_translation: DataTypes.STRING
        },
        {
            timestamp: true
        })


    return Correction;
}