require("dotenv").config();
const app = require("./app");
const initDb = require("./utils/initDb");

const PORT = process.env.APP_PORT;
const startServer = async () => {
    await initDb();

    app.listen(PORT, () => {
        console.log(`Auth service running on port ${PORT}`);
    });
};

startServer();