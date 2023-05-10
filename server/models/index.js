const User = require('./User');
const Test = require('./Test');
const Question = require('./Question');
const Score = require('./Score');

User.hasMany(Test, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Test.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Test.hasMany(Question, {
    foreignKey: 'test_id',
    onDelete: 'SET NULL'
});

Question.belongsTo(Test, {
    foreignKey: 'test_id',
    onDelete: 'SET NULL'
});

User.hasMany(Score, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Score.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Test.hasMany(Score, {
    foreignKey: 'test_id',
    onDelete: 'SET NULL'
});

Score.belongsTo(Test, {
    foreignKey: 'test_id',
    onDelete: 'SET NULL'
});

module.exports = {
    User,
    Test,
    Question,
    Score
}