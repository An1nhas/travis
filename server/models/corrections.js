

module.exports = (sequelize, DataTypes) => {
  const Corrections = sequelize.define('Corrections', {
    original: DataTypes.STRING,
    translation: DataTypes.STRING,
    improved_translation: DataTypes.STRING
  }, {
      freezeTableName: true,
      tableName: 'Corrections'
    });

  return Corrections;
};