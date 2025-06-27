const express = require('express');
const cors = require('cors');
const { initDB } = require('./config/db');


const app = express();
app.use(cors());
app.use(express.json());

initDB();

export default app;
