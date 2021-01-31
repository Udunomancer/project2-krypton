module.exports = function (sequelize, DataTypes) {
    const GameUnit = sequelize.define("GameUnit", {
        bg_id: DataTypes.INTEGER,
        owner_id: DataTypes.INTEGER,
        rented: DataTypes.BOOLEAN
    });

    return GameUnit;
}