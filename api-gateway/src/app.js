const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const accountRoutes = require("./routes/account.routes");

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);

module.exports = app;