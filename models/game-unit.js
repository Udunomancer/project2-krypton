module.exports = function (sequelize, DataTypes) {
    const GameUnit = sequelize.define("GameUnit", {
        rented: DataTypes.BOOLEAN
    });

    return GameUnit;
}