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
        correct_answer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        other_answers: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('other_answers'));
            },
            set: function(val) {
                return this.setDataValue('other_answers', JSON.stringify(val));
            }
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

model.exports = Question;