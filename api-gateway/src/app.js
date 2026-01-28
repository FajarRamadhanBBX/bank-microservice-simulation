const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use("/auth", authRoutes)
app.use("/users", userRoutes);

module.exports = app;