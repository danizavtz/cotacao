require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();
cors({ credentials: true, origin: true });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./server/index'));

module.exports = app;