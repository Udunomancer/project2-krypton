module.exports = function (sequelize, DataTypes) {
    const Game = sequelize.define("Game", {
        gameTitle: DataTypes.STRING,
        playerAge: DataTypes.STRING,
        published: DataTypes.STRING,
        minPlayers: DataTypes.INTEGER,
        maxPlayers: DataTypes.INTEGER,
        minPlayTime: DataTypes.INTEGER,
        maxPlayTime: DataTypes.INTEGER,
        gameDescription: DataTypes.TEXT
    });

    Game.associate = function(models){
        Game.hasMany(models.GameUnit, {
          onDelete: "cascade"
        });
      };

    return Game;
};
