module.exports = function (sequelize, DataTypes) {
    const GameUnit = sequelize.define("GameUnit", {
<<<<<<< HEAD
=======
        // bg_id: DataTypes.INTEGER,
        // owner_id: DataTypes.INTEGER,
>>>>>>> e939659 (added changes)
        rented: DataTypes.BOOLEAN
    });

    return GameUnit;
}