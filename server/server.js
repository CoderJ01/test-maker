// Express.js 
const express = require('express');

// dotenv
require('dotenv').config();

// Sequelize connection
const sequelize = require('./config/connection');

// other imports
const routes = require('./routes/index');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, console.log(`Listening on PORT ${PORT}...`));
});

module.exports = app;