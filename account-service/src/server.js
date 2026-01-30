require("dotenv").config();
const app = require("./app");

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.log("Account service runnin on port", PORT)
})