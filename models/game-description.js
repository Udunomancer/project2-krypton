module.exports = function (sequelize, DataTypes) {
  const GameDescription = sequelize.define("GameDescription", {
    gameTitle: DataTypes.STRING,
    playerAge: DataTypes.INTEGER,
    published: DataTypes.STRING,
    minPlayers: DataTypes.INTEGER,
    maxPlayers: DataTypes.INTEGER,
    minPlayTime: DataTypes.INTEGER,
    maxPlayTime: DataTypes.INTEGER,
    gameDescription: DataTypes.TEXT
  });

  GameDescription.associate = function (models) {
    GameDescription.hasMany(models.GameUnit, {
      onDelete: "cascade"
    });
  };

  return GameDescription;
};
