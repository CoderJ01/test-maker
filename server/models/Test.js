const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Test extends Model {}

Test.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, 
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'test'
    }
);

module.exports = Test;