module.exports = function (sequelize, DataTypes) {
    const Game = sequelize.define("Game", {
        gameTitle: DataTypes.STRING,
        gameOwner: DataTypes.STRING, // Is this right? Maybe need ID?
        minPlayers: DataTypes.INTEGER,
        maxPlayers: DataTypes.INTEGER,
        minPlayTime: DataTypes.INTEGER,
        maxPlayTime: DataTypes.INTEGER,
        gameDescription: DataTypes.TEXT
    });

    return Game;
};
