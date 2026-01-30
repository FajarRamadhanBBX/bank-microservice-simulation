const express = require("express");
const app = express();

const transactionRoutes = require("./routes/transaction.routes");

app.use(express.json());

app.use("/transactions", transactionRoutes);

module.exports = app;