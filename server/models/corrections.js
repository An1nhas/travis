

module.exports = (sequelize, DataTypes) => {
  const Corrections = sequelize.define('Corrections', {
    original: DataTypes.STRING,
    translation: DataTypes.STRING,
    improved_translation: DataTypes.STRING
  }, {});
  Corrections.associate = function (models) {
    // associations can be defined here
  };
  return Corrections;
};