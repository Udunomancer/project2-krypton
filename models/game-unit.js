module.exports = function (sequelize, DataTypes) {
    const GameUnit = sequelize.define("GameUnit", {
        rented: DataTypes.BOOLEAN
    });

    
  GameUnit.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    GameUnit.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

    return GameUnit;
}