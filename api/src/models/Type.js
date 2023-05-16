// Defino el modelo de tipo de pokemon.

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('type', {
        name: {
            type: DataTypes.STRING
        }
    });
}