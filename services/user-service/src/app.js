const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const client = require("prom-client");
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get("/metrics", async(req, res) => {
    res.set("content-type", client.register.contentType);
    res.end(await client.register.metrics());
})

app.use(express.json());

app.use('/users', userRoutes);

module.exports = app;