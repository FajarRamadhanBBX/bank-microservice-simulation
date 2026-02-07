const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const accountRoutes = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");
const client = require("prom-client");
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", service: "api-gateway" });
});

app.get("/metrics", async(req, res) => {
    res.set("content-type", client.register.contentType);
    res.end(await client.register.metrics());
})

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

module.exports = app;