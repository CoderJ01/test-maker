const User = require('./User');
const Test = require('./Test');
const Question = require('./Question');

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

module.exports = {
    User,
    Test,
    Question
}