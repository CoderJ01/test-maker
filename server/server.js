// Express.js 
const express = require('express');

// dotenv
require('dotenv').config();

// Sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, console.log(`Listening on PORT ${PORT}...`));

module.exports = app;