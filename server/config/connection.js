const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.JAWS_DB_DATABASE, 
    process.env.JAWS_DB_USERNAME, 
    process.env.JAWS_DB_PASSWORD, 
    {
        host: process.env.JAWS_DB_HOST,
        dialect: 'mysql'
    }
);

module.exports = sequelize;