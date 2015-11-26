const CONFIG = require('./config.js');
const express = require('express');
const app = module.exports = express();


app.use(require('./routes'));
