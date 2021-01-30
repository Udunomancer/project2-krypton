module.exports = function (sequelize, DataTypes) {
    const Game = sequelize.define("Game", {
        gameTitle: DataTypes.STRING,
        gameOwner: DataTypes.STRING, // Is this right?
        minPlayers: DataTypes.INT,
        maxPlayers: DataTypes.INT,
        minPlayTime: DataTypes.INT,
        maxPlayTime: DataTypes.INT,
        gameDescription: DataTypes.TEXT
    });

    return Game;
};
