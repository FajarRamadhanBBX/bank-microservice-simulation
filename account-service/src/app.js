const express = require('express');
const app = express();

const accountRoutes = require('./routes/account.routes');

app.use(express.json());

app.use('/accounts', accountRoutes);

module.exports = app;