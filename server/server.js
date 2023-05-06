// Express.js 
const express = require('express');

// dotenv
require('dotenv').config();

// Sequelize connection
const sequelize = require('./config/connection');

// other imports
const cors = require('cors');
const routes = require('./routes/index');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000', process.env.DEPLOYED_FRONTEND],
        methods:['POST', 'GET', 'PUT', 'DELETE'],
        credentials: true
    })
);
app.use('/api', routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, console.log(`Listening on PORT ${PORT}...`));
});

module.exports = app;