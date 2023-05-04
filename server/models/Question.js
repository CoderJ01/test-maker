const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model {}

Question.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correct_answer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        second_choice: {
            type: DataTypes.STRING,
            allowNull: false
        },
        third_choice: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fourth_choice: {
            type: DataTypes.STRING,
            allowNull: false
        },
        test_id: {
            type: DataTypes.UUID,
            references: {
                model: 'test',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'question'
    }
);

module.exports = Question;