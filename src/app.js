const express = require('express');
const cors = require('cors');
const { initDB } = require('./config/db');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

initDB();

module.exports = app;
