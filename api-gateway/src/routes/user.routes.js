const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const allowRolesMiddleware = require("../middlewares/role.middleware");
const {
    getMe
} = require("../proxies/user.proxy");

router.get("/me",
    authMiddleware,
    allowRolesMiddleware(["user", "admin"]),
    getMe
);

module.exports = router;